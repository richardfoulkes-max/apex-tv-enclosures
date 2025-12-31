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
- **Current product:** TV Enclosures (75" prototype in development)
- **Future product:** Pool Enclosures (pump/filter housings)

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
| Glass | **8mm laminated (4+4)** | Continuous channel retention |
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
├── designs.html
├── specification.html
├── bom-detailed.html
├── engineering-analysis.html
├── control-logic.html
└── archive/

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
   - 8mm laminated glass callout
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
   - **Glass:** 8mm laminated with continuous channel retention
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
