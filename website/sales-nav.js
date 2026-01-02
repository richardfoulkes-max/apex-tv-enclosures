// Apex Enclosures - Sales & Operations Navigation
// Include this script in Sales pages for consistent navigation

(function() {
    const navItems = [
        { section: 'Core', items: [
            { href: 'ai-dashboard.html', label: 'Dashboard', icon: '📊' },
            { href: 'ai-queue.html', label: 'Queue', icon: '📥' },
            { href: 'orders.html', label: 'Orders', icon: '📦' },
            { href: 'ai-insights.html', label: 'Insights', icon: '📈' }
        ]},
        { section: 'Partners', items: [
            { href: 'partner-crm.html', label: 'CRM', icon: '🤝' },
            { href: 'partner-program.html', label: 'Program', icon: '📋' },
            { href: 'target-partners.html', label: 'Targets', icon: '🎯' },
            { href: 'contractors.html', label: 'Contractors', icon: '🔧' },
            { href: 'b2b-targets.html', label: 'B2B', icon: '🏢' }
        ]},
        { section: 'Tools', items: [
            { href: 'quote-calculator.html', label: 'Quotes', icon: '🧮' },
            { href: 'bd-plan.html', label: 'BD Plan', icon: '📝' },
            { href: 'go-to-market.html', label: 'GTM', icon: '🚀' },
            { href: 'setup.html', label: 'Settings', icon: '⚙️' }
        ]}
    ];

    // Get current page
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'ai-dashboard.html';

    // Inject CSS
    const styles = `
        .sales-nav {
            background: #ffffff;
            border-bottom: 1px solid #e2e8f0;
            padding: 0 32px;
            display: flex;
            gap: 32px;
            overflow-x: auto;
            font-family: 'Inter', -apple-system, sans-serif;
        }
        .sales-nav-section {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 12px 0;
        }
        .sales-nav-section-label {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #94a3b8;
            margin-right: 8px;
            font-weight: 600;
        }
        .sales-nav-item {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 12px;
            text-decoration: none;
            color: #64748b;
            font-size: 13px;
            font-weight: 500;
            border-radius: 6px;
            transition: all 0.15s;
            white-space: nowrap;
        }
        .sales-nav-item:hover {
            background: #f1f5f9;
            color: #1e293b;
        }
        .sales-nav-item.active {
            background: #ede9fe;
            color: #6366f1;
        }
        .sales-nav-divider {
            width: 1px;
            height: 24px;
            background: #e2e8f0;
            margin: 0 8px;
        }
        .sales-nav-home {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            text-decoration: none;
            color: #64748b;
            font-size: 13px;
            font-weight: 500;
            border-radius: 6px;
            transition: all 0.15s;
            border-right: 1px solid #e2e8f0;
            margin-right: 16px;
        }
        .sales-nav-home:hover {
            background: #f1f5f9;
            color: #1e293b;
        }
        .sales-nav-home-icon {
            width: 24px;
            height: 24px;
            background: #6366f1;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 12px;
        }
        @media (max-width: 900px) {
            .sales-nav {
                padding: 0 16px;
                gap: 16px;
            }
            .sales-nav-section-label {
                display: none;
            }
        }
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    // Build nav HTML
    let navHTML = `
        <nav class="sales-nav">
            <a href="index.html" class="sales-nav-home">
                <span class="sales-nav-home-icon">A</span>
                Apex
            </a>
    `;

    navItems.forEach((section, sIdx) => {
        navHTML += `<div class="sales-nav-section">`;
        navHTML += `<span class="sales-nav-section-label">${section.section}</span>`;

        section.items.forEach(item => {
            const isActive = item.href === currentPage;
            navHTML += `
                <a href="${item.href}" class="sales-nav-item${isActive ? ' active' : ''}">
                    <span>${item.icon}</span>
                    ${item.label}
                </a>
            `;
        });

        navHTML += `</div>`;

        if (sIdx < navItems.length - 1) {
            navHTML += `<div class="sales-nav-divider"></div>`;
        }
    });

    navHTML += `</nav>`;

    // Find the header and insert nav after it
    const header = document.querySelector('header, .header');
    if (header) {
        header.insertAdjacentHTML('afterend', navHTML);
    } else {
        // If no header, insert at start of body
        document.body.insertAdjacentHTML('afterbegin', navHTML);
    }
})();
