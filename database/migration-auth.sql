-- Apex Enclosures - Authentication Migration
-- Run this in Supabase SQL Editor to add user authentication support
-- Run AFTER you've enabled Supabase Auth in your project

-- ============================================
-- 1. CREATE PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
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

-- Also allow anon for now (during transition)
CREATE POLICY "Allow anon access to profiles" ON profiles
    FOR ALL TO anon USING (true);

-- ============================================
-- 2. ADD USER TRACKING TO EXISTING TABLES
-- ============================================

-- Add user columns to ai_interactions
ALTER TABLE ai_interactions
ADD COLUMN IF NOT EXISTS approved_by_user_id UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS approved_by_name TEXT;

-- Add user columns to orders (if exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders') THEN
        ALTER TABLE orders
        ADD COLUMN IF NOT EXISTS created_by_user_id UUID REFERENCES auth.users(id),
        ADD COLUMN IF NOT EXISTS created_by_name TEXT,
        ADD COLUMN IF NOT EXISTS updated_by_user_id UUID REFERENCES auth.users(id),
        ADD COLUMN IF NOT EXISTS updated_by_name TEXT;
    END IF;
END $$;

-- Add user columns to enquiries
ALTER TABLE enquiries
ADD COLUMN IF NOT EXISTS processed_by_user_id UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS processed_by_name TEXT;

-- ============================================
-- 3. CREATE FUNCTION TO AUTO-CREATE PROFILE
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 4. INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_ai_interactions_approved_by ON ai_interactions(approved_by_user_id);

-- ============================================
-- DONE!
-- ============================================
-- After running this:
-- 1. Go to Supabase Auth settings
-- 2. Enable Email provider (should be on by default)
-- 3. Create your first user at /login.html
-- 4. That user will automatically get a profile created
