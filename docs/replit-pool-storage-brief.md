# Apex Pool Storage - Website Build Brief for Replit

## Project Overview

Build a premium e-commerce website for **Apex Pool Storage** - luxury outdoor aluminum storage units for poolside and garden. The brand targets high-end villa owners in UAE/Gulf region.

**Live inspiration:** https://apex-tv-enclosures.vercel.app (our TV enclosure site - similar premium aesthetic)

---

## Brand Identity

- **Name:** Apex Pool Storage
- **Tagline:** "Premium Poolside Storage, Made to Measure"
- **Aesthetic:** Minimalist, premium, architectural aluminum - NOT outdoor furniture

**IMPORTANT POSITIONING:** We sell high-end STORAGE, not furniture. Our products are clean architectural aluminum boxes - weatherproof, lockable, hose-cleanable. The Storage Bench is a storage unit you CAN sit on, not a sofa with storage. No cushions, no fabric, no "furniture" styling. Think Apple product design meets marine-grade equipment.
- **Colors:**
  - Primary: Teal/Cyan (#0891b2)
  - Accent: Amber/Gold (#f59e0b)
  - Background: Light slate (#f8fafc)
- **Typography:** Clean sans-serif (Inter, SF Pro, or similar)

---

## Product Range (6 Products)

### 1. Medium Cube (APE-S-MC)
- **Description:** Compact top-opening cube. Side table that doubles as storage.
- **Use case:** Pool toys, goggles, sunscreen
- **Size range:** 350-600mm (W) × 350-600mm (D) × 350-600mm (H)
- **Default:** 500 × 500 × 500mm
- **Base price:** AED 1,500

### 2. Small Cabinet (APE-S-SC)
- **Description:** Double-door front access cabinet. Lockable.
- **Use case:** Pool chemicals, valuables, first aid
- **Size range:** 400-800mm (W) × 350-600mm (D) × 400-800mm (H)
- **Default:** 600 × 500 × 600mm
- **Base price:** AED 2,000

### 3. Large Chest (APE-S-LC)
- **Description:** Horizontal blanket-box style. Gas-strut assisted lid.
- **Use case:** Cushions, towels, pool floats
- **Size range:** 800-1800mm (W) × 400-800mm (D) × 400-700mm (H)
- **Default:** 1200 × 600 × 600mm
- **Base price:** AED 3,500

### 4. Tall Cabinet (APE-S-TC)
- **Description:** Upright wardrobe-style with internal shelving.
- **Use case:** Pool noodles, cleaning equipment, vertical items
- **Size range:** 400-800mm (W) × 400-600mm (D) × 1000-2000mm (H)
- **Default:** 600 × 500 × 1400mm
- **Base price:** AED 4,000

### 5. Storage Bench (APE-S-SB)
- **Description:** Long-format storage unit with reinforced lid. Rated for seating.
- **Use case:** Cushion/towel storage, doubles as poolside seating (no cushion needed)
- **Size range:** 900-2400mm (W) × 350-550mm (D) × 400-500mm (H)
- **Default:** 1500 × 450 × 450mm
- **Base price:** AED 3,000

### 6. Towel Station (APE-S-TS)
- **Description:** Towel bars above, enclosed storage below.
- **Use case:** Hang wet towels, store fresh towels
- **Size range:** 500-1200mm (W) × 300-500mm (D) × 1000-1800mm (H)
- **Default:** 800 × 400 × 1400mm
- **Base price:** AED 3,500

---

## Key Features

### 1. Product Configurator (CORE FEATURE)

Each product page needs an interactive configurator:

```
┌─────────────────────────────────────────────────────────┐
│  [Product Image/Render]                                 │
│                                                         │
│  DIMENSIONS                                             │
│  Width:  [====●========] 1200mm  (800-1800)            │
│  Depth:  [======●======]  600mm  (400-800)             │
│  Height: [======●======]  600mm  (400-700)             │
│                                                         │
│  COLOR                                                  │
│  ○ Champagne Sand    ○ Lunar Silver                    │
│  ○ Graphite          ○ Cloud White                     │
│  ○ Custom RAL: [________]                              │
│                                                         │
│  OPTIONS                                                │
│  ☐ Interior LED lighting (+AED 150)                    │
│  ☐ Key lock (+AED 100)                                 │
│  ☐ Extra shelf (+AED 75)                               │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│  PRICE: AED 4,250                                       │
│  Lead time: 3-4 weeks                                   │
│                                                         │
│  [Request Quote]  [Add to Enquiry]                      │
└─────────────────────────────────────────────────────────┘
```

**Pricing Logic:**
- Base price is for default size
- Price scales with surface area: `price = base_price × (actual_surface_area / default_surface_area)`
- Custom RAL adds +AED 150
- Options add fixed amounts

### 2. Homepage

- Hero section with lifestyle render (poolside scene)
- "Made to Measure" value proposition
- Product grid (6 products with hover effects)
- Why Apex section (weatherproof, premium materials, custom sizes)
- Instagram-style gallery
- Contact/quote CTA

### 3. Product Listing Page

- Filter by type (Chest, Cabinet, Bench, Station)
- Sort by price
- Grid view with product cards showing:
  - Product image
  - Name
  - Starting price "From AED X,XXX"
  - "Configure" button

### 4. Individual Product Pages

- Large product images/renders (multiple angles)
- Product description
- **Configurator** (see above)
- Specifications table
- Related products

### 5. Quote/Enquiry System

- Shopping cart style "Enquiry List"
- Customer adds configured products
- Checkout = Submit enquiry form
- Captures: Name, Email, Phone, WhatsApp, Location, Notes
- Sends email notification to team
- Stores in database for CRM

### 6. About/Brand Story Page

- Premium manufacturing story
- Materials & quality (marine-grade aluminum, AAMA 2604 powder coat)
- Made in UAE
- Warranty information

### 7. Contact Page

- Contact form
- WhatsApp link
- Location (UAE)
- Business hours

---

## Design Direction

### Visual Style
- Clean, spacious layouts with lots of white space
- Large product photography as hero elements
- Subtle shadows and depth
- Rounded corners (12-16px radius)
- Smooth animations on interactions

### Product Images
We will provide:
- Hero lifestyle renders (poolside scenes)
- Studio product shots (white/grey background)
- Detail shots showing construction quality

### Color Swatches
Display actual powder coat colors:
- Champagne Sand (warm beige - RAL 1015 approximate)
- Lunar Silver (cool grey - RAL 7035 approximate)
- Graphite (dark grey - RAL 7016 approximate)
- Cloud White (off-white - RAL 9003 approximate)

---

## Technical Requirements

### Stack Preferences
- **Frontend:** React/Next.js or Vue/Nuxt (whatever Replit recommends)
- **Styling:** Tailwind CSS
- **Backend:** Node.js or serverless functions
- **Database:** Supabase (we already use this)
- **Deployment:** Vercel or Replit hosting

### Database Schema (Supabase)

```sql
-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY,
    model_code TEXT UNIQUE,  -- e.g., 'APE-S-LC'
    name TEXT,
    description TEXT,
    category TEXT,  -- 'chest', 'cabinet', 'bench', 'station'
    base_price DECIMAL,
    min_width INT,
    max_width INT,
    default_width INT,
    min_depth INT,
    max_depth INT,
    default_depth INT,
    min_height INT,
    max_height INT,
    default_height INT,
    images JSONB,  -- array of image URLs
    created_at TIMESTAMP
);

-- Options table
CREATE TABLE product_options (
    id UUID PRIMARY KEY,
    name TEXT,
    price DECIMAL,
    applies_to TEXT[]  -- which product codes
);

-- Enquiries table
CREATE TABLE enquiries (
    id UUID PRIMARY KEY,
    customer_name TEXT,
    email TEXT,
    phone TEXT,
    whatsapp TEXT,
    location TEXT,
    notes TEXT,
    items JSONB,  -- configured products
    total_estimate DECIMAL,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP
);
```

### Integrations
- **Email:** SendGrid or Resend for enquiry notifications
- **WhatsApp:** Click-to-chat link (no API needed initially)
- **Analytics:** Google Analytics 4

---

## User Flows

### Primary Flow: Configure & Enquire
1. Land on homepage → See hero + products
2. Click product → Product page with configurator
3. Adjust size sliders, select color, add options
4. Click "Add to Enquiry" → Item added to enquiry list
5. Repeat for other products (optional)
6. Click "Submit Enquiry" → Form with contact details
7. Receive confirmation → Team notified

### Secondary Flow: Quick Contact
1. Any page → Click WhatsApp button (floating)
2. Opens WhatsApp with pre-filled message

---

## Content We Will Provide

- [ ] Product images/renders (all 6 products, multiple angles)
- [ ] Lifestyle photography (poolside scenes)
- [ ] Logo files
- [ ] Product descriptions (detailed copy)
- [ ] FAQs
- [ ] Terms & conditions

---

## Launch Priorities

**Phase 1 (MVP):**
- Homepage
- Product listing
- Product pages with configurator
- Enquiry submission (email notification)
- Contact page
- Mobile responsive

**Phase 2:**
- Customer accounts
- Order tracking
- CRM integration (Supabase dashboard)
- Blog/inspiration gallery

---

## Success Metrics

- Enquiry submissions per week
- Configurator engagement (time spent, configurations saved)
- Conversion rate (visitors → enquiries)
- Average order value

---

## Timeline

Looking for MVP in 2-3 weeks.

---

## Contact

**Richard Foulkes**
Email: apexenclosures@icloud.com
WhatsApp: +971 50 559 8675

---

*Brief created: January 2026*
