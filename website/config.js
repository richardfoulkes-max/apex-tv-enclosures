// Apex Enclosures - Supabase Configuration
//
// SETUP INSTRUCTIONS:
// 1. Go to your Supabase project: https://supabase.com/dashboard
// 2. Click "Project Settings" (gear icon) > "API"
// 3. Copy the "Project URL" and paste below
// 4. Copy the "anon public" key and paste below
// 5. Run the schema.sql in Supabase SQL Editor (database/schema.sql)
//
// IMPORTANT: These are safe to expose in client-side code because:
// - The anon key only has access to what RLS policies allow
// - All sensitive operations require server-side authentication

const SUPABASE_CONFIG = {
    // Paste your Supabase project URL here (e.g., https://xxxxx.supabase.co)
    url: '',

    // Paste your anon (public) key here (starts with eyJ...)
    anonKey: ''
};

// Check if configured
function isSupabaseConfigured() {
    return SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey &&
           SUPABASE_CONFIG.url.includes('supabase.co');
}

// Export for use in other files
if (typeof module !== 'undefined') {
    module.exports = { SUPABASE_CONFIG, isSupabaseConfigured };
}
