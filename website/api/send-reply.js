/**
 * Send Reply - Sends approved response and LEARNS from edits
 * POST /api/send-reply
 */

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { enquiryId, response, user_id, user_name } = req.body;

    if (!enquiryId || !response) {
        return res.status(400).json({ error: 'enquiryId and response are required' });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return res.status(500).json({ error: 'Server configuration error' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        // Get enquiry details
        const { data: enquiry, error: fetchError } = await supabase
            .from('enquiries')
            .select('*')
            .eq('id', enquiryId)
            .single();

        if (fetchError || !enquiry) {
            return res.status(404).json({ error: 'Enquiry not found' });
        }

        // LEARNING: Detect if response was edited
        const wasEdited = enquiry.ai_draft && response !== enquiry.ai_draft;

        if (wasEdited) {
            console.log('Learning from edit...');

            // Store the learning
            await supabase.from('ai_learnings').insert({
                category: 'response_edit',
                learning: `Original: "${enquiry.ai_draft.substring(0, 200)}..." was changed to: "${response.substring(0, 200)}..."`,
                source_enquiry_id: enquiryId,
                confidence: 0.8
            });

            // Try to detect specific patterns
            const patterns = detectPatterns(enquiry.ai_draft, response);

            for (const pattern of patterns) {
                // Check if pattern exists
                const { data: existing } = await supabase
                    .from('ai_patterns')
                    .select('*')
                    .eq('pattern_type', pattern.type)
                    .eq('original_text', pattern.original)
                    .single();

                if (existing) {
                    // Increment frequency
                    await supabase
                        .from('ai_patterns')
                        .update({
                            frequency: existing.frequency + 1,
                            last_seen: new Date().toISOString()
                        })
                        .eq('id', existing.id);
                } else {
                    // Create new pattern
                    await supabase.from('ai_patterns').insert({
                        pattern_type: pattern.type,
                        original_text: pattern.original,
                        corrected_text: pattern.corrected,
                        context: pattern.context
                    });
                }
            }
        }

        // Send via Mailgun if configured
        if (enquiry.channel === 'email') {
            const mailgunKey = process.env.MAILGUN_API_KEY;
            const mailgunDomain = process.env.MAILGUN_DOMAIN;

            if (mailgunKey && mailgunDomain) {
                const formData = new URLSearchParams();
                formData.append('from', `Apex Enclosures <noreply@${mailgunDomain}>`);
                formData.append('to', enquiry.customer_contact);
                formData.append('subject', `Re: ${enquiry.subject || 'Your enquiry'}`);
                formData.append('text', response);

                const mailgunResponse = await fetch(
                    `https://api.mailgun.net/v3/${mailgunDomain}/messages`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Basic ' + Buffer.from(`api:${mailgunKey}`).toString('base64')
                        },
                        body: formData
                    }
                );

                if (!mailgunResponse.ok) {
                    console.error('Mailgun error:', await mailgunResponse.text());
                }
            }
        }

        // Update enquiry status with user tracking
        await supabase
            .from('enquiries')
            .update({
                status: 'approved',
                approved_at: new Date().toISOString(),
                response_sent: response,
                processed_by_user_id: user_id || null,
                processed_by_name: user_name || null
            })
            .eq('id', enquiryId);

        res.status(200).json({
            success: true,
            message: 'Response sent',
            learned: wasEdited
        });

    } catch (err) {
        console.error('Send reply error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Detect patterns between original and corrected text
 */
function detectPatterns(original, corrected) {
    const patterns = [];

    // Detect greeting changes
    const greetingPatterns = [
        { regex: /^(Hi|Hello|Dear)/i, type: 'greeting' },
    ];

    for (const gp of greetingPatterns) {
        const origMatch = original.match(gp.regex);
        const corrMatch = corrected.match(gp.regex);
        if (origMatch && corrMatch && origMatch[0] !== corrMatch[0]) {
            patterns.push({
                type: 'phrase_replacement',
                original: origMatch[0],
                corrected: corrMatch[0],
                context: 'greeting'
            });
        }
    }

    // Detect sign-off changes
    const signOffRegex = /(Best regards|Kind regards|Regards|Thanks|Cheers|Sincerely)[,\n]/gi;
    const origSignOff = original.match(signOffRegex);
    const corrSignOff = corrected.match(signOffRegex);
    if (origSignOff && corrSignOff && origSignOff[0] !== corrSignOff[0]) {
        patterns.push({
            type: 'phrase_replacement',
            original: origSignOff[0].replace(/[,\n]/g, ''),
            corrected: corrSignOff[0].replace(/[,\n]/g, ''),
            context: 'sign_off'
        });
    }

    // Detect if response is significantly shorter (preference for brevity)
    if (corrected.length < original.length * 0.7) {
        patterns.push({
            type: 'tone',
            original: 'verbose',
            corrected: 'Keep responses concise and brief',
            context: 'length'
        });
    }

    // Detect if response is significantly longer (preference for detail)
    if (corrected.length > original.length * 1.5) {
        patterns.push({
            type: 'tone',
            original: 'brief',
            corrected: 'Provide detailed, comprehensive responses',
            context: 'length'
        });
    }

    // Detect currency format changes
    const aedRegex = /(AED\s*[\d,]+|[\d,]+\s*AED)/gi;
    const origAED = original.match(aedRegex);
    const corrAED = corrected.match(aedRegex);
    if (origAED && corrAED && origAED[0] !== corrAED[0]) {
        patterns.push({
            type: 'phrase_replacement',
            original: origAED[0],
            corrected: corrAED[0],
            context: 'currency_format'
        });
    }

    return patterns;
}
