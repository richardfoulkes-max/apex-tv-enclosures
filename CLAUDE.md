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

## Current Design State (v3.0 Front-Breathing)

### Design Version History
| Version | Architecture | Status | Notes |
|---------|-------------|--------|-------|
| v1.0 | Rear exhaust, 95mm depth | ARCHIVED | Initial concept |
| v2.0 | Rear exhaust, 115mm depth | ARCHIVED | IP66 upgrade |
| **v3.0** | **Front-breathing, 120mm depth** | **CURRENT** | Universal mounting |

### Why v3.0 Front-Breathing? (Decision Rationale)
**Problem with v1.0/v2.0:** Rear-mounted fans blocked airflow when wall-mounted or recessed. Customer installations often place enclosures flush against walls, blocking the rear exhaust.

**v3.0 Solution:** Move all airflow to the FRONT face:
- Air enters through discrete slot in bottom bezel (1700×15mm)
- Flows UP through 25mm channel between glass and TV
- Exits through top bezel with 4×60mm slim fans (1700×20mm slot)
- Rear panel is completely sealed (just VESA mount + cable entry)

**Benefits:**
1. **Universal mounting** - works wall-mount, recessed, or flush
2. **Better thermal** - airflow directly across TV display surface
3. **Cleaner rear** - no visible fans, more premium appearance
4. **Condensation path** - vertical airflow aids moisture management

### v3.0 Key Specifications (ATE-75)
| Parameter | Value | Notes |
|-----------|-------|-------|
| External dimensions | 1760 × 1040 × 120mm | +5mm depth vs v2.0 |
| Bezel width | 35mm | Contains airflow slots (was 20mm) |
| Air channel | 25mm | Gap between glass and TV |
| Fans | 4× 60mm × 15mm slim | In top bezel (was 4×80mm rear) |
| Airflow | ~70 CFM + convection | Bottom bezel → top bezel |
| Glass | 6mm tempered + AR + anti-fog | Hydrophilic interior coating |
| IP rating | IP66 | Dust tight + water jets |

### Condensation Management (v3.0 specific)
**Risk:** The 25mm air gap separates glass from TV heat, increasing condensation risk in Dubai's humid mornings.

**Mitigations implemented:**
1. Anti-fog hydrophilic coating on glass interior (+$10)
2. ePTFE breather membrane for pressure equalization ($8)
3. Condensation drain slots (3×5mm at bottom of air channel)
4. Idle fan mode: 10% PWM for 30 min post-shutdown

### BOM Summary (v3.0)
- **BOM Total:** $612.38
- **Unit Cost:** $657.38 (with labor/overhead)
- **Target FOB:** $700-750
- **Retail:** AED 7,000 (~$1,900)

### File Structure
```
website/
├── designs.html          ← v3.0 ONLY (cross-sections, specs)
├── specification.html    ← v3.0 parameters
├── bom-detailed.html     ← v3.0 costs
├── engineering-analysis.html ← v3.0 thermal + condensation
├── control-logic.html    ← Includes idle fan mode
├── ai-image-prompts.html ← v3.0 render prompts
└── archive/
    └── designs-legacy.html ← v1.0/v2.0 archived here
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

### Session: 2025-12-29 - v3.0 Front-Breathing Design Complete
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
