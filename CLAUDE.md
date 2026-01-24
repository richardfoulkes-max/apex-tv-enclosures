# Apex Enclosures - Claude Code Context

## READ FIRST - Essential Context File
**BEFORE doing anything, read:** `.claude/essential-context.md`
- Contains: email templates, RFQ locations, partner contacts, key decisions
- Compact file (~150 lines) that survives context compaction
- Updated each session with critical operational info

---

## CONFIDENTIAL - Manufacturer Identity
**NEVER disclose the manufacturer name externally.**
- Use generic terms: "ISO-certified facility", "our manufacturing partner", "certified UAE facility"
- Applies to: landing pages, marketing, customer communications, partner discussions
- Internal docs (this file, CRM) may contain the name for operational purposes
- The manufacturer name has been removed from the public landing page

---

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
- **Product 1:** TV Enclosures (ATE Series) - 75" prototype in development, v5.3.0 IP55
- **Product 2:** Pool Equipment Enclosures (APE Series) - v1.0 engineering complete

## GitHub Repository
https://github.com/richardfoulkes-max/apex-tv-enclosures (private)

## Deployment Architecture
| Location | What's Deployed | Access |
|----------|-----------------|--------|
| **apex-tv-enclosures.vercel.app** | CRM, AI Queue, Orders, Sales tools only | Password protected (team) |
| **apex-preorder.netlify.app** | Customer pre-order landing page | Public |
| **Local only** | Product specs, BOMs, engineering, RFQs | Your Mac only |

Product/engineering pages excluded from Vercel via `.vercelignore` for IP protection.

## Project Location
`/Users/richardfoulkes/Library/CloudStorage/OneDrive-Personal/Documents/Projects/apex-tv-enclosures`

---

## Current Design State (v5.3.0 Integrated Bezel - CURRENT)

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
| v5.2.1 | v5.2 + engineering fixes | SUPERSEDED | ChatGPT: PASS FOR PROTOTYPE |
| v5.2.2 | IP55 upgrade + exhaust labyrinth | SUPERSEDED | Pool splash protection |
| **v5.3.0** | **Integrated bezel ventilation** | **CURRENT** | No deflector, clean aesthetic |

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
- **60mm top gap** for recess (rear exhaust required clearance)
- **45° exhaust deflector** - architectural shadow element design
- **4 latches + compression stops** on service door for IP54 seal

**v5.3.0 CURRENT Design (Integrated Bezel Ventilation):**
- All v5.2.1 features PLUS:
- **IP55 rated** - protected against low-pressure water jets (garden hose safe)
- **NO DEFLECTOR** - clean flush "picture frame" aesthetic
- **80mm top/bottom bezels** - wider bezels contain recessed ventilation slots
- **40mm side bezels** - standard frame profile
- **Recessed slots** - 30-40mm behind bezel face for IP55 protection
- **FRONT EXHAUST** - air exits forward into room, not into cavity
- **20mm recess top gap** - fitting tolerance only (not thermal requirement)
- **Gasketed filter drawer** for IP55 seal
- **Higher-durometer EPDM gaskets** throughout
- **165-195 CFM** (adequate for Gulf climate)

### v5.3.0 Key Specifications (ATE-75)
| Parameter | Value | Notes |
|-----------|-------|-------|
| External dimensions | 1760 × **1120** × **160mm** | Taller due to 80mm bezels |
| Top/bottom bezels | **80mm each** | Integrated recessed ventilation slots |
| Side bezels | **40mm each** | Standard frame profile |
| Ventilation | **12× 3mm slots** | A_eff ≥ 0.035 m², recessed 30-40mm, NO deflector |
| Rear plenum | **30mm + diffuser** | Perforated plate equalizes flow |
| Fans | **3× Delta AFB1412HH-A** | 165-195 CFM, 4.8 mmH₂O static |
| Glass | **6mm laminated (3+3)** | Continuous channel retention |
| Service door | 1650 × 80mm, **4 latches** | Higher-durometer EPDM |
| Filter | **MERV 8 standard** | Gasketed drawer (IP55) |
| VESA | Through-bolted, 6mm plate | 75kg @ 3× safety factor |
| **IP rating** | **IP55** | Jet resistant, hose-cleanable |
| **Recess cavity** | **1820 × 1160 × 215mm** | 20mm top gap (front exhaust) |

### Thermal Design (v5.3.0)
```
Air path: Bottom bezel slots → Filter → Diffuser plate →
          30mm rear plenum → TV back → 3× Delta fans → Top bezel slots out
```
- **Target:** 165-195 CFM at 55°C ambient + solar
- **Heat load:** 550W (300W TV + 250W solar gain)
- **Thermal rise:** <15K above ambient at worst case (55°C + full sun)
- **Margin:** ~50-80% wall-mount, 10-30% recess (adequate)
- **Design benefit:** Clean flush front - no protruding deflector

### BOM Summary (v5.3.0 - estimates)
- **BOM Cost:** ~$637 (materials only, includes IR extender + cleaning kit)
- **FOB Price:** ~$870 (BOM + labor + factory margin)
- **Retail:** AED 10,500 (~$2,860)
- **Note:** External wall mount NOT included - customer supplies based on wall type

### Acoustic Performance (v5.3.0)
| PWM | Slot Velocity | SPL @ 1m | Mode |
|-----|---------------|----------|------|
| 20% | 0.7 m/s | ≤30 dBA | Idle (near silent) |
| 40% | 1.4 m/s | ≤34 dBA | Quiet mode |
| 60% | 2.1 m/s | ≤38 dBA | Normal cooling |
| 100% | 3.4 m/s | ≤48 dBA | Emergency (audible) |

**Design intent:** Quiet most of the time (≤40% PWM), audible only in thermal emergencies.

### File Structure
```
website/                    ← Website (v5.3.0 IP55 - fully updated)
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

**Before drafting outreach emails:** ALWAYS read `docs/email-templates.md` first
- Contains standard templates for manufacturer RFQs, follow-ups, technical package sends
- Ensures consistent formatting across all regions
- Includes region-specific CC recipients and attachment requirements

**Before sending emails:** Read `/Users/richardfoulkes/.claude/EMAIL_PROCEDURES.md`

**IMPORTANT - Email Sender:** Always send from `apexenclosures@icloud.com` (NOT richardfoulkes@mac.com)
- When using AppleScript to open Mail, set the sender account explicitly
- CC Scott at `Scott@b-stemed.com` on all US manufacturer outreach
- CC Nick at `nick@platinumbrands.com.au` on all AU manufacturer outreach

**Before sending RFQ documents:** Always run pre-RFQ review checklist:
1. Remove all competitor references (Apollo, Aqualite, etc.)
2. Remove target pricing, FOB targets, margins, retail prices
3. Verify all size references match prototype (currently 75")
4. Check for placeholder text (XXX, TBD, TODO)
5. Verify document headers/footers match current model
6. Regenerate PDFs from cleaned HTML sources
7. Open folder for user to verify before sending

## Critical CSS Layout Rules

**IMPORTANT - nav.js handles sidebar margin:**
```
nav.js injects: body { margin-left: 240px !important; }
```

**DO NOT add `margin-left: 240px` to `.main-container`** - this creates double offset (480px gap)!

**Correct page structure:**
```html
<body>
    <div class="main-container">  <!-- NO margin-left here -->
        <div class="page-header">  <!-- margin: -2rem -2rem 2rem -2rem -->
            <h1>Title</h1>
        </div>
        <!-- content -->
    </div>
</body>
```

**Correct CSS:**
```css
.main-container { padding: 2rem; }  /* NO margin-left */
.page-header { margin: -2rem -2rem 2rem -2rem; }  /* Extends into padding */
```

---

## Recent Work History

### Session: 2026-01-11 (Latest) - Pre-Order Landing Page LIVE

**Landing Page Deployed:**
- User built page in Lovable with differentiation sections
- Connected Lovable to GitHub: `github.com/richardfoulkes-max/apex-outdoor-living`
- Cloned repo, installed deps (`npm install`), built (`npm run build`)
- **Final URL: https://apex-preorder.netlify.app** (Netlify, public)
- Source code saved in `website/preorder-lovable/`

**Microsoft Clarity Tracking Added:**
- Project ID: `uzuntxvj5r`
- Free heatmaps, session recordings, scroll depth, rage clicks
- Tracking code in `index.html`

**Manufacturer Name Removed from Public Pages:**
- Removed "Eurotech Metal Industries" from `EuropeanManufacturing.tsx`
- Now says "ISO-certified facility" (generic)
- Added CONFIDENTIAL section to CLAUDE.md and orchestrator.json
- **NEVER disclose manufacturer identity externally**

**Differentiation Added (via lovable-update-prompt.md):**
1. **Why Apex? Comparison Table** - airflow (200+ vs 80 CFM), noise (30 vs 45+ dBA), warranty (5 vs 1 year), colors (200+ vs black only)
2. **Whisper-Quiet Operation** - PWM intelligent control, sound level visualization
3. **Gulf Climate Engineering** - 55°C rating, 2000+ hour salt spray, 550W heat dissipation
4. **Premium Finish Options** - 200+ RAL colors (standard, +$75 premium, +$150 custom)
5. **European Manufacturing Standards** - ISO 9001, Schneider Electric supplier, AAMA 2604

**D2C Playbook Created (`/Projects/d2c-playbook/`):**
- Greg Isenberg's ACP Framework (Audience → Community → Product)
- 25 ad hooks across 10 categories
- Landing Page Blueprint based on Suns Lifestyle, Warby Parker, Allbirds, Away
- Dr. Conversion Atlas analysis with Cialdini's 7 principles

**Smoke Test:** On hold until prototype confirmed

**Files Created/Modified:**
- `docs/landing-page-prompt.md` - Initial AI builder prompt
- `docs/lovable-update-prompt.md` - Differentiation update for Lovable
- `docs/conversion-testing-guide.md` - Conversion testing methodology
- `website/preorder-lovable/` - Full React source from Lovable GitHub
- `website/preorder-lovable/src/components/EuropeanManufacturing.tsx` - Removed manufacturer name

---

### Session: 2026-01-11 - Auth Guard & Dashboard Update

**Added auth-guard to CRM (partner-crm.html):**
- Login now required - redirects to login.html if not authenticated
- Shows "Verifying access..." spinner while checking session
- Uses authenticated Supabase client for RLS filtering
- Users only see partners in their territory

**Separated Pool Storage on Dashboard (index.html):**
- 3-column product grid: TV Enclosures | Pool Equipment | Pool Storage
- Pool Storage has own amber color scheme with NEW badge
- Links to Market Analysis and Specification
- Bundle strategy callout: "Doubles order value"

**Made product cards fully clickable:**
- TV Enclosures → specification.html
- Pool Equipment → pool-specification.html
- Pool Storage → pool-storage-market.html
- Added arrow indicators to show clickability

**Deployed:** All changes live on Vercel (commits a464377, 06a8af7, c25c5ab)

---

### Session: 2026-01-11 (Late) - CRM Permissions & Nick Onboarding

**Implemented CRM territory-based access with Supabase RLS:**
- Created `user_territories` table
- Created `get_territory()` function mapping regions to territories
- Enabled RLS on: partners, partner_contacts, partner_activities
- Created territory-based policies for authenticated users
- Blocked anonymous access

**CRM Users with Territory Access:**
| User | Territory |
|------|-----------|
| richardfoulkes@mac.com | ALL (admin) |
| tom@apexenclosures.com | ME |
| scott@b-stemed.com | US |
| nick@platinumbrands.com.au | AU |

**Added Nick Dempsey to CRM:**
- Partner: Platinum Brands (Australia, Distributor)
- Contact: Nick Dempsey (Owner, Primary, Decision Maker)
- Email: nick@platinumbrands.com.au

**Created Australia Fab Selection doc:**
- `~/Downloads/Australia-Fab-Selection.html` - sent to Nick
- Lists 7 qualified AU manufacturers (Tier 1: Metaltex, AG Holding, Wilson & Gilkes, FORM2000)

**To add future CRM users:**
1. Create in Supabase Auth
2. Run: `INSERT INTO user_territories (user_id, territory) SELECT id, 'XX' FROM auth.users WHERE email = 'xxx'`

**Files Created:**
- `docs/Australia-Fab-Selection-Nick.md`
- `~/Downloads/Australia-Fab-Selection.html`

---

### Session: 2026-01-11 (Earlier) - Financial Planning & US Entity Structure

**Added China volume manufacturing option for Australia:**
- Standard orders: Australian local manufacturing (3-4 weeks)
- Volume orders (50+ units): China manufacturing (8-10 weeks)
- Volume pricing: 75" landed at $900 vs $1,200 AU, wholesale $1,400, 36% GP
- Updated Year 1 projections with mixed manufacturing: Aggressive = 500 units, $800K revenue, $325K GP

**Created Financial Planning Guide (`docs/Financial-Planning-Guide.md`):**
- US setup: $2,000-3,850 (Stripe Atlas + design patent)
- US annual: $3,500-6,600 (franchise tax, accounting, insurance)
- Australia setup: $0-2,000 (Nick has existing business)
- Australia annual: $650-2,000 (marketing contribution only)
- Combined minimal: $6,500-14,000
- Combined ready-to-sell: $31,000-54,000
- Break-even: 8-15 units/year

**Clarified US Entity Structure for UAE-based British citizens:**
- **S-Corp NOT available** - requires US citizens/residents only
- **C-Corp is the ONLY option** for non-US residents
- **No US-UAE tax treaty** - 30% dividend withholding (vs 15% with US-UK treaty)
- **Tax strategy:** Pay management fees (0% withholding, deductible) NOT dividends (30% withholding)
- **99% vs 100% ownership:** Makes no difference for C-Corps. Only matters for LLCs (single-member = disregarded, 2+ = partnership)

**Nick's AU business:** Handles all entity/compliance, we invoice wholesale from US C-Corp.

**Files Created:**
- `docs/Financial-Planning-Guide.md`

**Commits:** `19a0c7e`, `f4aa187`, `4942225`

---

### Session: 2026-01-11 (Continued) - Australia B2B Wholesale Pricing

**Nick Dempsey responded with wholesale market feedback:**
- Interested in opportunity, wants to explore wholesale too
- 40,000 small businesses in Australia = potential B2B market
- Notes that retailers need 40-45% GP - our original 50% margin doesn't work for wholesale

**Added dual pricing model (Australian manufacturing ONLY - NO China):**

| Size | Cost | B2C Retail | B2C GP | Wholesale | Retailer Sells | Our GP | Retailer GP |
|------|------|------------|--------|-----------|----------------|--------|-------------|
| 55" | $850 | $1,700 | $850 (50%) | $1,300 | $2,400 | $450 (35%) | $1,100 (46%) |
| 65" | $1,000 | $2,000 | $1,000 (50%) | $1,500 | $2,700 | $500 (33%) | $1,200 (44%) |
| 75" | $1,200 | $2,200 | $1,000 (45%) | $1,700 | $3,100 | $500 (29%) | $1,400 (45%) |
| 85" | $1,500 | $2,700 | $1,200 (44%) | $2,100 | $3,800 | $600 (29%) | $1,700 (45%) |

**Year 1 Projections Added:**
- Conservative: 100 units, $180K revenue, $75K GP (10 retailers × 5 units + 50 B2C)
- Moderate: 200 units, $360K revenue, $150K GP (20 retailers × 5 units + 100 B2C)
- Aggressive: 400 units, $720K revenue, $300K GP (40 retailers × 5 units + 200 B2C)

**Key insight:** B2B wholesale requires higher end retail ($3,100 vs $2,200 for 75") but still 59% cheaper than Englaon $7,500.

**Critical constraint:** User explicitly rejected China manufacturing suggestions - Australia uses local fabrication only.

**Files Modified:**
- `website/australia-partner-pack.html` - B2B pricing tables and Year 1 projections

**Commit:** `7b9e814` - Add B2B wholesale pricing and Year 1 projections to Australia partner pack

---

### Session: 2026-01-11 - Australia Partner Pack Rating Highlight

**Added prominent Englaon rating callout to australia-partner-pack.html:**
- Large red gradient box at top of Section 3 (Competitor Issues)
- Shows ★★☆☆☆ 2/5 stars from ProductReview.com.au
- Added "50% of reviews are 1-star" statistic
- Clarifies "These aren't cherry-picked complaints — this is their actual rating"

**Key methodology decision documented:**
- NEVER cherry-pick negative reviews without context
- Always include: overall star rating, total review count, % positive vs negative
- Sylvox removed (4.3/5 rating - unfair to use minority 15% complaints)
- Englaon kept (2/5 rating - legitimate pattern of issues)

**Files Modified:**
- `website/australia-partner-pack.html` - rating highlight added
- `~/Downloads/Apex-Australia-Partner-Pack.html` - static file for Nick

**Commit:** `8797b1b` - Add prominent Englaon 2/5 rating highlight to Australia partner pack

---

### Session: 2026-01-10 (Late) - APE-S Pool Storage Market Analysis

**Created pool-storage-market.html with comprehensive market opportunity:**
- **Global market:** $2.8B outdoor storage market
- **GCC addressable:** 180,000+ private pools
- **Competitor analysis:** Keter/Suncast (plastic, AED 400-1,500), Lifetime (mid-market), Teak (premium but high-maintenance), Custom built (expensive, slow)

**APE-S Product Line:**
- APE-S-S (Small): AED 2,500 - chemicals, test kits
- APE-S-M (Medium): AED 3,500 - chemicals + nets, floats
- APE-S-L (Large): AED 4,500 - full pool kit

**Bundle Strategy:**
- APE-P + APE-S-S: AED 5,500 (8% savings)
- APE-P + APE-S-M: AED 6,300 (10% savings)
- APE-P + APE-HC + APE-S-L: AED 11,000 (12% savings)
- **100% order value increase when bundled with APE-P**

**Revenue Projections:**
- Year 1: 150 units, AED 525K
- Year 2: 400 units, AED 1.4M
- Year 3: 750 units, AED 2.6M+ (70% bundle attach rate)

**Manufacturing Synergies:**
- Same material (5052-H32 aluminum), finish, hardware as APE-P
- No new tooling = higher margins (55-60% vs 45-50% for pumps)

**Files Created/Modified:**
- `website/pool-storage-market.html` (new)
- `website/nav.js` (added Market Analysis to poolStorage section)

**Commit:** `8f318d0` - Add APE-S pool storage market analysis

---

### Session: 2026-01-10 (PM) - US IP Protection + Australia Market Strategy

**US IP Protection Guide (docs/US-IP-Protection-Guide.md):**
- Comprehensive comparison: Design Patent vs Utility Patent vs Trade Dress
- **Design Patent:** $1,500-3,000, 15 years, protects ornamental appearance
- **Utility Patent:** $5,000-15,000, 20 years, protects functional innovations (likely not needed)
- **Trade Dress:** Indefinite, requires 5+ years secondary meaning
- **Recommended strategy:** File Design Patent for v5.3.0 integrated bezel design now, build Trade Dress over time

**Australia Market Strategy (website/australia-market.html):**
- Market size estimate: ~$40-60M AUD (5-6% of global)
- Key competitors analyzed:
  - Englaon (Melbourne-based): 55" @ $4,500, 65" @ $5,500
  - Sylvox: 55" @ $3,000-5,000
  - Kinytech/DeerTV: 75" @ $1,388 (cheap Chinese)
- **Apex positioning:** AUD $3,000 for 75" (between cheap Chinese and expensive outdoor TVs)
- Distribution model: Local partner with 40% margin, 5-10 unit initial inventory

**Tier 1 Australian Manufacturers Identified:**
1. Metaltex (Melbourne) - ISO 9001, 45+ years, Dulux/Interpon powder coating
2. AG Holding (Melbourne) - ISO 9001, 65+ years, in-house powder coating
3. Wilson & Gilkes (NSW) - 75 years, in-house powder coating
4. FORM2000 (Melbourne) - 30+ years OEM manufacturing

**Tier 2 Australian Manufacturers:**
- Westberg Sheetmetal (Melbourne)
- Aston Precision (Melbourne)
- Sheetmetal Improvements (Gold Coast, QLD)

**Files Created:**
- `docs/US-IP-Protection-Guide.md` (new)
- `website/australia-market.html` (new)
- `australia-manufacturer-email.txt` (new)

**Navigation Updated:**
- Added "Australia Market" to Manufacturing section in nav.js

**Commit:** `b925f2a` - Add US IP Protection guide and Australia market strategy

---

### Session: 2026-01-10 - CRM Improvements + Partnership Structures

**CRM UI Improvements:**
- Replaced all browser `confirm()` dialogs with styled modal popups
- Added toast notifications for all alerts (success/error/warning)
- File attachments: click filename to open in browser, Download button to save
- Fixed styled confirm modals for delete operations (contacts, partners, files)

**Signature Management:**
- Created `Richard Vault/08-Personal/Signatures/` folder
- Saved Richard's signature for document signing

**US Company Setup Research:**
- Researched Delaware C-Corp vs Wyoming LLC for non-US residents
- Recommended: Delaware C-Corp via Stripe Atlas ($500 setup)
- Documented all tax implications (21% corp tax, 30% dividend withholding)
- Created `docs/US-Company-Setup-Guide.md` with full setup checklist
- Scott partnership: 100% Richard ownership + options for 49% (3-year vest, repurchase right until Year 4)
- Added Company Repurchase Right: if Scott quits before Year 4, company can buy back vested shares at lower of FMV or strike price

**ME Partnership Structure (Tom Brooks):**
- Designed holding company structure: Apex Global Holdings (Richard 100%) + Apex ME LLC (50/50)
- IP stays in holding company, licensed to regional entities
- Created `docs/ME-Partnership-Structure-Tom.md` with full terms
- Updated `partnership-term-sheet.md` with:
  - Automatic buy-sell on death (both partners)
  - Life insurance funding for buybacks
  - FMV valuation formula (3x profit OR 1x revenue)
  - Shotgun clause for deadlocks
  - IP license terms (5% royalty)

**Heir Protection:**
- Added clauses so if Richard dies, heirs cannot block Tom or Scott from operating
- "Successor Passive Investor" clause for Scott (heirs get money, not control)
- Irrevocable IP license for Tom (heirs cannot revoke ME territory license)

**Personal IP Ownership (Cost Optimization):**
- Updated docs to use phased approach - saves ~$2,500-5,000 initial costs
- **Phase 1 (Now):** Richard owns IP personally (zero holding company cost)
- **Phase 2 (When revenue ~$50K+/year):** Transfer IP to Apex Global Holdings
- Updated corporate structure diagrams, Documents Needed, Next Steps in both docs

**Key Business Decisions:**
- IP protection via personal ownership (Phase 1) then holding company (Phase 2)
- Options (not shares) for partners = protection from death/divorce/departure
- Company Repurchase Right protects against "vest and bail"
- Wait on US company setup until prototype confirmed with Accurate Metal

**Files Created/Modified:**
- `docs/US-Company-Setup-Guide.md` (new)
- `docs/ME-Partnership-Structure-Tom.md` (new, updated for personal IP ownership)
- `partnership-term-sheet.md` (major update, phased IP ownership)
- `website/partner-crm.html` (UI improvements)

**Commits:**
- `fddfd3c` - Add partnership structures and US company setup guides
- `32c0f6e` - Add heir protection clauses
- `abfce5c` - Add Company Repurchase Right for Scott's options
- `c0d970c` - Update partnership docs: Personal IP ownership (Phase 1)

---

### Session: 2026-01-09 (Late Night) - CRM Migration to Supabase Cloud

**Migrated CRM from localStorage to Supabase cloud database:**
- CRM now fully cloud-based at: https://apex-tv-enclosures.vercel.app/partner-crm.html
- All 28 partners with contacts and activities migrated to Supabase
- Removed all localStorage code - pure Supabase storage
- Removed auth-guard.js (single-user CRM, no login needed)
- Added seeding function for empty database initialization

**Database changes in Supabase:**
- Dropped `partners_status_check` constraint (allows Proposal, Meeting, Won, Lost statuses)
- Dropped `partners_partner_type_check` constraint (allows various partner types)
- Tables: `partners`, `partner_contacts`, `partner_activities`

**Fixed bugs:**
- Null check for `partnerType` and `status` in renderList() - was crashing on cloud

**Architecture decision:**
- CRM data: Supabase cloud (accessible anywhere, shareable)
- Product development files: Local only (maintain IP control)

**Next feature (MVP planned):**
- AI CRM Assistant - natural language interface to update CRM
- Drop in files/messages, AI parses and updates contacts/activities
- Will use Claude API for parsing

**Supabase project:** https://supabase.com/dashboard/project/krhyzbmewvfkacoujimm

---

### Session: 2026-01-09 (PM) - US Manufacturer Outreach + CRM Improvements

**Created US manufacturer outreach package:**
- `us-manufacturer-email.txt` - Email template for US fabricator RFQs
- `website/us-rfq-overview.html` - 1-page RFQ overview (not full IP)
- `Apex-US-RFQ-Overview.pdf` - Generated PDF for email attachment

**Added 4 Tier 1 US manufacturers to CRM with full contacts:**
- Bull Metal Products (CT) - Steve Bull, sales@bullmetal.com
- Accurate Metal Fabricating (IL) - Daniel Cohen, sales@accuratemetalfab.com
- Bison ProFab (TX) - Joshua Henderson, jhenderson@bisonprofab.com
- DDB Unlimited (OK) - Dustin Mahorney, dustin@ddbunlimited.com

**Added Scott as strategic partner:**
- Email: Scott@b-stemed.com
- CC'd on all US manufacturer outreach

**CRM improvements:**
- Default filter now "Live Contacts" (excludes Not Contacted)
- Archived stale UAE/GCC manufacturers (no response since Dec 24)
- Bumped version to v13

**Email procedure documented:**
- Always send from `apexenclosures@icloud.com` (NOT richardfoulkes@mac.com)
- Added to CLAUDE.md Procedures Reference

**Emails drafted and opened in Mail:**
- DDB Unlimited (Dustin Mahorney)
- Bull Metal (Steve Bull)
- Accurate Metal (Daniel Cohen)
- Bison ProFab (Joshua Henderson)

**Commit:** `399c4d0` - Add US manufacturer outreach package + CRM updates

---

### Session: 2026-01-09 - US/EU Manufacturing Strategy + Market Analysis + Partnership Structure

**Created 5 standalone HTML documents for Scott (potential UK/US sales partner):**

**1. Apex-US-Manufacturing-Strategy.html** (updated)
- US manufacturing options due to 50% Section 232 tariff on UAE aluminum
- Tier 1: Bull Metal (Oklahoma), Metworks (Ohio), RPM Industries (Texas)
- Tier 2: Fabrication Pros (Arizona), MetalTech Solutions (North Carolina)
- Updated coating standard: AAMA 2605 → **AAMA 2604** (1000 hours salt spray - practical spec)
- Removed separate coating suppliers (fabricators handle in-house)
- RFQ template for US manufacturers

**2. Apex-EU-Manufacturing-Strategy.html** (new)
- UK manufacturers: Universal Fabrications (Coventry), Profab, C H Barnett
- EU manufacturers: Delvalle Box (Spain), Enclosure-Tech (Lithuania), Animus (Poland)
- Coating standard: **Qualicoat Class 2** (European equivalent to AAMA 2604)
- Three-source strategy: Eurotech→GCC, UK manufacturer→UK, EU manufacturer→EU27

**3. Apex-UK-EU-Market-Analysis.html** (new)
- Market size: ~$210M Europe (24% of global)
- Key competitors: Armagard (UK-made), ProofVision (UK outdoor TVs), Apollo (ships from UAE)
- Climate challenge: 4-6 month outdoor season, rain/frost protection vs heat protection
- **Verdict: "Proceed with Caution"** - worth exploring as secondary priority to Gulf

**4. Apex-US-Market-Analysis.html** (new)
- Market size: ~$613M North America (70% of global)
- Key competitor: TV Shield - US-made, 47,500 installations, $3,149 for 75"
- 50% tariff barrier requires US manufacturing
- Investment needed: $100K-200K for credible US presence
- **Verdict: "Not Now"** - long-term opportunity (2027+), focus on Gulf first

**5. Apex-Partnership-Structure.html** (new)
- Corporate structure: Apex Middle East + Apex West (US/UK/EU)
- **Equity split:**
  - Middle East: Richard 50% / Tom 50%
  - US/UK/EU: Richard 25% / Tom 25% / Scott 50%
- Partner roles and responsibilities documented
- Key terms: IP ownership, profit distribution, exit/transfer provisions
- Signature lines for agreement in principle

**Key technical decisions:**
- AAMA 2604 (1000hr salt spray) is practical spec vs 2605 (4000hr overkill)
- Qualicoat Class 2 is European equivalent standard
- Fabricators typically handle powder coating in-house

**User philosophy confirmed:** Motivated partners > optimized equity percentages at early stage

**All documents copied to ~/Downloads for sharing with Scott**

---

### Session: 2026-01-08 (PM) - APE-HC Product Line + Eurotech Factory Visit

**Visited Eurotech Metal Industries - confirmed as manufacturing partner:**
- Factory tour confirmed manufacturing quality exceeds Apex requirements by ~5x
- 2000+ hour salt spray test (industry standard is 500-1000 hours)
- ISO 9001/14001/45001 certified since 2005
- Reference clients: Schneider Electric, Camfil

**Created Eurotech Profile Page (`eurotech-profile.html`):**
- Full documentation of manufacturing capabilities
- Quality certifications and salt spray test results
- All color options: standard, premium (+AED 75), custom RAL (+AED 150)
- Added to navigation under Manufacturing > Eurotech (Partner)

**Split Pool Enclosures into Two Product Lines:**
- **APE-P (Pump Enclosure):** Sealed design, 70-80% noise reduction, acoustic foam
- **APE-HC (Heater/Chiller):** Louvered design, 50-60% noise reduction, airflow focus

**Created APE-HC Documentation:**
- `pool-chiller-specification.html` - 10-section spec for louvered heater/chiller enclosures
- `pool-chiller-designs.html` - 4 SVG technical drawings (side section, front view, top view, gas heater variant)
- `pool-chiller-bom.html` - Component costing for 4 models:
  - APE-HC-M (Medium): $185 BOM, AED 3,500-4,500 retail
  - APE-HC-L (Large): $225 BOM, AED 4,500-5,500 retail
  - APE-HC-G (Gas): $155 BOM, AED 3,000-4,000 retail
  - APE-HC-XL (Extra Large): $285 BOM, AED 6,000-7,500 retail

**Key Design Differences APE-P vs APE-HC:**
| Feature | APE-P (Pump) | APE-HC (Heater/Chiller) |
|---------|--------------|-------------------------|
| Panel design | Sealed + acoustic foam | Louvered for airflow |
| Noise reduction | 70-80% | 50-60% |
| IP rating | IP55 | IP44 |
| Ventilation | Passive convection | 50%+ open area (louvers) |

**Commits:** `421fe2b` - Add APE-HC (Heater/Chiller) product line and Eurotech profile

---

### Session: 2026-01-08 - ATE-75 Prototype Design Pack SENT TO EUROTECH

**Created comprehensive prototype design pack for Eurotech Metal Industries:**
- `website/ate-75-prototype-pack.html` - PDF-ready design pack
- `ATE-75-Design-Pack.pdf` (14MB) - Generated via Playwright, sent to Eurotech

**Design Pack Contents (11 sections):**
1. Cover page + 3 product renders (external, internal, exploded)
2. Executive Summary - key features, target environment
3. External Dimensions - all critical dimensions
4. Design Philosophy - integrated bezel, airflow, thermal, acoustic
5. Technical Drawings - 2 SVG drawings (side section, front view)
6. Mechanical Construction - materials, door system, TV mounting
7. Thermal System - Delta fans, slots, filter, PWM control
8. Electrical System + Wiring Diagram - full schematic with wire schedule
9. Sealing & IP55 - gaskets, design features
10. BOM - all components (NO pricing per manufacturer request)
11. Quality Standards & Prototype Validation Checklist

**Excluded per customer request:**
- Security locks (not needed for prototype)
- Retail accessories (IR extender, cleaning kit, spare filter, keys)

**PDF Generation Setup:**
- Installed Playwright + Chromium for high-fidelity PDF generation
- `generate-pdf.js` script - no file paths in footer, proper page breaks
- `node generate-pdf.js` → outputs `ATE-75-Design-Pack.pdf`

**Commits:** `cd6a4b6` - Add ATE-75 prototype design pack for Eurotech

**Status:** Design pack sent to Eurotech - awaiting prototype quote/timeline

---

### Session: 2026-01-05 (Early AM) - BOM Wall Mount Cleanup

**Removed external wall mount from BOM - customer supplies:**
- User asked: "do we need this? this is for external to the wall mount I think?"
- Correct - external wall mount depends on customer's wall type and preference

**Changes:**
- Removed from BOM: Articulating arm ($28-38), wall plate ($6-8), wall anchors ($4.80)
- Added to BOM: Internal TV mounting (vertical rails $12, brackets $8, rear VESA plate $10, hardware $4)
- BOM Total: $641.53 → $636.73
- FOB Price: ~$876 → ~$870

**What's included vs customer-supplied:**
- INCLUDED: Internal vertical rails + TV brackets (mounts TV inside enclosure)
- INCLUDED: Rear VESA plate (allows external wall mount attachment)
- CUSTOMER SUPPLIES: Wall mount arm, wall plate, anchors (based on wall type)

**Commit:** `5440a56` - Remove external wall mount from BOM - customer supplies

---

### Session: 2026-01-04 (Late Night) - Comprehensive v5.3.0 Documentation Audit

**Full audit of all engineering/manufacturing pages for consistency:**
User asked: "are you sure now that every single engineering and manu page are correct with this new design feature?"

**Files Fixed (11 total):**
- specification.html: SVG "Noctua Industrial" → "Delta AFB1412HH-A", BOM table 2→3 fans @ $54
- audio-noise-video.html: Noise meter "24.6 dBA MAX" → "≤34 dBA QUIET" + "≤48 dBA MAX"
- bom-75inch.html: Fan model, qty 4→3, pricing $112→$54, subtotal $167→$107
- competitor-comparison.html: Fan type "(Noctua/Sunon)" → "(Delta AFB1412HH-A)"
- compliance-guide.html: Component table "Noctua Fans" → "Delta AFB1412HH-A Fans"
- market-research.html: Sourcing suggestion updated to Delta
- eurotech-rfq.html, manufacturer-rfq.html: Fan + slot specs
- wiring-diagram.html, qc-checklist.html, ai-image-prompts.html: Model refs

**Preserved (Correct as-is):**
- engineering-analysis.html: Noctua in v3.0 FAILED section (historical documentation)
- bom-detailed.html: Noctua as grommet supplier (NA-SAV2 accessory)
- specification.html: Noctua as counter-example explaining WHY it won't work

**Commit:** `637d0e0` - Comprehensive audit: Delta AFB1412HH-A fans + 12× 3mm slots across all docs

---

### Session: 2026-01-04 (Night) - Complete Thermal/Acoustic Engineering Overhaul

**Fan Selection Reverted (ChatGPT Static Pressure Analysis):**
- Noctua NF-A14x25 G2 PWM (2.56 mmH₂O) → Delta AFB1412HH-A (4.8 mmH₂O)
- System pressure budget: 3.6-12.2 mmH₂O (MERV 8 + diffuser + plenum + slots)
- Noctua inadequate - would "fall off a cliff" with filter load
- BOM reduced $21 (Noctua $135 → Delta $114.40)

**Mandatory Noise Mitigation Spec Added (specification.html §6.3):**
- A. Vibration Isolation: Silicone grommets, Shore A 40-60, no metal-to-metal
- B. Slot Design: 12× 3mm slots, A_eff ≥ 0.035 m²
- C. Panel Resonance: ≥2.0mm aluminum, stiffening ribs where span >400mm
- D. PWM Control: 20% baseline → 40% quiet → 60% normal → 100% max
- E. Acoustic Acceptance: Binding dBA targets per PWM level
- Manufacturing notes: NO SUBSTITUTIONS, slot count/gap mandatory

**Slot Design Finalized (Option A - Premium Aesthetic):**
- 12× horizontal slots, 3mm gap each, 1600mm wide
- Gross area: 0.058 m² → A_eff ≥ 0.035 m² (after 0.6× losses)
- Velocity: ≤2 m/s at 60% PWM (quiet mode ceiling)
- dBA targets: ≤34 dBA @ 40% (quiet), ≤48 dBA @ 100% (max)

**Key Insight:** "Quiet = high-static fans + low PWM + vibration isolation + larger slots"

**Commits:** `398af66` (fan reversion), `1dd4bf6` (slot design)

---

### Session: 2026-01-05 (Midday) - Vertical Rail Mounting System Documentation

**Updated Internal TV Mounting System (specification.html):**
- Changed from flat VESA plate to vertical rail system based on Apollo reference images
- Section 4.8 now documents two completely separate mounting systems:
  - **A. Internal TV Mount:** Vertical rails (800mm, M6 holes every 25mm) + TV brackets → TV's VESA holes
  - **B. External Wall Mount:** Rear panel VESA plate for articulating wall bracket
- Added "Key Concept" callout box explaining the two independent systems
- Added "How it works" flow diagrams for each system
- Added new "TV Mounting Brackets" spec card (L-shaped brackets connect TV to rails)
- Updated SVG Figure 2 to show vertical rails with proper hole pattern

**Also updated design-detailed.html:**
- Changed mounting description to "Vertical rail system inside enclosure"

**Commits:** `3bafd70`, `fac9cbf`

---

### Session: 2026-01-05 (Morning) - Color Configurator + Mounting Best Practices

**Color Configurator (color-configurator.html):**
- Interactive live color preview using canvas-based pixel manipulation
- Detects frame pixels (dark + low saturation) and recolors only the frame
- Preserves glass reflections and background unchanged
- RAL color swatches: Standard (black, grey), Premium (+$75), Custom (+$150)
- Links to quote calculator with color pre-filled

**RAL Color Renders Generated:**
- `ate-75-v530-ral1015-ivory.png` - Light Ivory (warm sandstone beige)
- `ate-75-v530-ral7032-grey.png` - Pebble Grey (neutral stone)

**Apollo vs Apex Recess Comparison:**
- Compared Apollo "Recessing an enclosure rev 3.pdf" to our cavity-requirements
- Key finding: Apollo needs 30mm top gap (thermal critical), Apex v5.3.0 only needs 20mm (fitting tolerance)
- Apex advantage: Front exhaust means no hot air into cavity

**Mounting Best Practices Added (cavity-requirements.html):**
- New Section 4: Mounting Best Practices (Preventing Tilt)
- Articulating mount required for recess installations
- Mount bracket toward TOP of enclosure (reduces tilt over time)
- Use 10-12mm aluminum spacers (NOT nylon - will crush)
- Loosen bracket tension for fluid movement
- Power outlet placement: bottom half, max 60mm protrusion
- Pro tip: Check installation after 1 week for settling

**Commits:** `ec1534b`, `97dc726`, `7d9cc43`, `3ec2c69`

---

### Session: 2026-01-05 (Night) - Fixed Engineering Page Layout

**Root cause of white gap found and fixed:**
- nav.js injects `body { margin-left: 240px !important; }`
- Engineering pages also had `.main-container { margin-left: 240px; }`
- This created DOUBLE offset = 480px gap between sidebar and content
- Removed `margin-left` from all 11 Engineering pages
- Commit: `8ffeb45`

**Correct pattern documented above in "Critical CSS Layout Rules"**

---

### Session: 2026-01-05 (Late) - Engineering Header Standardization

**Standardized green gradient headers across all Engineering pages:**
- User noted inconsistent headers: some green, some white, varying thicknesses
- Updated 11 pages to use consistent teal gradient header pattern
- CSS: `.page-header { background: linear-gradient(135deg, #0d9488, #0f766e); }`
- Sidebar-aware: `.main-container { margin-left: 240px; padding: 2rem; }`
- Mobile responsive: page headers hidden on small screens

**Files updated:**
- design-detailed.html (template - user approved)
- designs.html, bom-detailed.html, ai-image-prompts.html
- specification.html, engineering-analysis.html
- control-logic.html, wiring-diagram.html, tv-compatibility.html
- audio-noise-video.html, cavity-requirements.html (already had style)

**Also removed redundant doc-nav sections** - now handled by nav.js sidebar

**Commit:** `9bd8b70` - Standardize green gradient headers across all Engineering pages

---

### Session: 2026-01-05 (Continued) - Cavity Requirements v5.3.0 Update

**Updated cavity-requirements.html for v5.3.0 front exhaust:**
- Top gap reduced from 60mm to 20mm (fitting tolerance only)
- Standoff frame now optional (no critical thermal clearance needed)
- Updated all model dimensions to v5.3.0 specs
- Changed "Common Mistake" warning to info box (flush top OK now)
- Updated warranty conditions to focus on front bezel vents
- Moved Cavity Requirements from Manufacturing to Engineering in nav

**Key insight:** v5.3.0 exhausts air FORWARD through front bezel, not into cavity. This eliminates the 60mm top gap requirement that rear-exhaust designs needed.

**Commits Pushed:**
- `169f3d7` Update cavity-requirements.html for v5.3.0 front exhaust
- `4e19a3a` Move Cavity Requirements to Engineering section

---

### Session: 2026-01-05 (AM) - Navigation Fix + Render Saves

**Fixed Broken Navigation:**
- Password protection in nav.js was preventing sidebar from displaying
- Removed password gate code, restored nav.js to working state
- Site now open (no password required) - sidebar works on all pages

**Saved v5.3.0 Gemini Renders:**
- `ate-75-v530-front.png` - External front 3/4 view
- `ate-75-v530-internal.png` - Internal view with fans, VESA, diffuser
- `ate-75-v530-exploded.png` - Exploded component breakdown with labels

**Updated design-detailed.html:**
- Replaced old SVG mockups with actual Gemini renders
- Updated specs to v5.3.0 (1760×1120×160mm, 80mm bezels, IP55)
- Clean gallery layout with key specs and feature lists

**Commits Pushed:**
- `e287730` Remove password protection from nav.js
- `cf0aaab` Add v5.3.0 Gemini renders
- `1d9655d` Update design-detailed.html with v5.3.0 renders

---

### Session: 2026-01-05 (Early AM) - v5.3.0 Documentation Complete

**Completed all v5.3.0 documentation updates:**

**SVG Technical Drawings (designs.html):**
- Updated all 4 SVG drawings to v5.3.0 integrated bezel design:
  - 3.1 Side Cross-Section - 80mm bezels, recessed slots, no deflector
  - 3.2 Top Bezel Detail - recessed exhaust cavity, airflow UP
  - 3.3 Bottom Bezel Detail - recessed intake slots, gasketed filter
  - 3.4 Front View - 1760×1120mm, 80/40mm bezels
- Updated Materials & Fabrication table → v5.3.0
- Updated Thermal Validation section (165-195 CFM, recessed slot airflow)
- Updated Size Variants section and ATE-75 dimensions (1040→1120mm)

**AI Image Prompts (ai-image-prompts.html):**
- Complete rewrite with all v5.3.0 prompts
- 4 technical views: External, Internal, Exploded, Rear - ALL VERIFIED
- 3 lifestyle prompts: Dubai Poolside, Hotel Pool Bar, Outdoor Kitchen
- 3 detail prompts: Bezel Close-up, Service Door, Front Orthographic

**Commits Pushed:**
- `ab4e3ad` v5.3.0 Integrated Bezel Design
- `2055818` Update designs.html SVGs and ai-image-prompts.html for v5.3.0

---

### Session: 2026-01-04 (Night) - v5.3.0 Integrated Bezel Design

**Major Design Update - Removed Deflector:**
- User requested removal of protruding exhaust deflector for cleaner aesthetic
- Implemented "Integrated Wide Top Bezel" solution:
  - **80mm top/bottom bezels** (was 40mm) with recessed ventilation slots
  - **40mm side bezels** unchanged
  - Slots recessed 30-40mm behind bezel face for IP55 protection
  - Clean flush "picture frame" appearance - no protruding elements
- Height increased: 1040mm → **1120mm** (to accommodate wider bezels)

**Files Updated to v5.3.0:**
- specification.html - New IP55 integrated bezel ventilation section
- eurotech-rfq.html - Updated dimensions, bezel specs, ventilation design
- designs.html - Parameters updated
- manufacturer-rfq.html - Bezel specs, thermal system references
- CLAUDE.md - Version history, key specs, thermal design section

**Generated:**
- Eurotech-RFQ-75inch-v5.3.0.pdf for Thursday meeting

**AI Image Generation (Gemini):**
- Created detailed prompts for v5.3.0 design renders
- Iterated on external front view (corrected vents, proportions)
- Iterated on internal view (corrected fan count: 4→3, proper sizes)
- Created exploded view prompt with component labels
- Rear view prompt created and verified

---

### Session: 2026-01-04 (Evening) - Clean RFQ + Customer Website Brief

**Clean Manufacturer RFQ Created:**
- Created eurotech-rfq.html - focused 3-page document for Eurotech meeting
- 75" prototype only, essential fabrication details
- Removed PWM controller code (we supply controller, they don't need code)
- Dimensions, materials (5052-H32), thermal system, service door, mounting
- Fixed BOM header: 55" → 75"

**Eurotech Email Sent:**
- Generated Eurotech-RFQ-75inch-v5.2.2.pdf from clean HTML
- Created email reply to Walid with PDF attached
- User sent email - meeting confirmed for Thursday

**Customer Website Design Brief (replit-design-brief.md):**
- Comprehensive 13-section brief for Replit to build customer-facing site
- Covers: company overview, target markets, product line, competitive positioning
- Pages needed: Homepage, Product, How It Works, Industries, FAQ, Contact
- Functionality: WhatsApp integration, quote forms, mobile-first
- Tone/messaging guidelines, visual direction, technical requirements
- Success metrics: understand in 5 sec, trust in 30 sec, act in 60 sec

**Fin AI Research:**
- Investigated fin.ai (Intercom's AI customer service agent)
- Pricing: $0.99 per resolved conversation
- Added as future add-on in design brief (not v1)
- Design note: keep bottom-right corner flexible for WhatsApp OR Fin chat

**Files Created:**
- website/eurotech-rfq.html (NEW - clean manufacturer RFQ)
- Eurotech-RFQ-75inch-v5.2.2.pdf (sent to Walid)
- replit-design-brief.md (NEW - customer website brief)

---

### Session: 2026-01-04 (Afternoon) - ChatGPT Feedback Review + Eurotech Meeting Prep

**ChatGPT review identified 4 major documentation gaps - all fixed:**

1. **IP Rating Caveat (specification.html):**
   - Changed from claim to "IP55 target (validation pending)"
   - Added ventilated design warning: avoid direct jets at intake/exhaust
   - Noise claims changed to "design targets" with disclaimer

2. **Installer Cavity Requirements (NEW: cavity-requirements.html):**
   - Created comprehensive installer guide for recess installations
   - Dimension tables for all models (ATE-55 through ATE-85)
   - 60mm minimum top gap requirement emphasized
   - Standoff frame concept with SVG diagram
   - Added to Manufacturing section in nav.js

3. **TV Liability Boundaries (warranty-policy.html):**
   - New Section 2 "TV & Equipment Liability"
   - Clear table: what Apex IS vs IS NOT responsible for
   - "What happens if TV overheats?" section with clear position
   - Risk acknowledgment clauses
   - Recommendations (TV insurance, compatible models)

4. **BOM Pricing Structure (bom-detailed.html):**
   - Fixed impossible FOB < BOM error
   - New structure: BOM $662 + Labor $75 + QC $25 + Overhead $20 = $782 factory cost
   - Factory margin ~15% → FOB ~$900
   - Volume pricing: $1,100-1,200 (prototype) → $750 (200+ units)

**Competitor Pricing Correction (MAJOR DISCOVERY):**
- Found actual DigiScreens/Apollo price list (Aug 2023)
- 75": AED 14,740 (not AED 7,000 as previously thought!)
- **Apex is 29% CHEAPER than competition**, not more expensive
- Updated: market-research.html, competitor-analysis.html, competitor-comparison.html

**Eurotech Meeting Prep:**
- Updated manufacturer-rfq.html: IP66 → IP55 throughout
- Regenerated all PDFs from updated HTML sources
- Combined into single: Apex-Technical-Package-v5.2.2.pdf (507KB)
  - Specification + BOM + Control Logic + Wiring
- Created email draft to Walid (walid.mohamed@eurotech-metal.com)

**Files Created/Modified:**
- website/cavity-requirements.html (NEW)
- website/specification.html (IP55 caveat, noise targets, glass justification)
- website/legal/warranty-policy.html (TV liability section)
- website/bom-detailed.html (pricing structure)
- website/manufacturer-rfq.html (IP55 update)
- website/market-research.html (DigiScreens pricing)
- website/competitor-analysis.html (DigiScreens pricing)
- website/competitor-comparison.html (pricing corrections)
- Apex-Technical-Package-v5.2.2.pdf (combined)

---

### Session: 2026-01-04 (Late Night) - Factory Orders System

**New Factory Orders page (factory-orders.html):**
- Complete PO management system for tracking orders to manufacturers
- PO creation with: line items, SKU dropdown, color selection, quantities, unit costs
- Supplier presets (Eurotech Metal UAE, KDM Steel China) or custom
- Status tracking: Draft → Sent → In Production → Shipped → Received
- Payment tracking: Unpaid → Deposit Paid → Paid
- Timeline of all status changes with dates/notes
- Printable PO document generation (Print / Save PDF)
- Copy-to-clipboard for emailing PO to factory
- Dashboard stats: Total POs, In Production, Pending Delivery, Total Spent

**Factory Orders ↔ Customer Orders linkage:**
- PO creation modal shows pending customer orders with checkboxes
- Select which customer orders the PO fulfills
- PO detail view shows linked orders as clickable chips
- Customer order cards in Orders Pipeline show PO badge
- Badge shows PO number and status (color-coded)
- Click badge to navigate to Factory Orders page
- Added "🏭 Factory Orders" quick action to Orders Pipeline

**Navigation:**
- Added factory-orders.html to Operations section in nav.js
- Added to protected pages list for password gate

**Commits:** d10da60, ad7c4b0

---

### Session: 2026-01-04 (Night) - Color Options, CRM Fields, BOM Accessories

**Frame color options (specification.html + quote-calculator.html):**
- Standard Colors (included): Matte Black RAL 9005, Stone Grey RAL 7032
- Premium Colors (+$75): Oyster White, Light Ivory, Silk Grey, Anthracite, Bronze
- Custom RAL (+$150, 2-week lead time)
- Quote calculator includes color selector with dynamic pricing

**CRM business fields (partner-crm.html):**
- Added Business tab with transaction fields:
  - Trade License, TRN (Tax Registration Number)
  - Payment Terms dropdown, Credit Limit
  - Contract Status, Contract Expiry date
  - Bank Details: Name, Account Name, IBAN, SWIFT
  - Billing Address

**BOM accessories (bom-detailed.html):**
- Section 6 "Included Accessories": IR Extender System ($15), Glass Cleaning Kit ($8), Quick Start Card ($0.50)
- Section 7 "Optional Accessories": Soundbar Bracket ($25/$75), Extended Warranty 3yr/5yr ($150/$300), Filter Pack ($8/$25), Anti-Glare Film ($35/$100)
- Updated BOM total: $638.63 → $662.13
- Updated FOB target: $540-600 → $580-650

**Commits:** d4b13d2, 5c9f899

---

### Session: 2026-01-04 (Evening) - Password Protection for Internal Pages

**Password gate implementation (nav.js):**
- Single password protects all Sales & Ops + Product Dev pages (32 pages total)
- Default password: `apex2025`
- Login persists for 30 days via localStorage
- Password can be customized - stored in `apexAdminPassword` localStorage key

**Security settings (setup.html):**
- Added Security card with Change Password form
- Validates current password, requires 6+ chars for new
- Logout button clears session and shows login gate
- Session status display (shows login date)

**Protected pages:**
- Sales & Ops: ai-dashboard, ai-queue, orders, ai-insights, project-tracker, partner-crm, partner-program, target-partners, contractors, b2b-targets, quote-calculator, bd-plan, go-to-market, setup, product-overview, meeting-eurotech
- Product Dev: product-dashboard, specification, design-detailed, designs, ai-image-prompts, bom-detailed, engineering-analysis, control-logic, wiring-diagram, tv-compatibility, audio-noise-video, testing-plan, qc-checklist, compliance-guide, manufacturer-rfq, china-suppliers, market-research, competitor-analysis, competitor-comparison, product-opportunities, financial-forecast, landed-cost-calculator, global-pricing, legal-risk, engineering-drawings, drawing-styles

**Commits:** 40af23d

---

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
