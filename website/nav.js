// Apex Enclosures - Sidebar Navigation Component
// Include this script in any page to add the sidebar navigation

(function() {
    // Navigation structure
    const navStructure = {
        websites: {
            label: 'Websites',
            icon: '🌐',
            items: [
                { href: 'retail/index.html', label: 'Retail (Consumers)' },
                { href: 'partner/index.html', label: 'Partner Portal' },
                { href: 'commercial/index.html', label: 'Commercial (B2B)' }
            ]
        },
        dashboard: {
            label: 'Dashboard',
            icon: '📊',
            items: [
                { href: 'index.html', label: 'Home' },
                { href: 'project-tracker.html', label: 'Project Tracker' }
            ]
        },
        engineering: {
            label: 'Engineering',
            icon: '⚙️',
            items: [
                { href: 'specification.html', label: 'Specification' },
                { href: 'design-detailed.html', label: 'Design Details' },
                { href: 'designs.html', label: 'Design Gallery' },
                { href: 'bom-detailed.html', label: 'Bill of Materials' },
                { href: 'engineering-analysis.html', label: 'Engineering Analysis' },
                { href: 'control-logic.html', label: 'Control Logic' },
                { href: 'wiring-diagram.html', label: 'Wiring Diagram' },
                { href: 'tv-compatibility.html', label: 'TV Compatibility' },
                { href: 'audio-noise-video.html', label: 'Audio/Noise/Video' }
            ]
        },
        manufacturing: {
            label: 'Manufacturing',
            icon: '🏭',
            items: [
                { href: 'testing-plan.html', label: 'Testing Plan' },
                { href: 'qc-checklist.html', label: 'QC Checklist' },
                { href: 'compliance-guide.html', label: 'Compliance Guide' },
                { href: 'manufacturer-rfq.html', label: 'RFQ Package' },
                { href: 'china-suppliers.html', label: 'China Suppliers' }
            ]
        },
        sales: {
            label: 'Sales & Partners',
            icon: '🤝',
            items: [
                { href: 'partner-program.html', label: 'Partner Program' },
                { href: 'target-partners.html', label: 'Target Partners' },
                { href: 'contractors.html', label: 'UAE Contractors' },
                { href: 'b2b-targets.html', label: 'B2B Targets' },
                { href: 'partner-crm.html', label: 'Partner CRM' },
                { href: 'quote-calculator.html', label: 'Quote Calculator' }
            ]
        },
        market: {
            label: 'Market & Competition',
            icon: '📈',
            items: [
                { href: 'market-research.html', label: 'Market Research' },
                { href: 'competitor-analysis.html', label: 'Competitor Analysis' },
                { href: 'competitor-comparison.html', label: 'Competitor Comparison' },
                { href: 'product-opportunities.html', label: 'Product Opportunities' },
                { href: 'go-to-market.html', label: 'Go-To-Market' }
            ]
        },
        financial: {
            label: 'Financial',
            icon: '💰',
            items: [
                { href: 'financial-forecast.html', label: 'Financial Forecast' },
                { href: 'landed-cost-calculator.html', label: 'Landed Cost Calculator' },
                { href: 'global-pricing.html', label: 'Global Pricing' }
            ]
        },
        legal: {
            label: 'Legal',
            icon: '📋',
            items: [
                { href: 'legal-risk.html', label: 'Legal Risk Assessment' },
                { href: 'legal/terms-conditions.html', label: 'Terms & Conditions' },
                { href: 'legal/warranty-policy.html', label: 'Warranty Policy' },
                { href: 'legal/nda-template.html', label: 'NDA Template' },
                { href: 'legal/partner-agreement.html', label: 'Partner Agreement' }
            ]
        }
    };

    // Determine base path for links (handle subdirectories)
    const pathname = window.location.pathname;
    const isInSubdir = pathname.includes('/legal/') || pathname.includes('/retail/') || pathname.includes('/partner/') || pathname.includes('/commercial/');
    const basePath = isInSubdir ? '../' : '';

    // Get current page filename
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    const currentFullPath = isInSubdir ? 'legal/' + currentPage : currentPage;

    // Inject CSS
    const styles = `
        /* Sidebar Navigation Styles */
        :root {
            --nav-width: 260px;
            --nav-bg: #f8fafc;
            --nav-border: #e2e8f0;
            --nav-text: #64748b;
            --nav-text-hover: #0f172a;
            --nav-accent: #0d9488;
            --nav-section-bg: #ffffff;
        }

        body {
            margin-left: var(--nav-width) !important;
        }

        .apex-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            width: var(--nav-width);
            height: 100vh;
            background: var(--nav-bg);
            border-right: 1px solid var(--nav-border);
            overflow-y: auto;
            z-index: 1000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .apex-sidebar-header {
            padding: 1.25rem 1rem;
            border-bottom: 1px solid var(--nav-border);
            background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
        }

        .apex-sidebar-logo {
            color: #ffffff;
            font-size: 1.1rem;
            font-weight: 700;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .apex-sidebar-logo-icon {
            width: 32px;
            height: 32px;
            background: #ffffff;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #0d9488;
            font-weight: 700;
            font-size: 0.9rem;
        }

        .apex-nav-section {
            border-bottom: 1px solid var(--nav-border);
        }

        .apex-nav-section-header {
            padding: 0.75rem 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            color: var(--nav-text);
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            transition: all 0.2s;
            user-select: none;
        }

        .apex-nav-section-header:hover {
            background: var(--nav-section-bg);
            color: var(--nav-text-hover);
        }

        .apex-nav-section-header .icon {
            font-size: 1rem;
        }

        .apex-nav-section-header .arrow {
            margin-left: auto;
            transition: transform 0.2s;
            font-size: 0.7rem;
        }

        .apex-nav-section.collapsed .arrow {
            transform: rotate(-90deg);
        }

        .apex-nav-section.collapsed .apex-nav-items {
            display: none;
        }

        .apex-nav-items {
            padding: 0.25rem 0 0.5rem 0;
            background: var(--nav-section-bg);
        }

        .apex-nav-item {
            display: block;
            padding: 0.5rem 1rem 0.5rem 2.5rem;
            color: var(--nav-text);
            text-decoration: none;
            font-size: 0.85rem;
            transition: all 0.2s;
            border-left: 3px solid transparent;
        }

        .apex-nav-item:hover {
            color: var(--nav-text-hover);
            background: rgba(255,255,255,0.05);
        }

        .apex-nav-item.active {
            color: var(--nav-accent);
            background: rgba(13, 148, 136, 0.1);
            border-left-color: var(--nav-accent);
        }

        /* Mobile toggle */
        .apex-mobile-toggle {
            display: none;
            position: fixed;
            top: 1rem;
            left: 1rem;
            z-index: 1001;
            background: #0d9488;
            border: 1px solid #0f766e;
            border-radius: 8px;
            padding: 0.75rem;
            cursor: pointer;
            color: #ffffff;
            font-size: 1.25rem;
        }

        @media (max-width: 900px) {
            body {
                margin-left: 0 !important;
            }

            .apex-sidebar {
                transform: translateX(-100%);
                transition: transform 0.3s;
            }

            .apex-sidebar.open {
                transform: translateX(0);
            }

            .apex-mobile-toggle {
                display: block;
            }

            .apex-sidebar-overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 999;
            }

            .apex-sidebar-overlay.open {
                display: block;
            }
        }

        /* Hide old navigation if present */
        body > nav:not(.apex-sidebar),
        .nav,
        .doc-nav,
        nav[style*="background: #111"],
        nav[style*="background:#111"] {
            display: none !important;
        }

        /* Fix container margins for pages with old styles */
        .container {
            margin-left: 0 !important;
        }
    `;

    // Create and inject style element
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    // Build sidebar HTML
    let sidebarHTML = `
        <div class="apex-sidebar-overlay" onclick="toggleApexSidebar()"></div>
        <button class="apex-mobile-toggle" onclick="toggleApexSidebar()">☰</button>
        <nav class="apex-sidebar">
            <div class="apex-sidebar-header">
                <a href="${basePath}index.html" class="apex-sidebar-logo">
                    <span class="apex-sidebar-logo-icon">A</span>
                    Apex Enclosures
                </a>
            </div>
    `;

    // Add sections
    Object.entries(navStructure).forEach(([key, section]) => {
        // Check if any item in this section is active
        const hasActive = section.items.some(item => {
            const itemPath = item.href;
            return itemPath === currentFullPath ||
                   (isInSubdir && item.href.startsWith('legal/') && item.href.replace('legal/', '') === currentPage);
        });

        sidebarHTML += `
            <div class="apex-nav-section${hasActive ? '' : ' collapsed'}" data-section="${key}">
                <div class="apex-nav-section-header" onclick="toggleApexSection('${key}', event)">
                    <span class="icon">${section.icon}</span>
                    <span>${section.label}</span>
                    <span class="arrow">▼</span>
                </div>
                <div class="apex-nav-items">
        `;

        section.items.forEach(item => {
            let href = basePath + item.href;
            const isActive = item.href === currentFullPath ||
                           (isInSubdir && item.href.startsWith('legal/') && item.href.replace('legal/', '') === currentPage);

            sidebarHTML += `
                <a href="${href}" class="apex-nav-item${isActive ? ' active' : ''}">${item.label}</a>
            `;
        });

        sidebarHTML += `
                </div>
            </div>
        `;
    });

    sidebarHTML += '</nav>';

    // Inject sidebar into page
    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    // Toggle functions
    window.toggleApexSection = function(sectionKey, event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        const section = document.querySelector(`.apex-nav-section[data-section="${sectionKey}"]`);
        if (section) {
            section.classList.toggle('collapsed');
            // Save state to localStorage
            const collapsed = JSON.parse(localStorage.getItem('apexNavCollapsed') || '{}');
            collapsed[sectionKey] = section.classList.contains('collapsed');
            localStorage.setItem('apexNavCollapsed', JSON.stringify(collapsed));
        }
    };

    window.toggleApexSidebar = function() {
        document.querySelector('.apex-sidebar').classList.toggle('open');
        document.querySelector('.apex-sidebar-overlay').classList.toggle('open');
    };

    // Restore collapsed state from localStorage
    const savedCollapsed = JSON.parse(localStorage.getItem('apexNavCollapsed') || '{}');
    Object.entries(savedCollapsed).forEach(([key, isCollapsed]) => {
        const section = document.querySelector(`.apex-nav-section[data-section="${key}"]`);
        if (section) {
            // Don't override if section has active item
            const hasActive = section.querySelector('.apex-nav-item.active');
            if (!hasActive) {
                section.classList.toggle('collapsed', isCollapsed);
            }
        }
    });
})();
