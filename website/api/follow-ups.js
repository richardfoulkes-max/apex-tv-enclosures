/**
 * Follow-ups API - Manage reminders
 * GET /api/follow-ups - List due follow-ups
 * POST /api/follow-ups - Create follow-up
 * PATCH /api/follow-ups - Complete follow-up
 */

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return res.status(500).json({ error: 'Server configuration error' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // GET - List follow-ups
    if (req.method === 'GET') {
        const showCompleted = req.query.completed === 'true';

        try {
            let query = supabase
                .from('follow_ups')
                .select(`
                    *,
                    orders(customer_name, status, total_aed),
                    enquiries(customer_name, subject)
                `)
                .order('due_date', { ascending: true });

            if (!showCompleted) {
                query = query.is('completed_at', null);
            }

            const { data, error } = await query;

            if (error) {
                return res.status(500).json({ error: 'Failed to fetch follow-ups', details: error.message });
            }

            // Categorize by urgency
            const today = new Date().toISOString().split('T')[0];
            const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

            const categorized = {
                overdue: [],
                today: [],
                upcoming: [],
                completed: []
            };

            (data || []).forEach(f => {
                if (f.completed_at) {
                    categorized.completed.push(f);
                } else if (f.due_date < today) {
                    categorized.overdue.push(f);
                } else if (f.due_date === today) {
                    categorized.today.push(f);
                } else {
                    categorized.upcoming.push(f);
                }
            });

            res.status(200).json({
                followUps: data || [],
                categorized,
                counts: {
                    overdue: categorized.overdue.length,
                    today: categorized.today.length,
                    upcoming: categorized.upcoming.length
                }
            });

        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }

    // POST - Create follow-up
    } else if (req.method === 'POST') {
        const { order_id, enquiry_id, due_date, type, note } = req.body;

        if (!due_date) {
            return res.status(400).json({ error: 'due_date is required' });
        }

        if (!order_id && !enquiry_id) {
            return res.status(400).json({ error: 'Either order_id or enquiry_id is required' });
        }

        try {
            const { data: followUp, error } = await supabase
                .from('follow_ups')
                .insert({
                    order_id: order_id || null,
                    enquiry_id: enquiry_id || null,
                    due_date,
                    type: type || 'check_in',
                    note
                })
                .select()
                .single();

            if (error) {
                return res.status(500).json({ error: 'Failed to create follow-up', details: error.message });
            }

            res.status(201).json({ success: true, followUp });

        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }

    // PATCH - Complete follow-up
    } else if (req.method === 'PATCH') {
        const { id, completed } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Follow-up id is required' });
        }

        try {
            const { data: followUp, error } = await supabase
                .from('follow_ups')
                .update({
                    completed_at: completed ? new Date().toISOString() : null
                })
                .eq('id', id)
                .select()
                .single();

            if (error) {
                return res.status(500).json({ error: 'Failed to update follow-up', details: error.message });
            }

            res.status(200).json({ success: true, followUp });

        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }

    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
