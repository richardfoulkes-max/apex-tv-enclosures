-- CRM Multi-User Permissions with Territory-Based Access
-- Run this in Supabase SQL Editor
--
-- This enables Row Level Security (RLS) so users only see partners
-- in their assigned territories:
-- - Richard (admin): ALL territories
-- - Tom Brooks: ME (Middle East) only
-- - Scott: US only

-- =============================================
-- STEP 1: Create user_territories table
-- =============================================
CREATE TABLE IF NOT EXISTS user_territories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    territory TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, territory)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_territories_user_id ON user_territories(user_id);

-- =============================================
-- STEP 2: Territory mapping function
-- =============================================
-- Maps region strings to territory codes
CREATE OR REPLACE FUNCTION get_territory(region TEXT) RETURNS TEXT AS $$
BEGIN
    RETURN CASE
        -- Middle East
        WHEN LOWER(region) IN ('uae', 'gcc', 'saudi', 'saudi arabia', 'bahrain',
                               'qatar', 'kuwait', 'oman', 'middle east', 'me',
                               'dubai', 'abu dhabi', 'sharjah') THEN 'ME'
        -- United States
        WHEN LOWER(region) IN ('usa', 'us', 'united states', 'america') THEN 'US'
        -- Europe
        WHEN LOWER(region) IN ('uk', 'europe', 'eu', 'spain', 'france',
                               'germany', 'italy', 'netherlands', 'belgium') THEN 'EU'
        -- Asia Pacific
        WHEN LOWER(region) IN ('china', 'asia', 'apac', 'singapore',
                               'hong kong', 'taiwan', 'japan', 'korea') THEN 'APAC'
        -- Catch all
        ELSE 'OTHER'
    END;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- =============================================
-- STEP 3: Enable Row Level Security
-- =============================================
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_activities ENABLE ROW LEVEL SECURITY;

-- =============================================
-- STEP 4: Drop any existing permissive policies
-- =============================================
DROP POLICY IF EXISTS "Allow all for anon" ON partners;
DROP POLICY IF EXISTS "Allow all for anon" ON partner_contacts;
DROP POLICY IF EXISTS "Allow all for anon" ON partner_activities;
DROP POLICY IF EXISTS "territory_access" ON partners;
DROP POLICY IF EXISTS "contacts_via_partner" ON partner_contacts;
DROP POLICY IF EXISTS "activities_via_partner" ON partner_activities;
DROP POLICY IF EXISTS "anon_no_access_partners" ON partners;
DROP POLICY IF EXISTS "anon_no_access_contacts" ON partner_contacts;
DROP POLICY IF EXISTS "anon_no_access_activities" ON partner_activities;

-- =============================================
-- STEP 5: Create territory-based policies
-- =============================================

-- Partners: User sees partners where their territory matches
CREATE POLICY "territory_access" ON partners
FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM user_territories ut
        WHERE ut.user_id = auth.uid()
        AND (ut.territory = 'ALL' OR ut.territory = get_territory(region))
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM user_territories ut
        WHERE ut.user_id = auth.uid()
        AND (ut.territory = 'ALL' OR ut.territory = get_territory(region))
    )
);

-- Contacts: Access via parent partner
CREATE POLICY "contacts_via_partner" ON partner_contacts
FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM partners p
        JOIN user_territories ut ON ut.user_id = auth.uid()
        WHERE p.id = partner_contacts.partner_id
        AND (ut.territory = 'ALL' OR ut.territory = get_territory(p.region))
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM partners p
        JOIN user_territories ut ON ut.user_id = auth.uid()
        WHERE p.id = partner_contacts.partner_id
        AND (ut.territory = 'ALL' OR ut.territory = get_territory(p.region))
    )
);

-- Activities: Access via parent partner
CREATE POLICY "activities_via_partner" ON partner_activities
FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM partners p
        JOIN user_territories ut ON ut.user_id = auth.uid()
        WHERE p.id = partner_activities.partner_id
        AND (ut.territory = 'ALL' OR ut.territory = get_territory(p.region))
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM partners p
        JOIN user_territories ut ON ut.user_id = auth.uid()
        WHERE p.id = partner_activities.partner_id
        AND (ut.territory = 'ALL' OR ut.territory = get_territory(p.region))
    )
);

-- =============================================
-- STEP 6: Block anonymous access
-- =============================================
CREATE POLICY "anon_no_access_partners" ON partners FOR ALL TO anon USING (false);
CREATE POLICY "anon_no_access_contacts" ON partner_contacts FOR ALL TO anon USING (false);
CREATE POLICY "anon_no_access_activities" ON partner_activities FOR ALL TO anon USING (false);

-- =============================================
-- STEP 7: Allow user_territories to be read by authenticated users
-- =============================================
ALTER TABLE user_territories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_read_own_territories" ON user_territories
FOR SELECT TO authenticated
USING (user_id = auth.uid());

-- =============================================
-- VERIFICATION: Run these to check setup
-- =============================================
-- SELECT * FROM user_territories;
-- SELECT get_territory('UAE');  -- Should return 'ME'
-- SELECT get_territory('USA');  -- Should return 'US'
