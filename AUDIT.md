# Apex TV Enclosures - Audit & Consistency Checklist

> **Purpose:** Single source of truth for all key facts. When changing any value, update this file AND all locations listed.
>
> **Last Updated:** 2025-12-31

---

## 1. RETAIL PRICING (Customer-Facing)

| Size | Price | Locations |
|------|-------|-----------|
| 55" | AED 7,000 excl. VAT | retail/index.html, retail/faq.html, industries/pool-areas.html |
| 65" | AED 8,500 excl. VAT | retail/index.html, retail/faq.html, industries/pool-areas.html |
| 75" | AED 10,500 excl. VAT | retail/index.html, retail/faq.html, industries/pool-areas.html, competitor-comparison.html |

### Pricing in Internal/Analysis Docs (may differ)
| Document | Notes |
|----------|-------|
| global-pricing.html | Multi-market analysis - different pricing structure |
| go-to-market.html | Volume/wholesale pricing tiers |
| designs.html | Manufacturing cost analysis |
| audio-noise-video.html | Bundle pricing (enclosure + speaker) |

---

## 2. TECHNICAL SPECIFICATIONS

| Spec | Value | Locations |
|------|-------|-----------|
| **IP Rating** | IP55 | retail/index.html, retail/faq.html, industries/*.html, specification.html, designs.html, engineering-drawings.html |
| **Temperature Rating** | 55°C ambient | retail/faq.html, industries/pool-areas.html, specification.html, designs.html |
| **Warranty** | 2 years | retail/index.html, retail/faq.html, legal/warranty-policy.html |
| **Glass** | 8mm laminated (4+4) | retail/faq.html, specification.html, designs.html |
| **Fans** | 3× Delta AFB1412HH-A | specification.html, designs.html, bom-detailed.html |
| **Airflow** | 180-210 CFM | specification.html, designs.html (reduced from 210-250 for IP55) |
| **Enclosure Depth** | 160mm | specification.html, designs.html |
| **Fan Noise** | 24.6 dBA max | retail/faq.html, audio-noise-video.html |

### IP Rating Inconsistencies to Watch
- Customer-facing pages: **IP55** (current standard)
- Some internal docs reference IP66 (older spec or aspirational)
- testing-plan.html mentions IP66 water test
- bom-75inch.html has IP66 component names

---

## 3. PRODUCT CLAIMS & FEATURES

| Claim | Current Status | Locations |
|-------|----------------|-----------|
| Satisfaction guarantee | **REMOVED** (user decision) | Was in retail/faq.html - now removed |
| Anti-reflective glass | Yes - 90% glare reduction | retail/index.html |
| VESA compatible | Yes - any standard TV | retail/faq.html |
| Remote works through glass | Yes - IR transparent | retail/faq.html |
| Internal power sockets | Yes - 4-socket strip | retail/faq.html, industries/pool-areas.html |

### Claims to AVOID (removed/modified)
| Claim | Reason | Action Taken |
|-------|--------|--------------|
| "Garden hose cleaning" | Too aggressive a promise | Changed to "rain and splashes" |
| "Unlike competitors..." | Sounds aggressive | Removed competitor comparisons from customer pages |
| 30-day satisfaction guarantee | Risk of returns | Removed entirely |

---

## 4. TV RECOMMENDATIONS

| Recommendation | Current Guidance | Locations |
|----------------|------------------|-----------|
| Recommended brands | Samsung QLED, LG QNED | retail/faq.html |
| Avoid | OLED TVs | retail/faq.html, industries/pool-areas.html |
| Reason for avoiding OLED | Not bright enough, burn-in risk, heat degrades organic compounds | retail/faq.html |

---

## 5. SPEAKER RECOMMENDATIONS

| Tier | Product | Price | Locations |
|------|---------|-------|-----------|
| Budget | JBL Flip 7 | ~AED 480 | retail/faq.html, industries/pool-areas.html, industries/restaurants-bars.html |
| Mid/Permanent | Polk Atrium 4 | ~AED 750/pair | retail/faq.html, industries/pool-areas.html, industries/restaurants-bars.html |
| Mid/Smart | SYLVOX Elf S2 | ~AED 750-1,000 | audio-noise-video.html |
| Premium | Sonos Move 2 | ~AED 1,650 | retail/faq.html, industries/pool-areas.html, industries/restaurants-bars.html |
| Ultra Premium | Samsung Terrace Soundbar | ~AED 4,500+ | audio-noise-video.html |

### Removed Speaker References
| Product | Reason |
|---------|--------|
| Neptune Outdoor Soundbar | US-only ($899/AED 3,300), not available in Gulf |

---

## 6. CONTACT INFORMATION

| Type | Value | Locations |
|------|-------|-----------|
| Phone | +971 50 559 8675 | All pages with contact info |
| Email | apexenclosures@icloud.com | All pages with contact info |
| WhatsApp | wa.me/971505598675 | All pages with CTA buttons |
| Location | Dubai, UAE | Footer of all pages |

---

## 7. COMPETITOR REFERENCES

### Customer-Facing Pages (keep minimal)
- Should NOT mention competitors negatively
- Should NOT have "unlike competitors" language
- Can mention category (e.g., "outdoor TVs cost AED 40,000+")

### Internal/Analysis Docs (detailed comparisons OK)
| Document | Competitors Covered |
|----------|---------------------|
| competitor-analysis.html | DigiScreens, Apollo, Samsung Terrace, SunBrite, Seura, Furrion, Neptune |
| competitor-comparison.html | Display Shield (deep dive), all product lines |
| market-research.html | Market overview, pricing comparisons |

---

## 8. PAGE INVENTORY

### Customer-Facing (Retail)
- [ ] retail/index.html - Main homepage
- [ ] retail/faq.html - FAQ page
- [ ] industries/hotels-resorts.html - Hospitality landing
- [ ] industries/restaurants-bars.html - F&B landing
- [ ] industries/pool-areas.html - Residential pool landing

### Customer-Facing (Commercial)
- [ ] commercial/index.html - B2B homepage
- [ ] partner/index.html - Partner program

### Internal/Reference Docs
- [ ] specification.html - Full manufacturing spec
- [ ] designs.html - Engineering drawings
- [ ] engineering-drawings.html - Installation diagrams
- [ ] bom-detailed.html - Bill of materials
- [ ] testing-plan.html - QC procedures
- [ ] audio-noise-video.html - Audio research & marketing
- [ ] competitor-analysis.html - Competitor deep dive
- [ ] competitor-comparison.html - Display Shield comparison
- [ ] global-pricing.html - Multi-market pricing
- [ ] go-to-market.html - Sales strategy

### Legal
- [ ] legal/warranty-policy.html
- [ ] legal/terms-conditions.html
- [ ] legal/nda-template.html
- [ ] legal/partner-agreement.html

---

## 9. AUDIT CHECKLIST

When making changes, use this checklist:

### Pricing Change
- [ ] Update retail/index.html
- [ ] Update retail/faq.html
- [ ] Update industries/pool-areas.html
- [ ] Update competitor-comparison.html (if 75" price)
- [ ] Update this AUDIT.md file

### Spec Change (IP rating, temp, etc.)
- [ ] Update all customer-facing pages
- [ ] Update specification.html
- [ ] Update designs.html
- [ ] Update this AUDIT.md file

### Contact Info Change
- [ ] Search for old value across all files
- [ ] Update all occurrences
- [ ] Update this AUDIT.md file

### New Page Added
- [ ] Add to Page Inventory above
- [ ] Ensure consistent pricing
- [ ] Ensure consistent specs
- [ ] Ensure consistent contact info
- [ ] Add to navigation (nav.js)

---

## 10. KNOWN INCONSISTENCIES (To Fix)

| Issue | Details | Priority |
|-------|---------|----------|
| IP55 vs IP66 in internal docs | Some internal docs still reference IP66 | Low (internal only) |
| global-pricing.html pricing | Has different pricing structure than retail | Low (analysis doc) |
| designs.html pricing table | Has 55"/65"/75"/86" with different AED prices | Medium (review needed) |

---

## 11. VERSION HISTORY

| Date | Changes |
|------|---------|
| 2025-12-31 | Initial audit file created |
| 2025-12-31 | Pricing updated: 65" → AED 8,500, 75" → AED 10,500 |
| 2025-12-31 | Removed: 30-day guarantee, garden hose claims, competitor comparisons |
| 2025-12-31 | Added: OLED warning, SYLVOX speaker recommendation |
| 2025-12-31 | Replaced Neptune soundbar (US-only) with SYLVOX |
