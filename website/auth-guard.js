// Apex Enclosures - Auth Guard
// Add this to any page that requires authentication
// Include after Supabase SDK and before page scripts

(async function() {
    const SUPABASE_URL = 'https://krhyzbmewvfkacoujimm.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyaHl6Ym1ld3Zma2Fjb3VqaW1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczMjkyNTksImV4cCI6MjA4MjkwNTI1OX0.YygJElB9Vaet1bsz_4U8ePKidrleMnRzkoMCiy6oOUY';

    // Wait for Supabase to load
    if (!window.supabase) {
        console.error('Supabase SDK not loaded');
        return;
    }

    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Check session
    const { data: { session }, error } = await client.auth.getSession();

    if (!session?.user) {
        // Save current URL for redirect after login
        sessionStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = 'login.html';
        return;
    }

    // Store user info globally
    window.currentUser = session.user;
    window.supabaseClient = client;

    // Get user display name
    function getUserName() {
        const user = window.currentUser;
        if (!user) return 'Unknown';
        return user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
    }

    function getUserInitials() {
        const name = getUserName();
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }

    // Add user badge to sidebar
    function addUserBadge() {
        // Wait for sidebar to be injected by nav.js
        const checkSidebar = setInterval(() => {
            const sidebar = document.querySelector('.apex-sidebar');
            if (sidebar) {
                clearInterval(checkSidebar);

                // Find the footer and insert before it
                const footer = sidebar.querySelector('.apex-sidebar-footer');
                if (footer) {
                    const userBadge = document.createElement('div');
                    userBadge.className = 'apex-user-badge';
                    userBadge.innerHTML = `
                        <div class="user-avatar">${getUserInitials()}</div>
                        <div class="user-details">
                            <span class="user-name">${getUserName()}</span>
                            <button class="logout-btn" onclick="window.supabaseClient.auth.signOut().then(() => window.location.href='login.html')">Sign out</button>
                        </div>
                    `;
                    footer.parentNode.insertBefore(userBadge, footer);
                }
            }
        }, 100);

        // Timeout after 3 seconds
        setTimeout(() => clearInterval(checkSidebar), 3000);
    }

    // Add styles for user badge
    const style = document.createElement('style');
    style.textContent = `
        .apex-user-badge {
            padding: 0.75rem 1rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            border-top: 1px solid #2d2d44;
            background: rgba(0,0,0,0.15);
        }
        .apex-user-badge .user-avatar {
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, #6366f1, #4f46e5);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 13px;
            flex-shrink: 0;
        }
        .apex-user-badge .user-details {
            flex: 1;
            min-width: 0;
        }
        .apex-user-badge .user-name {
            display: block;
            color: #ffffff;
            font-size: 0.85rem;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .apex-user-badge .logout-btn {
            background: none;
            border: none;
            color: #a0a0b0;
            font-size: 0.75rem;
            cursor: pointer;
            padding: 0;
            margin-top: 2px;
        }
        .apex-user-badge .logout-btn:hover {
            color: #ffffff;
        }
    `;
    document.head.appendChild(style);

    // Add badge after DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addUserBadge);
    } else {
        addUserBadge();
    }

    // Expose helpers
    window.ApexAuth = {
        getUser: () => window.currentUser,
        getUserName,
        getUserInitials,
        signOut: () => client.auth.signOut().then(() => window.location.href = 'login.html')
    };
})();
