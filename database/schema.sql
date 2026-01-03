-- Apex Enclosures Database Schema
-- Run this in Supabase SQL Editor

-- ============================================
-- USER PROFILES TABLE (Supabase Auth integration)
-- ============================================
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- User info
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,

    -- Role
    role TEXT DEFAULT 'sales' CHECK (role IN ('admin', 'sales', 'viewer')),

    -- Activity tracking
    last_login TIMESTAMP WITH TIME ZONE
);

-- Enable RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read all profiles (for displaying names)
CREATE POLICY "Profiles are viewable by authenticated users" ON profiles
    FOR SELECT TO authenticated USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Auto-update timestamp for profiles
CREATE TRIGGER profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- CUSTOMERS TABLE
-- ============================================
CREATE TABLE customers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Basic info
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    company TEXT,

    -- Classification
    type TEXT CHECK (type IN ('retail', 'contractor', 'commercial', 'partner')),
    market TEXT CHECK (market IN ('uae', 'saudi', 'spain', 'france', 'other')),
    language TEXT DEFAULT 'english',

    -- Source tracking
    source TEXT, -- whatsapp, email, website, linkedin, referral
    source_detail TEXT, -- specific campaign, referrer name, etc.

    -- Status
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'quoted', 'won', 'lost')),

    -- Notes
    notes TEXT
);

-- ============================================
-- ENQUIRIES TABLE (Customer messages)
-- ============================================
CREATE TABLE enquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Link to customer
    customer_id UUID REFERENCES customers(id),

    -- Message details
    channel TEXT NOT NULL, -- whatsapp, email, website, linkedin
    direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),

    -- Content
    subject TEXT,
    message TEXT NOT NULL,
    message_translated TEXT, -- English translation if original is other language
    original_language TEXT DEFAULT 'english',

    -- Product interest
    product TEXT CHECK (product IN ('tv', 'pool', 'both', 'unknown')),
    enquiry_type TEXT, -- pricing, technical, support, quote, general

    -- For AI processing
    ai_processed BOOLEAN DEFAULT FALSE,
    ai_draft_id UUID -- links to ai_interactions
);

-- ============================================
-- AI INTERACTIONS TABLE (Learning data)
-- ============================================
CREATE TABLE ai_interactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE,

    -- Link to enquiry/customer
    enquiry_id UUID REFERENCES enquiries(id),
    customer_id UUID REFERENCES customers(id),

    -- Context
    interaction_type TEXT NOT NULL, -- lead_response, follow_up, quote, outreach, support
    channel TEXT,
    market TEXT,
    product TEXT,
    language TEXT,

    -- AI Draft
    ai_draft TEXT NOT NULL,
    ai_draft_translated TEXT, -- English version if draft is in other language
    confidence_score INTEGER DEFAULT 0, -- 0-100

    -- Human Review
    action TEXT CHECK (action IN ('pending', 'approved', 'edited', 'rejected')),
    action_by TEXT, -- user who took action
    action_at TIMESTAMP WITH TIME ZONE,

    -- If edited
    final_draft TEXT,
    edit_notes TEXT,

    -- If rejected
    reject_reason TEXT,

    -- Learning metadata
    patterns_detected JSONB -- store detected patterns for learning
);

-- ============================================
-- LEARNED PATTERNS TABLE
-- ============================================
CREATE TABLE learned_patterns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Pattern info
    pattern_type TEXT NOT NULL, -- 'remove_markdown', 'tone_adjustment', 'phrase_preference', etc.
    description TEXT,

    -- What to look for / what to do
    original_pattern TEXT,
    replacement TEXT,

    -- Confidence (how many times seen)
    occurrence_count INTEGER DEFAULT 1,
    confidence DECIMAL(3,2) DEFAULT 0.5, -- 0.00 to 1.00

    -- Is this active?
    is_active BOOLEAN DEFAULT TRUE,

    -- Context (when to apply)
    applies_to_market TEXT[], -- null = all markets
    applies_to_product TEXT[], -- null = all products
    applies_to_type TEXT[] -- null = all interaction types
);

-- ============================================
-- QUOTES TABLE
-- ============================================
CREATE TABLE quotes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Links
    customer_id UUID REFERENCES customers(id),

    -- Quote details
    quote_number TEXT UNIQUE,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired')),

    -- Products (JSONB for flexibility)
    items JSONB NOT NULL, -- [{product: 'ATE-75', qty: 2, unit_price: 10500, discount: 0.15}, ...]

    -- Totals
    subtotal DECIMAL(12,2),
    discount_percent DECIMAL(5,2),
    discount_amount DECIMAL(12,2),
    total DECIMAL(12,2),
    currency TEXT DEFAULT 'AED',

    -- Terms
    valid_until DATE,
    payment_terms TEXT,
    notes TEXT,

    -- Tracking
    sent_at TIMESTAMP WITH TIME ZONE,
    viewed_at TIMESTAMP WITH TIME ZONE,
    responded_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_status ON customers(status);
CREATE INDEX idx_customers_market ON customers(market);
CREATE INDEX idx_enquiries_customer ON enquiries(customer_id);
CREATE INDEX idx_enquiries_created ON enquiries(created_at DESC);
CREATE INDEX idx_ai_interactions_action ON ai_interactions(action);
CREATE INDEX idx_ai_interactions_pending ON ai_interactions(action) WHERE action = 'pending';
CREATE INDEX idx_quotes_customer ON quotes(customer_id);
CREATE INDEX idx_quotes_status ON quotes(status);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE learned_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- For now, allow all operations with anon key (single user system)
-- In production, you'd add user-based policies
CREATE POLICY "Allow all for anon" ON customers FOR ALL USING (true);
CREATE POLICY "Allow all for anon" ON enquiries FOR ALL USING (true);
CREATE POLICY "Allow all for anon" ON ai_interactions FOR ALL USING (true);
CREATE POLICY "Allow all for anon" ON learned_patterns FOR ALL USING (true);
CREATE POLICY "Allow all for anon" ON quotes FOR ALL USING (true);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER customers_updated_at
    BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER learned_patterns_updated_at
    BEFORE UPDATE ON learned_patterns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER quotes_updated_at
    BEFORE UPDATE ON quotes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Generate quote number
CREATE OR REPLACE FUNCTION generate_quote_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.quote_number IS NULL THEN
        NEW.quote_number = 'APX-' || TO_CHAR(NOW(), 'YYMM') || '-' ||
                           LPAD(NEXTVAL('quote_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE IF NOT EXISTS quote_seq START 1;

CREATE TRIGGER quotes_generate_number
    BEFORE INSERT ON quotes
    FOR EACH ROW EXECUTE FUNCTION generate_quote_number();

-- ============================================
-- PARTNERS TABLE (Manufacturing/Fabrication partners)
-- ============================================
CREATE TABLE partners (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_contact TIMESTAMP WITH TIME ZONE,

    -- Company info
    company_name TEXT NOT NULL,
    partner_type TEXT CHECK (partner_type IN ('Fabricator', 'Supplier', 'Distributor', 'Contractor', 'Reseller')),
    region TEXT, -- UAE, Saudi, China, GCC, etc.
    website TEXT,
    linkedin_url TEXT,
    address TEXT,

    -- Lead tracking
    lead_source TEXT CHECK (lead_source IN ('cold_outreach', 'referral', 'inbound', 'trade_show', 'linkedin', 'other')),
    status TEXT DEFAULT 'Not Contacted' CHECK (status IN ('Not Contacted', 'Contacted', 'Responded', 'Meeting Scheduled', 'Quoted', 'Negotiating', 'Won', 'Lost')),
    priority TEXT DEFAULT 'Medium' CHECK (priority IN ('High', 'Medium', 'Low')),

    -- Deal info
    deal_value DECIMAL(12,2) DEFAULT 0,
    win_probability INTEGER DEFAULT 0, -- 0-100
    expected_close_date DATE,
    lost_reason TEXT,
    products_interested TEXT[], -- ['75"', '65"', 'Pool']

    -- Follow-up
    followup_date DATE,
    notes TEXT
);

-- ============================================
-- PARTNER CONTACTS TABLE
-- ============================================
CREATE TABLE partner_contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    name TEXT,
    title TEXT,
    email TEXT,
    phone TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    is_decision_maker BOOLEAN DEFAULT FALSE
);

-- ============================================
-- PARTNER ACTIVITIES TABLE
-- ============================================
CREATE TABLE partner_activities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    activity_type TEXT NOT NULL CHECK (activity_type IN ('note', 'call', 'email_sent', 'email_received', 'meeting', 'demo', 'quote_sent', 'site_visit')),
    description TEXT NOT NULL
);

-- Indexes for partners
CREATE INDEX idx_partners_status ON partners(status);
CREATE INDEX idx_partners_region ON partners(region);
CREATE INDEX idx_partners_followup ON partners(followup_date);
CREATE INDEX idx_partner_contacts_partner ON partner_contacts(partner_id);
CREATE INDEX idx_partner_activities_partner ON partner_activities(partner_id);

-- RLS for partners
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for anon" ON partners FOR ALL USING (true);
CREATE POLICY "Allow all for anon" ON partner_contacts FOR ALL USING (true);
CREATE POLICY "Allow all for anon" ON partner_activities FOR ALL USING (true);

-- Auto-update timestamp for partners
CREATE TRIGGER partners_updated_at
    BEFORE UPDATE ON partners
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
