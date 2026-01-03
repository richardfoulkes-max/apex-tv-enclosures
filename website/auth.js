// Apex Enclosures - Authentication Helper
// Uses Supabase Auth for user management

const SUPABASE_URL = 'https://krhyzbmewvfkacoujimm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyaHl6Ym1ld3Zma2Fjb3VqaW1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczMjkyNTksImV4cCI6MjA4MjkwNTI1OX0.YygJElB9Vaet1bsz_4U8ePKidrleMnRzkoMCiy6oOUY';

// Initialize Supabase client
const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// Auth state
let currentUser = null;

// Check if user is logged in
async function checkAuth() {
    if (!supabase) {
        console.error('Supabase not loaded');
        return null;
    }

    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
        console.error('Auth error:', error);
        return null;
    }

    if (session?.user) {
        currentUser = session.user;
        return currentUser;
    }

    return null;
}

// Require auth - redirect to login if not authenticated
async function requireAuth() {
    const user = await checkAuth();

    if (!user) {
        // Save current page to redirect back after login
        sessionStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = 'login.html';
        return null;
    }

    return user;
}

// Sign in with email/password
async function signIn(email, password) {
    if (!supabase) {
        return { error: { message: 'Supabase not loaded' } };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        return { error };
    }

    currentUser = data.user;

    // Update last_login in profiles
    await updateProfile({ last_login: new Date().toISOString() });

    return { user: data.user };
}

// Sign up new user
async function signUp(email, password, name) {
    if (!supabase) {
        return { error: { message: 'Supabase not loaded' } };
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name
            }
        }
    });

    if (error) {
        return { error };
    }

    // Create profile record
    if (data.user) {
        await supabase.from('profiles').insert({
            id: data.user.id,
            email: email,
            full_name: name,
            role: 'sales' // Default role
        });
    }

    return { user: data.user };
}

// Sign out
async function signOut() {
    if (!supabase) return;

    await supabase.auth.signOut();
    currentUser = null;
    window.location.href = 'login.html';
}

// Get current user
function getUser() {
    return currentUser;
}

// Get user display name
function getUserName() {
    if (!currentUser) return 'Unknown';
    return currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'User';
}

// Get user initials for avatar
function getUserInitials() {
    const name = getUserName();
    const parts = name.split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

// Update user profile
async function updateProfile(updates) {
    if (!supabase || !currentUser) return;

    await supabase.from('profiles')
        .upsert({
            id: currentUser.id,
            ...updates,
            updated_at: new Date().toISOString()
        });
}

// Get user profile
async function getProfile() {
    if (!supabase || !currentUser) return null;

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

    if (error) {
        console.error('Profile error:', error);
        return null;
    }

    return data;
}

// Inject user badge into nav
function injectUserBadge() {
    if (!currentUser) return;

    const badge = document.createElement('div');
    badge.className = 'user-badge';
    badge.innerHTML = `
        <div class="user-avatar">${getUserInitials()}</div>
        <div class="user-info">
            <span class="user-name">${getUserName()}</span>
            <button class="logout-btn" onclick="signOut()">Logout</button>
        </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .user-badge {
            position: fixed;
            bottom: 70px;
            left: 16px;
            width: 208px;
            background: rgba(255,255,255,0.1);
            border-radius: 8px;
            padding: 10px 12px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1001;
        }
        .user-avatar {
            width: 36px;
            height: 36px;
            background: #6366f1;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 14px;
        }
        .user-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
        .user-name {
            color: white;
            font-size: 13px;
            font-weight: 500;
        }
        .logout-btn {
            background: none;
            border: none;
            color: rgba(255,255,255,0.6);
            font-size: 11px;
            cursor: pointer;
            padding: 0;
            text-align: left;
        }
        .logout-btn:hover {
            color: white;
        }
        @media (max-width: 900px) {
            .user-badge { display: none; }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(badge);
}

// Export for use
window.ApexAuth = {
    checkAuth,
    requireAuth,
    signIn,
    signUp,
    signOut,
    getUser,
    getUserName,
    getUserInitials,
    getProfile,
    updateProfile,
    injectUserBadge
};
