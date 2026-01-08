// Apex Enclosures - Context-Aware Sidebar Navigation
// Shows Sales OR Product nav based on current page

(function() {
    // Sales & Operations pages
    const salesPages = [
        'ai-dashboard.html',
        'ai-queue.html',
        'orders.html',
        'factory-orders.html',
        'ai-insights.html',
        'project-tracker.html',
        'partner-crm.html',
        'partner-program.html',
        'target-partners.html',
        'contractors.html',
        'b2b-targets.html',
        'quote-calculator.html',
        'bd-plan.html',
        'go-to-market.html',
        'setup.html',
        'product-overview.html',
        'meeting-eurotech.html'
    ];

    // Sales Navigation Structure
    const salesNav = {
        dashboard: {
            label: 'Dashboard',
            icon: '📊',
            items: [
                { href: 'ai-dashboard.html', label: 'Dashboard' },
                { href: 'project-tracker.html', label: 'Command Center' }
            ]
        },
        bd: {
            label: 'Business Development',
            icon: '💼',
            items: [
                { href: 'partner-crm.html', label: 'Apex CRM' },
                { href: 'ai-queue.html', label: 'AI Queue' },
                { href: 'product-overview.html', label: 'Product Overview' },
                { href: 'meeting-eurotech.html', label: 'Eurotech Meeting' }
            ]
        },
        planning: {
            label: 'Planning',
            icon: '🎯',
            items: [
                { href: 'bd-plan.html', label: 'BD Plan' },
                { href: 'go-to-market.html', label: 'Go to Market' },
                { href: 'target-partners.html', label: 'Target Partners' },
                { href: 'contractors.html', label: 'Contractors' },
                { href: 'b2b-targets.html', label: 'Commercial Targets' }
            ]
        },
        operations: {
            label: 'Operations',
            icon: '📥',
            items: [
                { href: 'orders.html', label: 'Orders Pipeline' },
                { href: 'factory-orders.html', label: 'Factory Orders' },
                { href: 'ai-insights.html', label: 'AI Insights' }
            ]
        },
        tools: {
            label: 'Tools',
            icon: '🛠️',
            items: [
                { href: 'quote-calculator.html', label: 'Quote Calculator' },
                { href: 'partner-program.html', label: 'Partner Program' },
                { href: 'setup.html', label: 'Settings' }
            ]
        }
    };

    // TV Enclosure Navigation Structure
    const tvNav = {
        dashboard: {
            label: 'Dashboard',
            icon: '📊',
            items: [
                { href: 'index.html', label: 'Home' }
            ]
        },
        tvEnclosures: {
            label: 'ATE - TV Enclosures',
            icon: '📺',
            items: [
                { href: 'specification.html', label: 'Specification' },
                { href: 'design-detailed.html', label: 'Design Details' },
                { href: 'designs.html', label: 'Design Gallery' },
                { href: 'color-configurator.html', label: 'Color Configurator' },
                { href: 'ai-image-prompts.html', label: 'AI Image Prompts' },
                { href: 'bom-detailed.html', label: 'BOM (Internal)' },
                { href: 'engineering-analysis.html', label: 'Engineering Analysis' },
                { href: 'control-logic.html', label: 'Control Logic' },
                { href: 'wiring-diagram.html', label: 'Wiring Diagram' },
                { href: 'tv-compatibility.html', label: 'TV Compatibility' },
                { href: 'audio-noise-video.html', label: 'Audio/Noise/Video' },
                { href: 'cavity-requirements.html', label: 'Cavity Requirements' }
            ]
        },
        manufacturing: {
            label: 'Manufacturing',
            icon: '🏭',
            items: [
                { href: 'eurotech-profile.html', label: 'Eurotech (Partner)' },
                { href: 'bom-manufacturer.html', label: 'Component List' },
                { href: 'testing-plan.html', label: 'Testing Plan' },
                { href: 'qc-checklist.html', label: 'QC Checklist' },
                { href: 'compliance-guide.html', label: 'Compliance Guide' },
                { href: 'manufacturer-rfq.html', label: 'RFQ Package' },
                { href: 'china-suppliers.html', label: 'China Suppliers' }
            ]
        },
        market: {
            label: 'Market Research',
            icon: '📈',
            items: [
                { href: 'market-research.html', label: 'Market Research' },
                { href: 'competitor-analysis.html', label: 'Competitor Analysis' },
                { href: 'competitor-comparison.html', label: 'Competitor Comparison' },
                { href: 'product-opportunities.html', label: 'Product Opportunities' }
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

    // Pool Enclosure Navigation Structure
    const poolNav = {
        dashboard: {
            label: 'Dashboard',
            icon: '📊',
            items: [
                { href: 'index.html', label: 'Home' }
            ]
        },
        poolPump: {
            label: 'APE-P - Pump Enclosure',
            icon: '🔵',
            items: [
                { href: 'pool-specification.html', label: 'Specification' },
                { href: 'pool-designs.html', label: 'Design Drawings' },
                { href: 'pool-bom.html', label: 'BOM' },
                { href: 'pool-acoustic-design.html', label: 'Acoustic Design' },
                { href: 'pool-engineering-analysis.html', label: 'Engineering Analysis' },
                { href: 'pool-prototype-pack.html', label: 'Prototype Pack' }
            ]
        },
        poolChiller: {
            label: 'APE-HC - Heater/Chiller',
            icon: '❄️',
            items: [
                { href: 'pool-chiller-specification.html', label: 'Specification' },
                { href: 'pool-chiller-designs.html', label: 'Design Drawings' },
                { href: 'pool-chiller-bom.html', label: 'BOM' }
            ]
        },
        poolStorage: {
            label: 'APE-S - Storage Enclosure',
            icon: '📦',
            items: [
                { href: 'pool-storage-specification.html', label: 'Specification' }
            ]
        },
        poolManufacturing: {
            label: 'Manufacturing',
            icon: '🏭',
            items: [
                { href: 'eurotech-profile.html', label: 'Eurotech (Partner)' }
            ]
        },
        poolMarket: {
            label: 'Market Research',
            icon: '📈',
            items: [
                { href: 'pool-market-research.html', label: 'Pool Market Research' },
                { href: 'pool-selling-points.html', label: 'Selling Points' }
            ]
        }
    };

    // Legacy alias for backwards compatibility
    const productNav = tvNav;

    // Determine current page and context
    const pathname = window.location.pathname;
    const isInSubdir = pathname.includes('/legal/') || pathname.includes('/retail/') || pathname.includes('/partner/') || pathname.includes('/commercial/');
    const basePath = isInSubdir ? '../' : '';
    const currentPage = pathname.split('/').pop() || 'index.html';
    const currentFullPath = isInSubdir ? 'legal/' + currentPage : currentPage;

    // Determine if we're in Sales or Product context
    const isSalesContext = salesPages.includes(currentPage);
    const isPoolPage = currentPage.startsWith('pool-');
    const navStructure = isSalesContext ? salesNav : (isPoolPage ? poolNav : tvNav);
    const contextLabel = isSalesContext ? 'Sales & Ops' : (isPoolPage ? 'Pool Enclosures' : 'TV Enclosures');
    const contextColor = isSalesContext ? '#6366f1' : (isPoolPage ? '#0891b2' : '#0d9488');
    const switchHref = 'index.html';
    const switchLabel = 'Main Dashboard';

    // Inject CSS
    const styles = `
        :root {
            --nav-width: 240px;
            --nav-bg: #1a1a2e;
            --nav-border: #2d2d44;
            --nav-text: #a0a0b0;
            --nav-text-hover: #ffffff;
            --nav-accent: ${contextColor};
            --nav-divider: #3d3d5c;
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
            display: flex;
            flex-direction: column;
        }

        .apex-sidebar.restoring-scroll {
            visibility: hidden;
        }

        .apex-sidebar-header {
            padding: 1rem;
            border-bottom: 1px solid var(--nav-border);
            background: linear-gradient(135deg, ${contextColor} 0%, ${contextColor}dd 100%);
        }

        .apex-sidebar-logo {
            color: #ffffff;
            font-size: 1rem;
            font-weight: 700;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .apex-sidebar-logo-icon {
            width: 28px;
            height: 28px;
            background: #ffffff;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${contextColor};
            font-weight: 700;
            font-size: 0.85rem;
        }

        .apex-sidebar-context {
            font-size: 0.7rem;
            opacity: 0.9;
            margin-top: 4px;
        }

        .apex-nav-content {
            flex: 1;
            overflow-y: auto;
        }

        .apex-nav-section {
            border-bottom: none;
        }

        .apex-nav-section-header {
            padding: 0.6rem 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            color: var(--nav-text);
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.03em;
            transition: all 0.2s;
            user-select: none;
        }

        .apex-nav-section-header:hover {
            color: var(--nav-text-hover);
        }

        .apex-nav-section-header .icon {
            font-size: 0.9rem;
        }

        .apex-nav-section-header .arrow {
            margin-left: auto;
            transition: transform 0.2s;
            font-size: 0.6rem;
        }

        .apex-nav-section.collapsed .arrow {
            transform: rotate(-90deg);
        }

        .apex-nav-section.collapsed .apex-nav-items {
            display: none;
        }

        .apex-nav-items {
            padding: 0 0 0.5rem 0;
        }

        .apex-nav-item {
            display: block;
            padding: 0.4rem 1rem 0.4rem 2.25rem;
            color: var(--nav-text);
            text-decoration: none;
            font-size: 0.8rem;
            transition: all 0.15s;
            border-left: 2px solid transparent;
        }

        .apex-nav-item:hover {
            color: var(--nav-text-hover);
            background: rgba(255,255,255,0.03);
        }

        .apex-nav-item.active {
            color: var(--nav-accent);
            background: rgba(99, 102, 241, 0.1);
            border-left-color: var(--nav-accent);
        }

        .apex-sidebar-footer {
            padding: 1rem;
            border-top: 1px solid var(--nav-border);
            background: rgba(0,0,0,0.2);
        }

        .apex-switch-context {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 0.6rem 0.8rem;
            background: rgba(255,255,255,0.05);
            border: 1px solid var(--nav-border);
            border-radius: 6px;
            color: var(--nav-text);
            text-decoration: none;
            font-size: 0.75rem;
            transition: all 0.2s;
        }

        .apex-switch-context:hover {
            background: rgba(255,255,255,0.1);
            color: var(--nav-text-hover);
            border-color: var(--nav-accent);
        }

        .apex-switch-icon {
            font-size: 1rem;
        }

        /* Mobile */
        .apex-mobile-bar {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 50px;
            background: ${contextColor};
            z-index: 1001;
            align-items: center;
            padding: 0 1rem;
            gap: 0.75rem;
        }

        .apex-mobile-toggle {
            display: none;
            background: rgba(255,255,255,0.15);
            border: none;
            border-radius: 6px;
            padding: 0.5rem 0.6rem;
            cursor: pointer;
            color: #ffffff;
            font-size: 1.1rem;
        }

        .apex-mobile-title {
            color: white;
            font-weight: 600;
            font-size: 0.9rem;
            flex: 1;
        }

        .apex-mobile-home {
            color: white;
            text-decoration: none;
            font-size: 1.1rem;
            padding: 0.4rem;
        }

        @media (max-width: 900px) {
            body {
                margin-left: 0 !important;
                padding-top: 50px !important;
            }
            .apex-mobile-bar { display: flex; }
            .apex-mobile-toggle { display: block; }
            .apex-sidebar {
                transform: translateX(-100%);
                transition: transform 0.3s;
                top: 50px;
                height: calc(100vh - 50px);
            }
            .apex-sidebar.open { transform: translateX(0); }
            .apex-sidebar-overlay {
                display: none;
                position: fixed;
                top: 50px; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 999;
            }
            .apex-sidebar-overlay.open { display: block; }

            /* Hide page headers on mobile - nav bar provides context */
            .header, .page-header, header.header, body > header {
                display: none !important;
            }
            /* Reset margins that account for hidden fixed headers */
            .main-container, .content, main {
                margin-top: 0 !important;
                padding-top: 0 !important;
            }
            /* Fix full-height layouts */
            body {
                height: auto !important;
                overflow: auto !important;
            }
            .container {
                padding: 1rem !important;
            }
        }

        /* Hide old nav */
        body > nav:not(.apex-sidebar),
        .nav, .doc-nav, .sales-nav,
        nav[style*="background: #111"],
        nav[style*="background:#111"] {
            display: none !important;
        }
        .container { margin-left: 0 !important; }
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    // Build sidebar HTML
    let sidebarHTML = `
        <div class="apex-sidebar-overlay" onclick="toggleApexSidebar()"></div>
        <div class="apex-mobile-bar">
            <button class="apex-mobile-toggle" onclick="toggleApexSidebar()">☰</button>
            <span class="apex-mobile-title">${contextLabel}</span>
            <a href="${basePath}index.html" class="apex-mobile-home">🏠</a>
        </div>
        <nav class="apex-sidebar">
            <div class="apex-sidebar-header">
                <a href="${basePath}index.html" class="apex-sidebar-logo">
                    <span class="apex-sidebar-logo-icon">A</span>
                    <div>
                        Apex Enclosures
                        <div class="apex-sidebar-context">${contextLabel}</div>
                    </div>
                </a>
            </div>
            <div class="apex-nav-content">
    `;

    // Add sections
    Object.entries(navStructure).forEach(([key, section]) => {
        const hasActive = section.items.some(item => {
            return item.href === currentFullPath ||
                   (isInSubdir && item.href.startsWith('legal/') && item.href.replace('legal/', '') === currentPage);
        });
        // Pool enclosure sections always expanded to show sub-menus
        const alwaysExpanded = ["poolPump", "poolChiller", "poolStorage"];
        const shouldExpand = hasActive || alwaysExpanded.includes(key);


        sidebarHTML += `
            <div class="apex-nav-section${shouldExpand ? '' : ' collapsed'}" data-section="${key}">
                <div class="apex-nav-section-header" onclick="toggleApexSection('${key}', event)">
                    <span class="icon">${section.icon}</span>
                    <span>${section.label}</span>
                    <span class="arrow">▼</span>
                </div>
                <div class="apex-nav-items">
        `;

        section.items.forEach(item => {
            const href = basePath + item.href;
            const isActive = item.href === currentFullPath ||
                           (isInSubdir && item.href.startsWith('legal/') && item.href.replace('legal/', '') === currentPage);
            sidebarHTML += `<a href="${href}" class="apex-nav-item${isActive ? ' active' : ''}">${item.label}</a>`;
        });

        sidebarHTML += `</div></div>`;
    });

    sidebarHTML += `
            </div>
            <div class="apex-sidebar-footer">
                <a href="${basePath}${switchHref}" class="apex-switch-context">
                    <span class="apex-switch-icon">🏠</span>
                    ${switchLabel}
                </a>
            </div>
        </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    // Toggle functions
    window.toggleApexSection = function(sectionKey, event) {
        if (event) { event.preventDefault(); event.stopPropagation(); }
        const section = document.querySelector(`.apex-nav-section[data-section="${sectionKey}"]`);
        if (section) {
            section.classList.toggle('collapsed');
            const collapsed = JSON.parse(localStorage.getItem('apexNavCollapsed') || '{}');
            collapsed[sectionKey] = section.classList.contains('collapsed');
            localStorage.setItem('apexNavCollapsed', JSON.stringify(collapsed));
        }
    };

    window.toggleApexSidebar = function() {
        document.querySelector('.apex-sidebar').classList.toggle('open');
        document.querySelector('.apex-sidebar-overlay').classList.toggle('open');
    };

    // Restore collapsed state (but always expand pool enclosure sections)
    const alwaysExpandedRestore = ['poolPump', 'poolChiller', 'poolStorage'];
    const savedCollapsed = JSON.parse(localStorage.getItem('apexNavCollapsed') || '{}');
    Object.entries(savedCollapsed).forEach(([key, isCollapsed]) => {
        const section = document.querySelector(`.apex-nav-section[data-section="${key}"]`);
        // Skip restoring collapsed state for always-expanded sections
        if (section && !section.querySelector('.apex-nav-item.active') && !alwaysExpandedRestore.includes(key)) {
            section.classList.toggle('collapsed', isCollapsed);
        }
    });

    // Scroll position handling
    const sidebar = document.querySelector('.apex-sidebar');
    document.querySelectorAll('.apex-nav-item').forEach(link => {
        link.addEventListener('click', () => localStorage.setItem('apexNavScrollPos', sidebar.scrollTop));
    });

    const savedScrollPos = localStorage.getItem('apexNavScrollPos');
    if (savedScrollPos && sidebar) {
        const targetScroll = parseInt(savedScrollPos, 10);
        sidebar.classList.add('restoring-scroll');
        sidebar.scrollTop = targetScroll;
        requestAnimationFrame(() => {
            sidebar.scrollTop = targetScroll;
            requestAnimationFrame(() => sidebar.classList.remove('restoring-scroll'));
        });
    }
})();
