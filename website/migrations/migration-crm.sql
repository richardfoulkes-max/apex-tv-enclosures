M-Di- Apex CRM Database Tables
-- Run this in Supabase SQL Editor

-- Partners table (main CRM data)
CREATE TABLE IF NOT EXISTS partners (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    company_name TEXT NOT NULL,
    contact_type TEXT DEFAULT 'partner', -- partner, contractor, commercial, retail
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
    contacts JSONB DEFAULT '[]'::jsonb, -- array of contact objects
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_contact TIMESTAMP WITH TIME ZONE
);

-- Partner activities table (timeline/history)
CREATE TABLE IF NOT EXISTS partner_activities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    activity_type TEXT NOT NULL, -- note, call, email_sent, email_received, meeting, demo, quote_sent, site_visit
    description TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_activities ENABLE ROW LEVEL SECURITY;

-- Policies: Users can see all partners (shared CRM)
CREATE POLICY "Users can view all partners" ON partners
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert partners" ON partners
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update partners" ON partners
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Users can delete partners" ON partners
    FOR DELETE USING (auth.role() = 'authenticated');

-- Policies for activities
CREATE POLICY "Users can view all activities" ON partner_activities
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert activities" ON partner_activities
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_partners_contact_type ON partners(contact_type);
CREATE INDEX IF NOT EXISTS idx_partners_status ON partners(status);
CREATE INDEX IF NOT EXISTS idx_partners_region ON partners(region);
CREATE INDEX IF NOT EXISTS idx_activities_partner ON partner_activities(partner_id);
CREATE INDEX IF NOT EXISTS idx_activities_timestamp ON partner_activities(timestamp DESC);
