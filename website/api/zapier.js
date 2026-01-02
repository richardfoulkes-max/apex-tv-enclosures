/**
 * Zapier Integration - Send events to Zapier webhooks
 *
 * POST /api/zapier - Manually trigger a test event
 *
 * Events are sent automatically from other APIs when:
 * - new_enquiry: New enquiry created
 * - new_order: New order created
 * - order_status_changed: Order moved to new stage
 * - followup_due: Follow-up is overdue
 * - order_won: Order marked as delivered
 * - order_lost: Order marked as lost
 */

// Webhook helper - call from other APIs
export async function sendToZapier(eventType, data) {
    const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;

    if (!webhookUrl) {
        console.log('Zapier webhook not configured, skipping');
        return null;
    }

    const payload = {
        event: eventType,
        timestamp: new Date().toISOString(),
        data: data
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log(`Zapier webhook sent: ${eventType}`);
            return { success: true };
        } else {
            console.error(`Zapier webhook failed: ${response.status}`);
            return { success: false, status: response.status };
        }
    } catch (err) {
        console.error('Zapier webhook error:', err.message);
        return { success: false, error: err.message };
    }
}

// API endpoint for testing
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // GET - Check if webhook is configured
    if (req.method === 'GET') {
        const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;
        return res.status(200).json({
            configured: !!webhookUrl,
            webhookUrl: webhookUrl ? webhookUrl.substring(0, 50) + '...' : null
        });
    }

    // POST - Send test event
    if (req.method === 'POST') {
        const { eventType, testData } = req.body;

        const result = await sendToZapier(eventType || 'test', testData || {
            message: 'Test event from AI Director',
            timestamp: new Date().toISOString()
        });

        if (result?.success) {
            return res.status(200).json({ success: true, message: 'Webhook sent successfully' });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Webhook failed or not configured',
                details: result
            });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
