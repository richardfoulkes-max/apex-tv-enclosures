-- Apex Communication System - Phase 1: Messages Schema
-- Run this in Supabase SQL Editor

-- 1. Create messages table (unified email + WhatsApp storage)
CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    org_id TEXT DEFAULT 'org_apex',

    -- Link to CRM contact (partner or partner_contact)
    partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
    contact_id UUID REFERENCES partner_contacts(id) ON DELETE SET NULL,

    -- Message details
    channel TEXT NOT NULL DEFAULT 'email',  -- 'email' | 'whatsapp' | 'sms' | 'call' | 'note'
    direction TEXT NOT NULL,  -- 'inbound' | 'outbound'

    -- Email fields
    from_address TEXT,
    to_address TEXT,
    cc_address TEXT,
    subject TEXT,
    body TEXT,
    body_html TEXT,

    -- Attachments (JSON array of {name, url, size})
    attachments JSONB DEFAULT '[]'::jsonb,

    -- Tracking
    sent_by UUID REFERENCES auth.users(id),  -- Which team member sent/logged this
    sent_by_email TEXT,  -- Denormalized for display

    -- Threading
    thread_id TEXT,  -- For grouping email threads
    in_reply_to TEXT,  -- Message ID being replied to
    external_id TEXT,  -- Message ID from email provider

    -- Status
    status TEXT DEFAULT 'sent',  -- 'draft' | 'sent' | 'delivered' | 'read' | 'failed'
    read_at TIMESTAMP,

    -- Timestamps
    message_date TIMESTAMP DEFAULT NOW(),  -- When the message was sent/received
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_messages_partner_id ON messages(partner_id);
CREATE INDEX IF NOT EXISTS idx_messages_contact_id ON messages(contact_id);
CREATE INDEX IF NOT EXISTS idx_messages_channel ON messages(channel);
CREATE INDEX IF NOT EXISTS idx_messages_direction ON messages(direction);
CREATE INDEX IF NOT EXISTS idx_messages_message_date ON messages(message_date DESC);
CREATE INDEX IF NOT EXISTS idx_messages_thread_id ON messages(thread_id);

-- 3. Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 4. Create territory-based policy (same as partners)
-- Users can only see messages for partners in their territory
CREATE POLICY "territory_messages" ON messages FOR ALL TO authenticated USING (
    EXISTS (
        SELECT 1 FROM partners p
        JOIN user_territories ut ON ut.user_id = auth.uid()
        WHERE p.id = messages.partner_id
        AND (ut.territory = 'ALL' OR ut.territory = get_territory(p.region))
    )
);

-- 5. Block anonymous access
CREATE POLICY "anon_no_access_messages" ON messages FOR ALL TO anon USING (false);

-- 6. Create updated_at trigger
CREATE OR REPLACE FUNCTION update_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER messages_updated_at
    BEFORE UPDATE ON messages
    FOR EACH ROW
    EXECUTE FUNCTION update_messages_updated_at();

-- 7. Helper view: Recent messages with partner info
CREATE OR REPLACE VIEW messages_with_context AS
SELECT
    m.*,
    p.company_name as partner_name,
    p.region as partner_region,
    pc.name as contact_name,
    pc.email as contact_email
FROM messages m
LEFT JOIN partners p ON p.id = m.partner_id
LEFT JOIN partner_contacts pc ON pc.id = m.contact_id;

-- Grant access to the view
GRANT SELECT ON messages_with_context TO authenticated;
