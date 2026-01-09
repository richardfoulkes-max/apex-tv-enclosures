-- Apex CRM Database Tables (Simple - No Auth Required)
-- Run this in Supabase SQL Editor

-- Drop existing tables if needed (comment out if you want to preserve data)
-- DROP TABLE IF EXISTS partner_activities CASCADE;
-- DROP TABLE IF EXISTS partners CASCADE;

-- Partners table (main CRM data)
CREATE TABLE IF NOT EXISTS partners (
    id SERIAL PRIMARY KEY,
    company_name TEXT NOT NULL,
    contact_type TEXT DEFAULT 'partner', -- manufacturing, partner, commercial, retail
    partner_type TEXT,
    region TEXT,
    website TEXT,
    linkedin_url TEXT,
    address TEXT,
    lead_source TEXT,
    status TEXT DEFAULT 'Not Contacted',
    priority TEXT DEFAULT 'Medium',
    deal_value DECIMAL(12,2) DEFAULT 0,
    products_interested TEXT[], -- array of product names
    expected_close_date DATE,
    win_probability INTEGER DEFAULT 0,
    lost_reason TEXT,
    followup_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_contact TIMESTAMP WITH TIME ZONE
);

-- Partner contacts table (multiple contacts per partner)
CREATE TABLE IF NOT EXISTS partner_contacts (
    id SERIAL PRIMARY KEY,
    partner_id INTEGER REFERENCES partners(id) ON DELETE CASCADE,
    name TEXT,
    title TEXT,
    email TEXT,
    phone TEXT,
    is_primary BOOLEAN DEFAULT false,
    is_decision_maker BOOLEAN DEFAULT false
);

-- Partner activities table (timeline/history)
CREATE TABLE IF NOT EXISTS partner_activities (
    id SERIAL PRIMARY KEY,
    partner_id INTEGER REFERENCES partners(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL, -- note, call, email_sent, email_received, meeting, demo, quote_sent, site_visit
    description TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS for simple single-user setup
ALTER TABLE partners DISABLE ROW LEVEL SECURITY;
ALTER TABLE partner_contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE partner_activities DISABLE ROW LEVEL SECURITY;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_partners_contact_type ON partners(contact_type);
CREATE INDEX IF NOT EXISTS idx_partners_status ON partners(status);
CREATE INDEX IF NOT EXISTS idx_partners_region ON partners(region);
CREATE INDEX IF NOT EXISTS idx_contacts_partner ON partner_contacts(partner_id);
CREATE INDEX IF NOT EXISTS idx_activities_partner ON partner_activities(partner_id);
CREATE INDEX IF NOT EXISTS idx_activities_timestamp ON partner_activities(timestamp DESC);

-- Grant public access (for anon key)
GRANT ALL ON partners TO anon;
GRANT ALL ON partner_contacts TO anon;
GRANT ALL ON partner_activities TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
