/**
 * Auto Follow-ups - Creates automatic reminders based on order status
 * POST /api/auto-followups - Check all orders and create due follow-ups
 *
 * Rules:
 * - Quote for 3 days → "Check if customer has questions"
 * - Quote for 7 days → "Quote expiring soon - final check"
 * - Quote for 14 days → "Quote expired - re-engage or close"
 * - Deposit for 7 days → "Update customer on production timeline"
 * - Deposit for 14 days → "Confirm production started"
 * - Production for 21 days → "Check manufacturing status"
 * - Shipped for 3 days → "Confirm delivery received"
 */

import { createClient } from '@supabase/supabase-js';

const FOLLOW_UP_RULES = [
    {
        status: 'quote',
        daysInStatus: 3,
        type: 'check_in',
        note: 'Check if customer has questions about the quote'
    },
    {
        status: 'quote',
        daysInStatus: 7,
        type: 'call',
        note: 'Quote expiring soon - final follow-up before expiry'
    },
    {
        status: 'quote',
        daysInStatus: 14,
        type: 'email',
        note: 'Quote expired - re-engage or mark as lost'
    },
    {
        status: 'deposit',
        daysInStatus: 7,
        type: 'email',
        note: 'Update customer on production timeline'
    },
    {
        status: 'deposit',
        daysInStatus: 14,
        type: 'check_in',
        note: 'Confirm production has started with manufacturer'
    },
    {
        status: 'production',
        daysInStatus: 21,
        type: 'call',
        note: 'Check manufacturing status - update customer'
    },
    {
        status: 'shipped',
        daysInStatus: 3,
        type: 'whatsapp',
        note: 'Confirm delivery received - schedule installation if needed'
    },
    {
        status: 'shipped',
        daysInStatus: 7,
        type: 'call',
        note: 'Check if delivery arrived - escalate if not'
    }
];

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

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return res.status(500).json({ error: 'Server configuration error' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        // Get all active orders (not delivered or cancelled)
        const { data: orders, error: ordersError } = await supabase
            .from('orders')
            .select('*')
            .not('status', 'in', '("delivered","cancelled")');

        if (ordersError) {
            return res.status(500).json({ error: 'Failed to fetch orders', details: ordersError.message });
        }

        // Get existing follow-ups to avoid duplicates
        const { data: existingFollowups } = await supabase
            .from('follow_ups')
            .select('order_id, note')
            .is('completed_at', null);

        const existingSet = new Set(
            (existingFollowups || []).map(f => `${f.order_id}:${f.note}`)
        );

        const now = new Date();
        const created = [];

        for (const order of orders || []) {
            // Determine which date to use based on status
            let statusDate;
            switch (order.status) {
                case 'quote':
                    statusDate = order.created_at;
                    break;
                case 'deposit':
                    statusDate = order.deposit_paid_at || order.created_at;
                    break;
                case 'production':
                    statusDate = order.production_started_at || order.created_at;
                    break;
                case 'shipped':
                    statusDate = order.shipped_at || order.created_at;
                    break;
                default:
                    statusDate = order.created_at;
            }

            const daysSinceStatus = Math.floor(
                (now - new Date(statusDate)) / (1000 * 60 * 60 * 24)
            );

            // Check each rule
            for (const rule of FOLLOW_UP_RULES) {
                if (order.status !== rule.status) continue;
                if (daysSinceStatus < rule.daysInStatus) continue;

                // Check if this exact follow-up already exists
                const key = `${order.id}:${rule.note}`;
                if (existingSet.has(key)) continue;

                // Calculate due date (today or past due)
                const dueDate = new Date(statusDate);
                dueDate.setDate(dueDate.getDate() + rule.daysInStatus);
                const dueDateStr = dueDate.toISOString().split('T')[0];

                // Create the follow-up
                const { data: followup, error: createError } = await supabase
                    .from('follow_ups')
                    .insert({
                        order_id: order.id,
                        due_date: dueDateStr,
                        type: rule.type,
                        note: rule.note
                    })
                    .select()
                    .single();

                if (!createError && followup) {
                    created.push({
                        order: order.customer_name,
                        rule: rule.note,
                        dueDate: dueDateStr
                    });
                    existingSet.add(key); // Prevent duplicates in same run
                }
            }
        }

        res.status(200).json({
            success: true,
            created: created.length,
            followups: created
        });

    } catch (err) {
        console.error('Auto follow-up error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
