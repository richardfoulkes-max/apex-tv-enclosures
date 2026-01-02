/**
 * Orders API - CRUD for order pipeline
 * GET /api/orders - List all orders
 * POST /api/orders - Create order (from quote or enquiry)
 * PATCH /api/orders - Update order status
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

    // GET - List orders
    if (req.method === 'GET') {
        const status = req.query.status; // Optional filter

        try {
            let query = supabase
                .from('orders')
                .select('*, enquiries(subject, message, ai_draft)')
                .order('created_at', { ascending: false });

            if (status) {
                query = query.eq('status', status);
            }

            const { data, error } = await query;

            if (error) {
                return res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
            }

            // Also get follow-ups for each order
            const orderIds = (data || []).map(o => o.id);
            let followUps = [];

            if (orderIds.length > 0) {
                const { data: fups } = await supabase
                    .from('follow_ups')
                    .select('*')
                    .in('order_id', orderIds)
                    .is('completed_at', null)
                    .order('due_date', { ascending: true });

                followUps = fups || [];
            }

            res.status(200).json({
                orders: data || [],
                followUps: followUps
            });

        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }

    // POST - Create order
    } else if (req.method === 'POST') {
        const {
            enquiry_id,
            customer_name,
            customer_email,
            customer_phone,
            size,
            include_tv,
            include_install,
            region,
            total_usd,
            total_aed,
            notes
        } = req.body;

        try {
            const { data: order, error } = await supabase
                .from('orders')
                .insert({
                    enquiry_id: enquiry_id || null,
                    customer_name,
                    customer_email,
                    customer_phone,
                    size: size || 75,
                    include_tv: include_tv || false,
                    include_install: include_install || false,
                    region: region || 'uae',
                    total_usd,
                    total_aed,
                    status: 'quote',
                    notes
                })
                .select()
                .single();

            if (error) {
                return res.status(500).json({ error: 'Failed to create order', details: error.message });
            }

            // If linked to enquiry, update enquiry status
            if (enquiry_id) {
                await supabase
                    .from('enquiries')
                    .update({ status: 'converted' })
                    .eq('id', enquiry_id);
            }

            res.status(201).json({ success: true, order });

        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }

    // PATCH - Update order
    } else if (req.method === 'PATCH') {
        const { id, status, notes, ...updates } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Order id is required' });
        }

        try {
            const updateData = { ...updates };

            if (status) {
                updateData.status = status;

                // Auto-set timestamps based on status
                const now = new Date().toISOString();
                if (status === 'deposit') updateData.deposit_paid_at = now;
                if (status === 'production') updateData.production_started_at = now;
                if (status === 'shipped') updateData.shipped_at = now;
                if (status === 'delivered') updateData.delivered_at = now;
            }

            if (notes !== undefined) {
                updateData.notes = notes;
            }

            const { data: order, error } = await supabase
                .from('orders')
                .update(updateData)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                return res.status(500).json({ error: 'Failed to update order', details: error.message });
            }

            res.status(200).json({ success: true, order });

        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }

    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
