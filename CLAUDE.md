# Apex Enclosures - Claude Code Context

## Context Preservation Rules
**IMPORTANT:** To prevent information loss during context compaction:
1. Update this file after ANY significant design decision or session work
2. Use detailed commit messages explaining "why" not just "what"
3. Add HTML comments for non-obvious technical decisions in code
4. Summarize key discussions before ending sessions
5. Keep the "Current Design State" section always up-to-date

---

## Project Overview
Apex Enclosures business project - outdoor enclosures for Gulf region.
- **Product 1:** TV Enclosures (ATE Series) - 75" prototype in development, v5.2.2 IP55
- **Product 2:** Pool Equipment Enclosures (APE Series) - v1.0 engineering complete

## GitHub Repository
https://github.com/richardfoulkes-max/apex-tv-enclosures (private)

## Project Location
`/Users/richardfoulkes/Library/CloudStorage/OneDrive-Personal/Documents/Projects/apex-tv-enclosures`

---

## Current Design State (v5.2.1 Recess-Compatible - VALIDATED)

### Design Version History
| Version | Architecture | Status | Notes |
|---------|-------------|--------|-------|
| v1.0 | Rear exhaust, 95mm depth | ARCHIVED | Initial concept |
| v2.0 | Rear exhaust, 115mm depth | ARCHIVED | IP66 upgrade |
| v3.0 | Front-breathing, 120mm depth | FAILED | Roundtable AI: BLOCK RELEASE |
| v4.0 | Ducted rear plenum, 150mm depth | FAILED | Roundtable AI: REDESIGN REQUIRED |
| v5.0 | Ducted rear plenum, 180mm depth | VALIDATED | Roundtable AI: PASS FOR PROTOTYPE |
| v5.1 | v5.0 + 3rd fan provision | SUPERSEDED | Production de-risk update |
| v5.2 | 160mm depth, 3 active fans | SUPERSEDED | Recess-compatible base design |
| **v5.2.1** | **v5.2 + engineering fixes** | **VALIDATED** | ChatGPT: PASS FOR PROTOTYPE |

### Why v5.0? (Design Evolution via Roundtable AI)

**v3.0 Failed (BLOCK RELEASE):**
- Front-breathing cooled glass, not TV heat sinks
- 4×60mm fans delivered only ~35 CFM (needed 116+)
- IP55 impossible with open slots

**v4.0 Improved but Failed (REDESIGN REQUIRED):**
- Ducted rear plenum (correct strategy)
- But 30mm plenum too restrictive, 80-100 CFM insufficient
- No service access without removing glass

**v5.0 Solution:**
- **180mm depth** (was 150mm) for proper 50mm plenum
- **2×140mm high-static fans** delivering 140-160 CFM
- **Hinged service door** in bottom bezel (fan access without glass removal)
- **Continuous glass channel** (not discrete clips)
- **Through-bolted VESA** (not adhesive)
- **Standard MERV 8 filter** (not optional)

**v5.2.1 Design (Recess-Compatible + Engineering Fixes):**
- **160mm depth** (reduced from 180mm) to match Apollo cavity requirements
- **30mm plenum + perforated diffuser plate** (8mm holes, 40% open)
- **3× Delta AFB1412HH-A fans** delivering 210-250 CFM (locked model)
- **60mm top gap** for recess (prevents exhaust recirculation)
- **45° exhaust deflector** - architectural shadow element design
- **4 latches + compression stops** on service door for IP54 seal

**v5.2.2 CURRENT Design (IP55 Upgrade):**
- All v5.2.1 features PLUS:
- **IP55 rated** - protected against low-pressure water jets (garden hose safe)
- **Double-layer labyrinth baffles** on intake with drip edges
- **75mm exhaust deflector** (was 50mm) with secondary lip
- **Gasketed filter drawer** for IP55 seal
- **Higher-durometer EPDM gaskets** throughout
- **180-210 CFM** (reduced from 210-250 due to baffle restriction)

### v5.2.2 Key Specifications (ATE-75)
| Parameter | Value | Notes |
|-----------|-------|-------|
| External dimensions | 1760 × 1040 × **160mm** | Recess-compatible |
| Exhaust deflector | **75mm @ 45° + secondary lip** | IP55 rain protection |
| Intake baffles | **Double-layer labyrinth** | IP55 jet resistant |
| Rear plenum | **30mm + diffuser** | Perforated plate equalizes flow |
| Fans | **3× Delta AFB1412HH-A** | 180-210 CFM, 4.8 mmH₂O static |
| Glass | **6mm laminated (3+3)** | Continuous channel retention |
| Service door | 1650 × 80mm, **4 latches** | Higher-durometer EPDM |
| Filter | **MERV 8 standard** | Gasketed drawer (IP55) |
| VESA | Through-bolted, 6mm plate | 75kg @ 3× safety factor |
| **IP rating** | **IP55** | Jet resistant, hose-cleanable |
| **Recess cavity** | **1820 × 1130 × 215mm** | 60mm top gap |

### Thermal Design (v5.2.2)
```
Air path: Bottom intake → Double-layer labyrinth → Filter → Diffuser plate →
          30mm rear plenum → TV back → 3× Delta fans → 75mm Deflector out
```
- **Target:** 180-210 CFM at 55°C ambient + solar
- **Heat load:** 550W (300W TV + 250W solar gain)
- **Margin:** ~60-90% wall-mount, 20-40% recess (adequate)

### BOM Summary (v5.2.2 - estimates)
- **BOM Cost:** $638.63 (+$26 for IP55 upgrade)
- **Target FOB:** $540-600
- **Retail:** AED 7,000 (~$1,900)

### File Structure
```
website/                    ← Website (v5.2.2 IP55 - fully updated)
├── index.html              ← Dashboard (links to all tools)
├── ai-queue.html           ← AI Director approval queue
├── ai-insights.html        ← AI learning analytics
├── partner-crm.html        ← Partner CRM tool
├── designs.html
├── specification.html
├── bom-detailed.html
├── engineering-analysis.html
├── control-logic.html
└── archive/

ai-director/                ← AI Director system (learning AI)
└── system-prompt.md        ← Full AI system prompt for Apex

fusion-scripts/             ← 3D models
├── ATE-75-Enclosure.scad   ← OpenSCAD parametric model
├── ATE-75-Enclosure.stl    ← Basic STL mesh
├── ATE-75-Enclosure.py     ← Fusion 360 Python script
└── Fusion-360-Instructions.md

internal/                   ← Internal analysis (not published)
└── apollo-thermal-analysis.md ← Competitor thermal analysis

manufacturer-rfq/           ← RFQ package for manufacturers
├── ATE-75-Specification.md     ← Original spec
├── ATE-75-Specification-v4.md  ← v4.0 (superseded)
├── ATE-75-Specification-v5.md  ← v5.0/5.1 (superseded)
└── ATE-75-Specification-v5.2.md ← v5.2 CURRENT (recess-compatible)

roundtable-ai/              ← Engineering validation briefs
├── product-brief.md            ← Market research brief
├── engineering-brief.txt       ← v3.0 review (BLOCK RELEASE)
├── engineering-brief-v4.txt    ← v4.0 review (REDESIGN REQUIRED)
└── engineering-brief-v5.txt    ← v5.0 review (PENDING)
```

---

## Procedures Reference
**Before sending emails:** Read `/Users/richardfoulkes/.claude/EMAIL_PROCEDURES.md`

**Before sending RFQ documents:** Always run pre-RFQ review checklist:
1. Remove all competitor references (Apollo, Aqualite, etc.)
2. Remove target pricing, FOB targets, margins, retail prices
3. Verify all size references match prototype (currently 75")
4. Check for placeholder text (XXX, TBD, TODO)
5. Verify document headers/footers match current model
6. Regenerate PDFs from cleaned HTML sources
7. Open folder for user to verify before sending

## Recent Work History

### Session: 2026-01-04 - Glass Spec Audit + Mobile Navigation Overhaul

**Glass specification update:**
- Changed from 8mm laminated (4+4) to 6mm laminated (3+3)
- Weight reduction: ~45kg → ~38kg (saves ~7kg with thinner glass)
- Updated all industry pages, qc-checklist, specification, drawing-styles

**Mobile navigation overhaul (nav.js):**
- Added clean 50px top bar: hamburger menu | "Sales & Ops" | home icon
- Page content pushed below bar (no overlap)
- Sidebar slides in below the top bar on tap
- Hidden page headers on mobile (redundant with nav bar)
- Fixed CRM page layout (had position:fixed header + 60px margin)
- Reset margin-top on .main-container for hidden fixed headers

**Navigation update:**
- Added product-overview.html and meeting-eurotech.html to Business Development nav
- Cross-links between Product Overview ↔ Meeting Prep pages

**User questions answered:**
- 43" model: Optional - start with 55"-86", add later if demand
- Larger than 86": 98" possible but shipping costs spike - custom/commercial only
- PWA app: Not yet - browser works fine, revisit when team grows

**Commits:** a8e45d2, b53af22, 75b3c4e, 00e3f73, 53aef5f, 31629f3, ba9f618

---

### Session: 2026-01-03 (Late Night) - CRM + Calendar + Business Planning

**CRM contact type filter (partner-crm.html):**
- Removed overflowing tabs (couldn't see Retail on narrow screens)
- Added dropdown filter: All Contacts / Manufacturing / Partners / Commercial / Retail
- Updated planning pages (contractors, target-partners, b2b-targets) with new categories

**Supabase CRM migration:**
- Created migrations/migration-crm.sql for partners + partner_activities tables
- User ran ALTER TABLE to add contact_type column to existing partners table

**Header standardization:**
- Fixed inconsistent header sizes/colors across Sales & Ops pages
- Standardized: padding 1.25rem 2rem, h1 1.5rem, colors #6366f1/#4f46e5

**Schedule Meeting button (CRM):**
- Added button to partner detail view - opens Google Calendar pre-filled
- **Issue:** Button not visible for user - needs debugging

**Business planning discussions:**
- 75" enclosure profit: ~$1,500-1,800 net per unit (55-65% margin)
- Liability protection: Product liability insurance, LLC formation, manufacturer indemnification, warranty terms, QC docs
- Google Workspace for business email/calendar - deferred for later

**Side project - Model Direct:**
- Created MVP concept for transparent modeling booking marketplace
- Solves Anna's problem: hidden agent fees (agents take 60% disguised as 25%)
- Features: Transparent pricing, escrow payments, cancellation protection, AI matching
- UK competitor analysis: Traditional agencies, Starnow, Mandy, Backstage, etc.
- Published: https://richardfoulkes-max.github.io/model-marketplace/

**Commits:** 9135b0a, 88fc856, 4419b23, 576c24f, 85c73d4

---

### Session: 2026-01-03 (Night) - Unified CRM + Navigation Restructure

**Navigation restructure (nav.js):**
- Reorganized Sales & Ops sidebar with cleaner sections:
  - Dashboard: Dashboard, Command Center
  - Business Development: Apex CRM, AI Queue, BD Plan, Go to Market
  - Planning: Target Partners, Contractors, Commercial Targets
  - Operations: Orders Pipeline, AI Insights
  - Tools: Quote Calculator, Partner Program, Settings
- Moved AI Queue from Operations to Business Development

**Apex CRM (partner-crm.html):**
- Renamed "Partner CRM" to "Apex CRM"
- Added contactType field: partner, contractor, commercial, retail
- Added type filter tabs at top (All/Partners/Contractors/Commercial/Retail)
- Contact type badge shows on list items and detail view
- Tab counts show number of contacts per type
- Updated data version to v6 with migration for existing data

**Add to CRM buttons on planning pages:**
- contractors.html: "+ CRM" button on each contractor card
- target-partners.html: "+ CRM" button on each partner item
- b2b-targets.html: "+ CRM" column added to all tables
- Modal pre-fills contactType based on source page:
  - contractors.html → contactType: 'contractor'
  - target-partners.html → contactType: 'partner'
  - b2b-targets.html → contactType: 'commercial'
- Button shows checkmark after successful add

**Deployed:** Committed (fae9b57) and pushed to Vercel

---

### Session: 2026-01-03 (Evening) - Unified Navigation + Purple Color Scheme

**Created unified context-aware navigation system:**
- Single nav.js detects current page and shows appropriate sidebar
- Sales & Ops pages: Purple (#6366f1) sidebar with Dashboard, Operations, Partners, Tools
- Product Dev pages: Teal (#0d9488) sidebar with Engineering, Manufacturing, Market, Financial, Legal
- Main dashboard (index.html) now standalone hub without sidebar
- Footer button to return to Main Dashboard from either context

**Fixed color consistency across all Sales & Ops pages:**
- Updated 14 pages to use purple color scheme
- Added purple page headers to: b2b-targets, target-partners, bd-plan, go-to-market, partner-program
- Fixed fixed-header positioning (left: 240px) for sidebar on: partner-crm, ai-queue, orders, manufacturer-rfq

**Navigation reorganization:**
- Moved BD Plan and Go to Market under Dashboard section
- Moved Command Center (project-tracker) to Sales & Ops
- Removed obsolete sales-nav.js (merged into nav.js)

**Partnership:**
- Created partnership-term-sheet.md for potential UK sales partner
- 50/50 equity split with performance vesting milestones

**Deployed:** Committed and pushed to Vercel (apex-tv-enclosures.vercel.app)

---

### Session: 2026-01-03 (PM) - DigiScreens Dispute Analysis

**Analyzed Apollo Desert Series unit vs marketing claims:**

**Fan Count Discrepancy:**
- Brochure claims: 3 axial + 2 cross-flow = 5 fans
- Actual unit: 5 axial + 4 cross-flow = 9 fans
- Discrepancy doesn't help mis-selling case (user got MORE fans)

**Fundamental Design Flaw Identified:**
- Apollo uses thermostat control (on/off at 30°C), not PWM
- In Dubai conditions (regularly >30°C even in shade/December), fans run at 100% constantly
- Even "quieter fans" won't solve the problem - constant operation defeats purpose
- Apex design uses PWM = graduated speed control = fans idle quietly when possible

**Dispute Response:**
- Drafted response to Leonie's offer (fly David to Dubai with quieter fans)
- Politely declined offer, explained fundamental design issue
- Requested full refund including installation costs
- Saved to: `/03-Projects/Apex TV Enclosures/DigiScreens Dispute/response_2026-01-03.md`

**Dashboard Update:**
- Added DigiScreens dispute to projects-home.html Personal Projects section
- Updated project counts (Total: 11, Personal: 3)

---

### Session: 2026-01-03 - Navigation System Reorganization

**Split navigation into Sales vs Product areas:**

**Created sales-nav.js (horizontal nav bar for Sales pages):**
- Grouped navigation: Core (Dashboard/Queue/Orders/Insights), Partners (CRM/Program/Targets/Contractors/B2B), Tools (Quotes/BD Plan/GTM/Settings)
- Apex logo links back to main dashboard
- Active state highlighting for current page
- 14 pages updated to use sales-nav.js

**Updated nav.js (sidebar for Product pages only):**
- Removed Sales & Partners section (now in sales-nav.js)
- Dashboard section links to product-dashboard.html
- Sidebar header now shows "Product Dev" with P icon
- Added product-dashboard.html to use this nav

**Customer-facing pages cleaned up:**
- Removed nav.js from retail/partner/commercial pages
- These shouldn't show internal navigation to customers

**Pages using sales-nav.js:**
- ai-dashboard, ai-queue, orders, ai-insights, partner-crm
- quote-calculator, partner-program, target-partners
- contractors, b2b-targets, bd-plan, go-to-market, setup

**Pages using nav.js (Product sidebar):**
- product-dashboard, specification, designs, bom-detailed
- engineering-analysis, control-logic, wiring-diagram
- testing-plan, qc-checklist, manufacturer-rfq, etc.

---

### Session: 2026-01-02 (Evening) - Lead Capture + Dashboard Reorganization

**Dashboard Reorganization:**
- Split into two main areas: Sales & Operations vs Product Development
- Master dashboard (index.html): Clean hub with two main cards
- Sales dashboard (ai-dashboard.html): AI Queue, Orders, CRM, Insights
- Product dashboard (product-dashboard.html): Specs, BOMs, Testing, RFQs
- Product dashboard has tabs to switch between TV Enclosures (v5.2.2) and Pool Equipment (v1.0)
- Clean navigation between all areas

**Zapier Webhook Integration:**
- Created `/api/zapier.js` with sendToZapier() helper function
- Events: new_enquiry, new_order, order_status_changed, order_won, order_lost
- Added Zapier config UI to setup.html with test button
- Updated enquiries.js and orders.js to trigger webhooks

**Lead Capture System (chat-widget.js):**
- Floating chat bubble in bottom-right corner of all customer pages
- 3 options: WhatsApp (direct), Send Message (form), Free Guide (lead magnet)
- Contact form modal → submits to AI Director queue
- Lead magnet: "Outdoor TV Buying Guide" → captures email
- Added to 8 pages: retail (2), industries (3), partner (1), commercial (1)

**AI Director Dashboard (ai-dashboard.html):**
- Dedicated sales/CRM hub separate from main Apex dashboard
- Stats: Pending enquiries, Hot leads, Pipeline value, Follow-ups due
- Navigation cards to Queue, Orders, CRM, Insights
- Recent activity feed

**Consistent Navigation:**
- Added nav bar to all AI Director pages: Dashboard → Queue → Orders → Insights → CRM
- Updated: ai-queue.html, ai-insights.html, orders.html, partner-crm.html

**Deferred:**
- Mailgun auto-send ($15/mo) - requires email automation
- Auto-approve for high-confidence replies - needs data first

---

### Session: 2026-01-02 (PM) - Orders Pipeline + Auto Follow-ups

**Built complete order management system with automated follow-ups:**

**Orders Pipeline (orders.html):**
- 6-stage Kanban board: Quote → Deposit → Production → Shipped → Delivered → Lost
- One-click to advance orders through pipeline
- Pipeline value tracking (total AED in active orders)
- Auto-timestamps when orders move stages

**Auto Follow-up System (/api/auto-followups.js):**
- 8 automatic reminder rules based on time in status:
  - Quote: 3 days (check questions), 7 days (expiring), 14 days (expired)
  - Deposit: 7 days (timeline update), 14 days (confirm production)
  - Production: 21 days (check status)
  - Shipped: 3/7 days (confirm delivery)
- Runs automatically when Orders page loads

**Lead Temperature Tags:**
- Click badge to set: 🔥 Hot, 🌡️ Warm, ❄️ Cold, 💀 Dead
- Hot leads counter in header for prioritization

**Win/Loss Tracking:**
- Mark as Lost modal with reasons: Too expensive, Competitor, No response, Project cancelled, Bad timing, DIY
- Lost reason displayed on card in Lost column
- Enables pattern analysis over time

**Quote Calculator Integration:**
- Updated to save quotes to Supabase
- Auto-creates enquiry + order when submitted
- Links quotes to AI Queue and Orders Pipeline

**Competitive Analysis:**
- Compared AI Director to Respond.io ($79-279/mo), WATI ($49-99/mo), Intercom, Zendesk
- AI Director advantages: Lower cost (~$5-20/mo), better AI (Claude), learning system (RAG), order tracking
- Competitor advantages: Plug-and-play channels, team features, scale

**Files created:**
- `website/orders.html` - Orders Pipeline UI
- `website/api/orders.js` - Orders CRUD
- `website/api/follow-ups.js` - Follow-ups CRUD
- `website/api/auto-followups.js` - Auto-generate reminders

**Database tables added:**
- `orders` - Order pipeline tracking
- `follow_ups` - Reminder system
- Columns: `lead_temperature`, `lost_reason`, `lost_at`

---

### Session: 2026-01-01 (Late) - AI Director Learning System v1.0

**Built Phase 1 of AI Director - the learning AI system that handles customer inquiries:**

**Core Concept:**
- AI starts by asking for approval before sending any response
- Human reviews, approves/edits/rejects each AI draft
- System learns from corrections over time
- Eventually automates high-confidence responses

**Files created:**
- `website/ai-queue.html` - Approval queue interface for reviewing AI-drafted responses
- `website/ai-insights.html` - Learning analytics dashboard (approval rates, patterns, readiness)
- `ai-director/system-prompt.md` - Complete AI Director system prompt with product knowledge

**AI Director Features:**
- Multi-market support: UAE, Saudi Arabia, Spain, France (currencies, languages)
- Product catalog: ATE Series (TV enclosures) + APE Series (Pool enclosures)
- Pricing tiers: Retail, Partner (15-20% discount), Commercial (custom)
- Escalation rules: >AED 25K deals, angry customers, custom requests
- Response templates: Greetings, pricing, quotes, follow-ups
- Learning database: Stores all interactions for pattern recognition

**Dashboard Integration:**
- Added "AI Director" section to main dashboard (index.html)
- Navigation links between AI Queue, Insights, CRM, and Dashboard

**Future Phases:**
- Phase 2: Pattern recognition and confidence scoring
- Phase 3: Auto-approval for high-confidence actions
- Phase 4: Real Claude API integration for live responses

---

### Session: 2026-01-01 (PM) - APE Series Pool Equipment Enclosures v1.0

**Created complete engineering specification for APE Series Pool Equipment Enclosures:**

**Design Philosophy:**
- Modular system: BASE unit (600×600×800mm) + optional extensions (EXT-A, EXT-B, EXT-C)
- Acoustic focus: 70-80% noise reduction using 25-50mm closed-cell foam
- Passive ventilation: No fans required (unlike TV enclosures)
- Chiller variant (APE-CHILL): Louvered design for compressor airflow, 50-60% noise reduction only
- 316 SS hardware required for salt pool compatibility

**Files created:**
- `website/pool-specification.html` (~800 lines) - Full engineering spec with 12 sections
- `website/pool-designs.html` (5 SVG drawings) - Side cross-section, top view, chiller variant, access panel, front view
- `website/pool-bom.html` - Component costing: BASE $148, full system $318
- `manufacturer-rfq/APE-Specification-v1.md` - Manufacturer RFQ package

**Key specifications:**
- APE-BASE: 600×600×800mm, single pump capacity, ~$148 BOM
- APE-EXT-A: 300×600×800mm, filter module, ~$78 BOM
- APE-EXT-B: 400×600×800mm, chlorinator/automation, ~$92 BOM
- APE-CHILL: 1200×600×1000mm, standalone chiller enclosure, ~$252 BOM
- Materials: 5052-H32 aluminum, 316 SS fasteners, EPDM gaskets
- Pricing targets: BASE AED 1,500-2,000, Full system AED 5,000-6,500

**Market opportunity:** No UAE competitors. Australian imports $1,200+ USD. Pool contractors build custom but without acoustic treatment.

---

### Session: 2026-01-01 - Retykle Growth Plan + Apex WhatsApp Strategy

**Retykle UAE Growth Plan (side project for friend):**
- Comprehensive WhatsApp growth playbook (legitimate opt-in strategies)
- 10 silver bullet ideas they're NOT already doing
- Styled HTML to match Retykle branding (#4BA9A5 teal header)
- Published: https://richardfoulkes-max.github.io/retykle-growth-plan/
- Updated: Removed Elfsight (they already have widget), fixed market size $1.2B → $1.5B (Statista)

**Added WhatsApp Growth Strategy to Apex BD plan (website/bd-plan.html):**
- WhatsApp Business catalog setup
- Click-to-WhatsApp ads (AED 15-40/lead, 13× ROI example)
- QR codes for offline lead capture (business cards, demo unit, trade shows)
- Partner WhatsApp group strategy
- Automated quick replies (price, install, warranty triggers)
- 6-month growth roadmap (target 200+ contacts)

**WhatsApp tools explained:**
- WATI ($49/mo) - WhatsApp API, broadcasts, chatbots, team inbox
- Interakt ($15/mo) - Budget WhatsApp API, good Shopify integration
- Elfsight (free) - Website widget only (not needed if already have one)

**Commits:** 16ad10a (Apex BD plan), 261b6f3 (Retykle GitHub)

---

### Session: 2025-12-31 (Night) - Business Development & CRM Redesign

**New BD plan created (website/bd-plan.html):**
- Free traffic sources: LinkedIn, Google Business Profile, directories, Instagram
- LinkedIn strategy: 10-20 connections/week, 2-3 posts/week
- Directory listings: Bayut, PropertyFinder, TradeArabia, Clutch
- Outreach templates for LinkedIn, email, hotel inquiries
- Weekly action schedule (~3 hours/week for $0 marketing budget)

**Complete CRM redesign (website/partner-crm.html):**
- Master-detail layout: partner list on left, detail view on right
- Tabbed detail view: Overview, Contacts, Deal, Activity
- Multiple contacts per company with roles (Primary, Decision Maker)
- Deal tracking: value (AED), win probability (%), expected close, products interested
- Activity timeline with 8 types: Note, Call, Email Sent, Email Received, Meeting, Demo, Quote Sent, Site Visit
- Color-coded activity dots and chronological timeline
- Company info: LinkedIn URL, address, lead source tracking
- Lost reason capture when deals marked as lost
- Header stats: total partners, active deals, pipeline value, follow-ups due
- New v5 data structure with automatic migration from v4

**Commits:** 28f96e5, c1782e1, 9d6920d - all pushed to origin/main

---

### Session: 2025-12-31 (Late PM) - Website Cleanup, Pricing, Audit System

**Pricing updates:**
- 65": AED 9,000 → AED 8,500
- 75": AED 12,000 → AED 10,500
- Updated across: retail/index, retail/faq, industries/pool-areas, competitor-comparison

**Claims cleanup:**
- Added OLED TV warning (not suitable for outdoor - burn-in, not bright enough)
- Removed "garden hose cleaning" claims → changed to "rain and splashes"
- Removed competitor comparison language from customer-facing pages
- Simplified TV warranty text ("work directly with manufacturer")

**New audit system:**
- Created `AUDIT.md` - comprehensive consistency checklist
- Tracks: pricing, specs, claims, TV/speaker recs, contact info, page inventory
- Includes checklist for common changes (pricing, specs, contact info)
- Lists known inconsistencies to watch

**Commits:** 173c3d1, b70090d, 2b304d8 - all pushed to origin/main

---

### Session: 2025-12-31 (PM) - Industry Pages, FAQ, Competitor Analysis

**New pages created:**
- `website/industries/hotels-resorts.html` - Hospitality landing page
- `website/industries/restaurants-bars.html` - F&B landing page with speaker recs
- `website/industries/pool-areas.html` - Residential pool page with pricing, FAQ
- `website/retail/faq.html` - Comprehensive FAQ (8 sections, 25+ questions)
- `website/engineering-drawings.html` - Installation diagrams (hook & hang, cables, power)

**Competitor analysis:**
- Added Neptune TV to competitor-analysis.html (US-only, 50°C rating, 1-year warranty)
- Added Display Shield deep-dive to competitor-comparison.html (5 product lines, dealer program)

**Audio recommendations fixed:**
- Neptune soundbar is $899 (AED 3,300), not AED 600-1,200 as previously listed
- Neptune is US-only, doesn't ship internationally
- Replaced with SYLVOX Elf S2 (IP65, ~AED 750-1,000) as mid-tier option

**Other updates:**
- Added FAQ link to retail nav and footer
- Removed 30-day satisfaction guarantee (user decision - too risky for heavy products)
- Added "Key Research Documents" section to CLAUDE.md

**Commit:** 173c3d1 - pushed to origin/main

---

### Session: 2025-12-31 - SVG Drawing Overhaul for v5.2.2 IP55

**Complete rewrite of all 4 technical drawings in designs.html:**

1. **Side Cross-Section:** Rewrote to show v5.2.2 ducted rear-plenum architecture
   - 30mm rear plenum with perforated diffuser plate
   - 3× Delta AFB1412HH-A 140mm fans
   - 75mm @ 45° exhaust deflector with secondary lip
   - Double-layer labyrinth intake with drip edges
   - Heat gradient visualization

2. **Top Bezel Detail:** Updated for IP55 exhaust
   - 3× Delta 140mm fans (was 4× 60mm Noctua)
   - 75mm deflector with secondary lip
   - Double-layer louvers for IP55
   - 180-210 CFM (reduced for IP55 baffle restriction)

3. **Bottom Bezel Detail:** Complete IP55 intake redesign
   - Double-layer labyrinth baffles with drip edges
   - Gasketed MERV 8 filter drawer with pull tab
   - 316 SS insect mesh
   - Water jet blocking diagram
   - Tortuous airflow path visualization

4. **Front View:** Updated to v5.2.2 appearance
   - 6mm laminated glass callout
   - 4 service door latches (was 2 cam locks)
   - IP55 labyrinth intake appearance
   - 75mm deflector shadow element

**Also updated:**
- All spec tables to v5.2.2 (180-210 CFM, IP55)
- Materials & Fabrication table
- Thermal Validation section
- Size Variants header

**Commits:** `23a6873` - pushed to origin/main

---

### Session: 2025-12-29 (PM) - Major Engineering Redesign via Roundtable AI

**Roundtable AI engineering validation drove design from v3.0 → v5.0**

1. **3D Model Attempts:**
   - Attempted Fusion 360 modeling (user has no CAD experience)
   - Created OpenSCAD parametric model (ATE-75-Enclosure.scad)
   - Generated basic STL using numpy-stl Python library
   - Created Fusion 360 instructions for manual build
   - **Decision:** Let manufacturer create production CAD

2. **v3.0 Engineering Review (BLOCK RELEASE):**
   - Submitted to Roundtable AI for engineering validation
   - **Fatal flaws identified:**
     - Front-breathing path cooled glass, not TV heat sinks
     - 4×60mm fans delivered ~35 CFM (needed 116+ CFM)
     - IP55 impossible with open ventilation slots
     - 3mm aluminum insufficient at 1.76m span

3. **v4.0 Created & Reviewed (REDESIGN REQUIRED):**
   - Switched to ducted rear plenum (correct thermal strategy)
   - Increased depth to 150mm, plenum to 30mm
   - Upgraded to 2×120mm fans (80-100 CFM target)
   - **Still failed:** Thermal margin insufficient at 55°C + solar, poor serviceability

4. **v5.0 Created (Current Design):**
   - **Depth:** 180mm (50mm rear plenum)
   - **Fans:** 2×140mm high-static (140-160 CFM)
   - **Filter:** MERV 8 standard (not optional)
   - **Glass:** 6mm laminated with continuous channel retention
   - **Service:** Hinged door in bottom bezel
   - **VESA:** Through-bolted with 6mm reinforcement
   - **IP rating:** IP54 (realistic)

5. **Files Created:**
   - `fusion-scripts/` - OpenSCAD, STL, Fusion scripts
   - `manufacturer-rfq/ATE-75-Specification-v5.md` - Current spec
   - `roundtable-ai/engineering-brief-v5.txt` - Pending validation

6. **Next Steps:**
   - Run v5.0 through Roundtable AI validation
   - Target verdict: PASS FOR PROTOTYPE VALIDATION
   - Update website specs if v5.0 passes

---

### Session: 2025-12-29 (AM) - v3.0 Front-Breathing Design Complete
**Major redesign from rear-exhaust to front-breathing architecture**

1. **v3.0 Design Implementation:**
   - Created front-breathing airflow system (bottom bezel intake → top bezel exhaust)
   - Changed depth: 115mm → 120mm
   - Changed bezel: 20mm → 35mm (contains airflow slots)
   - Changed fans: 4×80mm rear → 4×60mm slim in top bezel
   - Sealed rear panel (no fans visible)

2. **Condensation Management Added:**
   - Identified higher condensation risk with 25mm air gap
   - Added anti-fog hydrophilic coating (+$10)
   - Added idle fan mode (10% PWM × 30 min post-shutdown)
   - Added condensation drain slots (3×5mm)
   - Updated control-logic.html with POST_COOL state

3. **Technical Drawings Created:**
   - 4 detailed SVG cross-sections in designs.html:
     - Side cross-section (complete airflow path with heat gradient)
     - Top bezel detail (fan + exhaust assembly)
     - Bottom bezel detail (intake + filter + drains)
     - Front view (bezel slot appearance)

4. **Archive Created:**
   - Created website/archive/ folder
   - Moved all v1.0/v2.0 content to archive/designs-legacy.html
   - Updated designs.html to show ONLY v3.0
   - Updated size variants table for v3.0 specs

5. **Files Modified:**
   - specification.html, bom-detailed.html, designs.html
   - engineering-analysis.html (Section 7: Condensation)
   - control-logic.html (idle fan mode)
   - ai-image-prompts.html (v3.0 render prompts)

6. **Commits:**
   - 31cec59: v3.0 Front-Breathing Design complete
   - 2e3a998: Add detailed SVG cross-section drawings
   - d000e02: Archive legacy v1-v2 designs
   - 1323544: Track CLAUDE.md for context preservation
   - 6986672: Add v3.0 lifestyle render

7. **AI Render Breakthrough:**
   - Technical spec prompts failed (too industrial or too plain TV)
   - **Lifestyle/emotional prompts work better** for product visualization
   - Successful prompt focused on: Dubai villa, luxury context, "Bang & Olufsen", "Architectural Digest"
   - Saved render: `website/images/ate-75-v3-lifestyle-render.png`
   - Design validated: Premium aesthetic achieved

---

### Session: 2025-12-24 (Continued) - Manufacturer Outreach
- Created engineering-analysis.html with full virtual test for ATE-75 (75" model)
- Added logistics/drop-ship strategy to project tracker
- Found 9 additional Middle East manufacturers (6 UAE, 3 Saudi)
- Sent RFQs to 14 manufacturers total (9 delivered, 5 bounced)
- **Issue:** 4 manufacturers received duplicate emails due to improper AppleScript handling
- Created EMAIL_PROCEDURES.md to prevent future email errors
- Updated project tracker with full email reconciliation

### Session: 2025-12-24 - IP66 Upgrade + Technical Drawings
- Upgraded weatherproofing: IP54 → IP66 (dust tight + powerful water jets)
- Added IP66 labyrinth intake grilles with internal baffles
- Added IP66 rain cowl for exhaust (40mm overhang)
- Upgraded gaskets to EPDM continuous channel seal
- Updated QC checklist with IEC 60529 water jet test
- Created 3 new SVG technical drawings in specification:
  - Figure 3: Rear panel layout (fans, electronics, cable entry, VESA)
  - Figure 4: Side cross-section with airflow path
  - Figure 5: Electronics block diagram
- Updated BOM: $461.98 (+$21 for IP66), FOB target $520-580
- Committed: 92eba9b

### Session: 2025-12-23 (Evening) - Manufacturing Docs Complete
- Added inter-page navigation to all 6 HTML documents
- Corrected thermal control: 30°C PWM start (was 35°C) to protect TVs
- Created market-research.html with US/Middle East competitor analysis
- Identified KDM Steel (Wuxi, China) as OEM manufacturer candidate
- Added TV Shield E-Series feature parity to specification:
  - Section 4.5: Hinged door with gas struts
  - Section 4.6: Cam locks + padlock hasps
  - Section 4.7: Compression draw latches
  - Section 4.8: Full-motion mount included
- Updated BOM with door hardware ($45.20) and mounting ($38.80)
- New totals: BOM $440.98, Unit $480.98, FOB target $500-550

### Session: 2025-12-23 (Initial)
- Project initialized
- GitHub repo created (private)
- Created DESIGN_SPECIFICATION.md - comprehensive manufacturing spec for China
  - 5 size variants (43" to 86")
  - 6063-T5 aluminum, IP55 weatherproofing
  - Thermal management with 80mm DC fans
  - Bill of materials (~$188-250/unit)
- Created website/index.html - professional single-page site
  - Gulf region focused (UAE/Saudi)
  - Dark theme with gold accents
  - Product lineup with AED pricing
  - WhatsApp integration
- Committed and pushed to GitHub

## Manufacturer Outreach Status (24 Dec 2025)
- **14 manufacturers contacted** (9 delivered, 5 bounced)
- **UAE:** Eurotech, EmirFab, Al Shurooq, Al Amazon, Rainbow
- **Saudi:** SMF, Flezco, Lucky, Prisma
- **Awaiting responses** - follow up after 3-5 business days

## Branding
- **Company name:** Apex Enclosures (generic - covers all product lines)
- **Email signature:** Always sign off as "Apex Enclosures" (not "Apex TV Enclosures")
- **Email replies:** Always use Reply All with email history

## Notes
- Target market: UAE and Saudi Arabia
- Retail price point: AED 7,000 (TV enclosures)
- Competitor reference: digiscreens.ae
- Manufacturer reference: apolloenc.com
- Photos saved in Obsidian vault: 03-Projects/Apex TV Enclosures/
- **Email procedures:** Always read `~/.claude/EMAIL_PROCEDURES.md` before sending

## Key Research Documents
- **Audio/Speakers:** See `website/audio-noise-video.html` - contains:
  - Fan noise analysis (24.6 dBA max, virtually silent)
  - Outdoor speaker recommendations: JBL Flip 7 (budget), Neptune Soundbar (recommended), Samsung Terrace (premium)
  - Bundle pricing options
  - Video marketing strategy
- **Competitor Analysis:** See `website/competitor-comparison.html` - includes Display Shield deep-dive
- **Business Development:** See `website/bd-plan.html` - free marketing channels, partner outreach templates

## Business Development Opportunities

### Future Product Expansion (Same Customer, Same Manufacturing)

| Product | Opportunity | Priority |
|---------|-------------|----------|
| **Outdoor AV Cabinet** | Weatherproof cabinet for streaming devices, receivers, gaming consoles. Natural upsell with TV enclosure. AED 2,000-3,500. | HIGH |
| **Pool Equipment Enclosure** | Architectural covers for pumps, filters, heaters. Every villa has ugly exposed equipment. AED 3,000-8,000. | HIGH |
| **Digital Signage Enclosure** | Same product, commercial focus - restaurants, malls, petrol stations. Already in capability. | MEDIUM |
| **Generator Enclosure** | Noise + weather protection. Ugly units visible in villas. | MEDIUM |
| **AC Unit Covers** | Every villa has ugly outdoor AC units. Low margin but high volume. | LOW |

### Bundle Opportunities

**Complete Outdoor Entertainment Package:**
- TV Enclosure (AED 7,000-10,500)
- AV Cabinet (AED 2,500)
- Speaker pair (AED 750-1,500)
- Installation (AED 500)
- **Package total: AED 12,000-15,000** (turns AED 7K sale into AED 15K)

### Adjacent Markets to Explore
- Outdoor kitchen/BBQ enclosures
- Misting/cooling systems (resale, not manufacturing)
- Premium outdoor speakers (resale/bundle)
- Motorized pergolas/shade structures (partnership opportunity)

### Competitor Financial Intelligence
| Company | Revenue | Employees | Notes |
|---------|---------|-----------|-------|
| **PEC (Display Shield)** | $59M (2025) | 4 | Proves enclosure-only model scales |
| **SunBrite TV** | $120M (2024) | - | 24% US market share, 14% EBIT margin |
| **Apollo Enclosures** | Est. $1-5M | 3 | Small player competing successfully |

**Market size:** $400-450M globally (2024), growing 9-11% CAGR. North America = 48-70%.

---

## Session: 2025-12-26 - Testing Plan + Al Shurooq Follow-up
- Created testing-plan.html with 14-day prototype validation protocol
- Added Testing Plan tab to all page navigation
- Al Shurooq responded: reviewing tech package, requested Trade License
- Replied: proceeding as individual for prototype, entity after validation
- Updated branding to "Apex Enclosures" for multi-product flexibility

## China Manufacturer Intelligence

### ❌ DO NOT APPROACH - Competitors (Design Theft Risk)
These companies make their own outdoor TV enclosures. They will NOT manufacture yours - they'll steal the design.

| Company | Why Avoid |
|---------|-----------|
| **DeerTV / Kinytech** | Make own enclosures, sell direct to consumers, rebrand = competitor |
| **Yebox** | Same company as DeerTV/Kinytech (same address: Liaobu, Dongguan) |
| **Apollo Enclosures** | US competitor - reference only, not a supplier |
| **Aqualite** | US competitor - reference only |
| **TV Shield** | US competitor - reference only |

### ✅ POTENTIAL OEM PARTNERS - Pure Fabricators
These are sheet metal/enclosure fabricators who make to YOUR design. They don't have competing products.

| Company | Location | Contact | Notes |
|---------|----------|---------|-------|
| **KDM Steel** ⭐ | Wuxi, Jiangsu | sales@kdmsteel.com, +86-13175970882, WhatsApp same | 10+ yrs, ISO 9001, makes custom enclosures to spec |
| **Hofengfab** | Shenzhen | vivian@hofengfab.com | Die-cast aluminum, IP66/67, exports to Middle East |
| **SKYT** | Hebei | Wendy@hbskyt.com, +86-15832266315 | Outdoor cabinets, telecom enclosures, OEM focus |
| **MaidaTech** | Shenzhen | maidatechenclosure.com | 9+ yrs, custom aluminum, OEM/ODM |
| **Hongfashunda** | Shenzhen | enclosure-box-mould.com | ISO 9001, 2pc MOQ, aluminum extrusion |
| **SZOMK** | Shenzhen | chinaenclosure.com | 1000+ molds, cutouts/laser, low MOQ |

### ⚠️ CAUTION - Turnkey Suppliers (May Work, May Compete)
These make enclosures AND displays. Could be partners OR competitors depending on relationship.

| Company | Location | Contact | Risk |
|---------|----------|---------|------|
| **EKAA** | Guangzhou | Enquiry@ekaa.net, +86-15899977792 | Has own factory, OEM welcome - but sells complete signage |

### Supplier Selection Strategy
1. **For prototype:** Approach KDM Steel first - they're pure fabricators
2. **For comparison:** Get quote from Hofengfab or SKYT
3. **Don't mention TV enclosure market** to pure fabricators - just say "outdoor electronics enclosure" to avoid them researching the margin opportunity
4. **Never share retail pricing** in RFQs - only share technical specs

## China Manufacturer Outreach Status (28 Dec 2025)

| Supplier | Contact | Date Sent | Status |
|----------|---------|-----------|--------|
| **KDM Steel** | sales@kdmsteel.com + WhatsApp | 28 Dec 2025 | RFQ sent + WhatsApp follow-up |

**Next steps:**
- Await KDM response (expect 24-48 hours given WhatsApp)
- If positive, request NDA before sharing full proprietary details
- Get comparison quote from Hofengfab or SKYT

### Manufacturing Contract Requirements
**IMPORTANT:** Include these terms in any production agreement:

1. **CAD/CAM Ownership:**
   - All production CAD files (SolidWorks, DXF, DWG) become Apex property
   - Manufacturer must provide complete file package with prototype delivery
   - Files must be in editable format, not locked/encrypted

2. **Production Documentation Required:**
   - Detailed assembly drawings with part numbers
   - Sheet metal flat patterns
   - BOM with supplier part numbers
   - QC inspection checklist
   - Test procedures for IP66 verification

3. **IP Protection:**
   - NDA signed before sharing full specs
   - Non-compete clause (cannot sell identical product to others)
   - Tooling ownership if Apex pays for molds/jigs

4. **Sample Email Clause for Production Order:**
   ```
   As part of this order, we require:
   - Complete CAD package (native format + DXF/DWG/STEP)
   - All production drawings become Apex Enclosures property
   - Full manufacturing documentation for future reference

   These files are part of the deliverable and must be
   provided before final payment is released.
   ```
