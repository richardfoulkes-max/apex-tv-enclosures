/**
 * Enquiries API - List and manage enquiries
 * GET /api/enquiries - List pending enquiries
 * POST /api/enquiries - Create test enquiry (for testing)
 */

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Initialize Supabase
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return res.status(500).json({
            error: 'Server configuration error',
            hasUrl: !!supabaseUrl,
            hasKey: !!supabaseKey
        });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    if (req.method === 'GET') {
        // List enquiries
        const status = req.query.status || 'pending';

        try {
            const { data, error } = await supabase
                .from('enquiries')
                .select('*')
                .eq('status', status)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Fetch error:', error);
                return res.status(500).json({ error: 'Failed to fetch enquiries', details: error.message, code: error.code });
            }

            res.status(200).json({ enquiries: data || [] });

        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    } else if (req.method === 'POST') {
        // Create test enquiry (for testing without Mailgun)
        const { customerName, customerEmail, subject, message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'message is required' });
        }

        try {
            // Insert enquiry
            const { data: enquiry, error: insertError } = await supabase
                .from('enquiries')
                .insert({
                    channel: 'email',
                    customer_name: customerName || 'Test Customer',
                    customer_contact: customerEmail || 'test@example.com',
                    subject: subject || 'Test Enquiry',
                    message: message,
                    status: 'pending'
                })
                .select()
                .single();

            if (insertError) {
                console.error('Insert error:', insertError);
                return res.status(500).json({ error: 'Failed to create enquiry' });
            }

            // Generate AI draft
            const anthropicKey = process.env.ANTHROPIC_API_KEY;
            if (anthropicKey) {
                try {
                    const Anthropic = (await import('@anthropic-ai/sdk')).default;
                    const client = new Anthropic({ apiKey: anthropicKey });

                    const response = await client.messages.create({
                        model: 'claude-sonnet-4-20250514',
                        max_tokens: 1024,
                        system: `You are the AI Director for Apex Enclosures. Products: ATE Series TV Enclosures (55" AED 7,000, 65" AED 8,500, 75" AED 10,500), APE Series Pool Enclosures (BASE AED 1,500-2,000). Write professional, concise responses.`,
                        messages: [
                            {
                                role: 'user',
                                content: `Customer enquiry:\n\nSubject: ${subject || 'Enquiry'}\n\n${message}\n\nWrite a professional reply.`
                            }
                        ]
                    });

                    const aiDraft = response.content[0].text;
                    let confidence = 50;
                    if (message.toLowerCase().includes('price')) confidence += 20;
                    if (message.toLowerCase().includes('custom')) confidence -= 20;
                    confidence = Math.max(10, Math.min(90, confidence));

                    await supabase
                        .from('enquiries')
                        .update({ ai_draft: aiDraft, ai_confidence: confidence })
                        .eq('id', enquiry.id);

                    enquiry.ai_draft = aiDraft;
                    enquiry.ai_confidence = confidence;

                } catch (aiError) {
                    console.error('AI error:', aiError.message);
                }
            }

            res.status(201).json({ success: true, enquiry });

        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Internal server error' });
        }

    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
