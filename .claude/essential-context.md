# Apex Enclosures - Essential Context (ALWAYS READ FIRST)

**Purpose:** Compact reference file to prevent knowledge loss during context compaction.

---

## Before You Do Anything

### Writing Emails
**ALWAYS read first:** `docs/email-templates.md`
- Contains: RFQ templates, follow-up templates, post-interest templates
- Region-specific variations (AU, US, ME)
- CC rules per region
- Sender: apexenclosures@icloud.com (NOT richardfoulkes@mac.com)

### Sending RFQs/Technical Docs
| Document | Location | Use For |
|----------|----------|---------|
| AU RFQ Overview | `~/Downloads/Apex-AU-RFQ-Overview.pdf` | Australian fabricator outreach |
| US RFQ | `website/ate-75-rfq.html` → PDF | US manufacturer outreach |
| ME/UAE RFQ | `website/Apex-TV-Enclosure-RFQ-75inch.pdf` | Middle East outreach |
| Design Pack (full) | `ATE-75-Design-Pack.pdf` | After initial interest confirmed |

### Partner Communications
| Partner | Territory | Email | CC Rule |
|---------|-----------|-------|---------|
| Nick Dempsey | AU | nick@platinumbrands.com.au | CC on all AU fab emails |
| Scott | US | scott@b-stemed.com | CC on all US fab emails |
| Tom Brooks | ME | tom@apexenclosures.com | ME partner |

---

## Current Product: ATE-75 v5.3.0

**Quick Specs:**
- Dimensions: 1760 × 1120 × 160mm
- Bezels: 80mm top/bottom, 40mm sides
- Fans: 3× Delta AFB1412HH-A (LOCKED - never suggest alternatives)
- IP Rating: IP55
- Price: AED 10,500 (~$2,860)
- Margin: 53-65% ($1,500-1,900 net)

**DO NOT:**
- Suggest Noctua fans (insufficient static pressure - documented failure)
- Quote old dimensions from earlier versions
- Forget the bezel is "integrated" (no separate deflector)

---

## Active Workstreams

### Australia Manufacturing
- **Status:** Emails sent 11 Jan, awaiting responses
- **Fabs Contacted:** Metaltex, AG Holding, Wilson & Gilkes, FORM2000
- **Follow-up due:** 16-18 Jan if no reply
- **Nick briefing:** `docs/Australia-Fab-Selection-Nick.md`

**AU Fab Contact Details (in CRM):**
| Company | Contact | Email |
|---------|---------|-------|
| Metaltex | Daniel Pieterson | daniel@metaltex.com.au |
| AG Holding | Trent Holding | trent@agholding.com.au |
| Wilson & Gilkes | Sales | sales@opiegroup.com.au |
| FORM2000 | Sales | sales@form2000.com.au |

### Middle East (UAE)
- **Manufacturer:** Eurotech Metal Industries (confirmed partner)
- **Status:** Design pack sent, awaiting prototype quote
- **Meeting:** Thursday at Eurotech factory

### US Market
- **Status:** Planning phase
- **Entity:** Delaware C-Corp via Stripe Atlas (when ready)

### DigiScreens Dispute
- **Status:** Awaiting refund payment
- **Files:** `DigiScreens Dispute/` folder

---

## Key Business Decisions (Don't Re-Discuss)

1. **Email System:** Google Workspace when ready (~$24/mo) - Richard sees all mailboxes
2. **CRM Messages Tab:** REMOVED - manual email logging doesn't work in practice
3. **Wall Mount:** NOT included in BOM - customer supplies external mount
4. **IP Ownership:** Richard personally (Phase 1), transfer to Apex Global Holdings at ~$50K revenue
5. **AU Manufacturing:** Local fabrication ONLY, no China imports

---

## Pricing by Market (75")

| Market | Retail | Wholesale | Mfg Cost | Our Margin |
|--------|--------|-----------|----------|------------|
| **UAE/ME** | AED 10,500 ($2,860) | - | ~$870 FOB | 53-65% |
| **Australia** | $2,200 AUD | $1,700 AUD | $1,200 AUD | 45% B2C / 29% B2B |
| **US** | TBD | TBD | TBD | Target 50%+ |

**Competitor Reference:**
- DigiScreens/Apollo (UAE): AED 14,740 - we're 29% cheaper
- Englaon (AU): $7,500 AUD - we're 71% cheaper at B2C, still 59% cheaper via retailers

---

## Competitors

| Competitor | Market | Price Point | Our Advantage |
|------------|--------|-------------|---------------|
| DigiScreens | UAE | AED 14,740 | 29% cheaper, IP55 vs IP54, proper thermal |
| Apollo Enclosures | UAE/US | AED 14,000+ | Better value, local support |
| Englaon | Australia | $7,500 AUD | 2/5 stars on ProductReview, warranty issues |
| Sylvox | US/Global | $2,500-4,000 | 4.3/5 - decent competitor, focus on quality differentiation |
| Kinytech/DeerTV | AU/Global | $800-1,500 | Cheap Chinese, no local support |

---

## PDF Generation

**To create design pack PDFs:**
```bash
cd /Users/richardfoulkes/Library/CloudStorage/OneDrive-Personal/Documents/Projects/apex-tv-enclosures
node generate-pdf.js
```
- Outputs: `ATE-75-Design-Pack.pdf`
- Requires: Playwright + Chromium (already installed)
- Source: `website/ate-75-prototype-pack.html`

---

## Common Errors to Avoid

1. **CRM partner_contacts:** Use `title` NOT `role`
2. **CRM partner_activities:** Use `timestamp` NOT `activity_date`
3. **CRM lead_source:** Must be one of: cold_outreach, linkedin, referral, website, trade_show, other
4. **nav.js margin:** Body gets 240px margin-left injected - don't add margin to .main-container
5. **Fan selection:** Delta AFB1412HH-A ONLY - Noctua failed thermal validation
6. **Email sender:** apexenclosures@icloud.com NOT richardfoulkes@mac.com

---

## File Quick Reference

| Need | File |
|------|------|
| Email templates | `docs/email-templates.md` |
| AU partner pack | `~/Downloads/Apex-Australia-Partner-Pack.html` |
| ME partnership structure | `docs/ME-Partnership-Structure-Tom.md` |
| US company setup | `docs/US-Company-Setup-Guide.md` |
| Financial planning | `docs/Financial-Planning-Guide.md` |
| Full session history | `CLAUDE.md` (large file - read sections as needed) |
| Session state | `.claude/orchestrator.json` |

---

## CRM Database

**Supabase Tables:**
- `partners` - Company records
- `partner_contacts` - Individual contacts (use `title` not `role`)
- `partner_activities` - Activity log (use `timestamp` not `activity_date`)

**Valid lead_source values:** cold_outreach, linkedin, referral, website, trade_show, other

**Territory RLS:** Implemented - users only see their territory's data

---

---

## Pool Storage Project (APE-S Series)

**Status:** Planning complete - ready for Replit build

**Positioning:** Premium STORAGE, NOT furniture. No cushions, no fabric. Clean architectural aluminum boxes.

**Products (6):**
| Model | Name | Default Size | Base Price |
|-------|------|--------------|------------|
| APE-S-MC | Medium Cube | 500×500×500mm | AED 1,500 |
| APE-S-SC | Small Cabinet | 600×500×600mm | AED 2,000 |
| APE-S-LC | Large Chest | 1200×600×600mm | AED 3,500 |
| APE-S-TC | Tall Cabinet | 600×500×1400mm | AED 4,000 |
| APE-S-SB | Storage Bench | 1500×450×450mm | AED 3,000 |
| APE-S-TS | Towel Station | 800×400×1400mm | AED 3,500 |

**Sizing:** Fully custom within min/max boundaries + any RAL color

**Key Documents:**
- Replit brief: `docs/replit-pool-storage-brief.md`
- Gemini prompts: `docs/gemini-render-prompts.md`
- Existing renders: `website/images/concepts/ape-s-storage-*.jpg`

---

*Last updated: 2026-01-11 - Added pool storage project, pricing, competitors, PDF generation, common errors*
