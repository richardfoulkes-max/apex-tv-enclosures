/**
 * Email Webhook - Receives inbound emails from Mailgun
 * POST /api/webhook/email
 * Uses RAG learning system for intelligent responses
 */

import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

const SYSTEM_PROMPT = `You are the AI Director for Apex Enclosures, a company that manufactures premium outdoor enclosures for the Gulf region.

Products:
- ATE Series (TV Enclosures): 55" AED 7,000 | 65" AED 8,500 | 75" AED 10,500 | 85" AED 14,000
- APE Series (Pool Equipment Enclosures): BASE AED 1,500-2,000

All enclosures include: IP55 weatherproofing, 5-year warranty, professional installation in UAE.

Write a professional, helpful response. Keep it concise (2-4 sentences for simple questions). Always end with a clear next step or question.`;

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Initialize Supabase
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error('Missing Supabase credentials');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        // Parse Mailgun webhook payload
        // Mailgun sends form data, not JSON
        const {
            sender,
            from,
            subject,
            'stripped-text': strippedText,
            'body-plain': bodyPlain
        } = req.body;

        const customerEmail = sender || from;
        const customerName = extractName(from);
        const message = strippedText || bodyPlain || '';

        if (!message) {
            return res.status(400).json({ error: 'No message content' });
        }

        console.log(`Received email from: ${customerEmail}`);

        // 1. Create embedding for the email (for RAG)
        let embedding = null;
        const openaiKey = process.env.OPENAI_API_KEY;

        if (openaiKey) {
            try {
                const openai = new OpenAI({ apiKey: openaiKey });
                const embeddingResponse = await openai.embeddings.create({
                    model: 'text-embedding-3-small',
                    input: `${subject || ''} ${message}`.trim()
                });
                embedding = embeddingResponse.data[0].embedding;
            } catch (e) {
                console.warn('Embedding failed:', e.message);
            }
        }

        // 2. Search for similar past enquiries (RAG)
        let similarExamples = [];
        if (embedding) {
            try {
                const { data: similar } = await supabase.rpc('match_enquiries', {
                    query_embedding: embedding,
                    match_threshold: 0.7,
                    match_count: 3
                });

                if (similar && similar.length > 0) {
                    similarExamples = similar.filter(s => s.response_sent);
                }
            } catch (e) {
                console.warn('RAG search failed:', e.message);
            }
        }

        // 3. Get learned patterns
        let patterns = [];
        try {
            const { data: patternData } = await supabase
                .from('ai_patterns')
                .select('*')
                .order('frequency', { ascending: false })
                .limit(5);

            if (patternData) {
                patterns = patternData;
            }
        } catch (e) {
            console.warn('Pattern fetch failed:', e.message);
        }

        // 4. Save to Supabase
        const insertData = {
            channel: 'email',
            customer_name: customerName,
            customer_contact: customerEmail,
            subject: subject,
            message: message,
            status: 'pending',
            metadata: req.body
        };

        if (embedding) {
            insertData.embedding = embedding;
        }

        const { data: enquiry, error: insertError } = await supabase
            .from('enquiries')
            .insert(insertData)
            .select()
            .single();

        if (insertError) {
            console.error('Supabase insert error:', insertError);
            return res.status(500).json({ error: 'Failed to save enquiry' });
        }

        // 5. Generate AI draft with RAG context
        const anthropicKey = process.env.ANTHROPIC_API_KEY;
        if (anthropicKey) {
            try {
                const client = new Anthropic({ apiKey: anthropicKey });

                // Build context-aware prompt
                let contextPrompt = SYSTEM_PROMPT;

                // Add learned patterns
                if (patterns.length > 0) {
                    contextPrompt += `\n\n## Your Writing Style (learned from past corrections):\n`;
                    patterns.forEach(p => {
                        if (p.pattern_type === 'tone') {
                            contextPrompt += `- ${p.corrected_text}\n`;
                        } else if (p.pattern_type === 'phrase_replacement') {
                            contextPrompt += `- Instead of "${p.original_text}", use "${p.corrected_text}"\n`;
                        }
                    });
                }

                // Add similar examples
                let userPrompt = '';
                if (similarExamples.length > 0) {
                    userPrompt += `Here are similar enquiries I've handled before:\n\n`;
                    similarExamples.forEach((ex, i) => {
                        userPrompt += `Example ${i + 1}:\nCustomer: ${ex.message}\nMy approved response: ${ex.response_sent}\n\n`;
                    });
                    userPrompt += `---\n\n`;
                }

                userPrompt += `New email from ${customerName || 'a customer'}:\n\nSubject: ${subject || 'No subject'}\n\n${message}\n\nWrite a professional reply following my style from the examples above.`;

                const response = await client.messages.create({
                    model: 'claude-sonnet-4-20250514',
                    max_tokens: 1024,
                    system: contextPrompt,
                    messages: [{ role: 'user', content: userPrompt }]
                });

                const aiDraft = response.content[0].text;

                // Calculate confidence (higher if we have examples)
                let confidence = 50;
                if (similarExamples.length > 0) confidence += 20;
                if (patterns.length > 0) confidence += 10;
                if (message.toLowerCase().includes('price')) confidence += 10;
                if (message.toLowerCase().includes('custom')) confidence -= 20;
                confidence = Math.max(10, Math.min(95, confidence));

                // Update enquiry with AI draft
                await supabase
                    .from('enquiries')
                    .update({
                        ai_draft: aiDraft,
                        ai_confidence: confidence
                    })
                    .eq('id', enquiry.id);

                console.log(`AI draft generated for enquiry ${enquiry.id} (${similarExamples.length} examples, ${patterns.length} patterns)`);
            } catch (aiError) {
                console.error('AI generation error:', aiError.message);
                // Continue without AI draft - human can write response
            }
        }

        res.status(200).json({
            success: true,
            enquiryId: enquiry.id,
            message: 'Email received and queued'
        });

    } catch (err) {
        console.error('Webhook error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Extract name from email "Name <email@domain.com>" format
function extractName(from) {
    if (!from) return null;
    const match = from.match(/^([^<]+)</);
    if (match) {
        return match[1].trim().replace(/"/g, '');
    }
    return from.split('@')[0]; // Fallback to email username
}
