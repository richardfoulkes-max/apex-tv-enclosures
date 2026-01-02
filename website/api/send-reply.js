/**
 * Send Reply - Sends approved response via email (Mailgun)
 * POST /api/send-reply
 */

import { createClient } from '@supabase/supabase-js';

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

    const { enquiryId, response } = req.body;

    if (!enquiryId || !response) {
        return res.status(400).json({ error: 'enquiryId and response are required' });
    }

    // Initialize Supabase
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

        if (enquiry.channel === 'email') {
            // Send via Mailgun
            const mailgunKey = process.env.MAILGUN_API_KEY;
            const mailgunDomain = process.env.MAILGUN_DOMAIN;

            if (!mailgunKey || !mailgunDomain) {
                // If Mailgun not configured, just mark as approved (for testing)
                console.log('Mailgun not configured - marking as approved without sending');
            } else {
                // Send email via Mailgun API
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
                    const error = await mailgunResponse.text();
                    console.error('Mailgun error:', error);
                    return res.status(500).json({ error: 'Failed to send email' });
                }

                console.log(`Email sent to ${enquiry.customer_contact}`);
            }
        }

        // Update enquiry status
        const { error: updateError } = await supabase
            .from('enquiries')
            .update({
                status: 'approved',
                approved_at: new Date().toISOString(),
                response_sent: response
            })
            .eq('id', enquiryId);

        if (updateError) {
            console.error('Update error:', updateError);
            return res.status(500).json({ error: 'Failed to update status' });
        }

        res.status(200).json({
            success: true,
            message: enquiry.channel === 'email' ? 'Email sent' : 'Response recorded'
        });

    } catch (err) {
        console.error('Send reply error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
