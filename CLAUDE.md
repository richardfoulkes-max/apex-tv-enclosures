# Apex TV Enclosures

## What This Is

Hardware product company selling IP55-rated outdoor TV enclosures (ATE-75) for the Gulf market (UAE, Saudi Arabia). Pre-order stage, targeting Q2 2026 first batch of 50 units.

**Product:** ATE-75 — fits 70-77" TVs, active cooling (3 fans), 5-year warranty, AED 8,100 pre-order price.

**Domain:** apextvenclosures.com (deployed on Vercel, auto-deploys from `main`)

## Project Structure

```
website/
├── preorder-lovable/         # Landing page (React 18, TypeScript, Vite, Tailwind, shadcn/ui)
│   ├── src/pages/Index.tsx   # Single-page layout (15 lazy-loaded sections)
│   ├── src/components/       # HeroSection, PricingSection, FAQSection, etc.
│   ├── src/lib/constants.ts  # WhatsApp link + GA4 conversion tracking
│   └── index.html            # SEO meta, JSON-LD, gtag.js, Clarity analytics
├── api/                      # Vercel serverless functions
│   ├── orders.js             # Order CRUD + Zapier webhooks
│   ├── enquiries.js          # Enquiry handling (OpenAI embeddings + Claude)
│   ├── ai-crm.js             # Natural language CRM (Claude)
│   └── follow-ups.js         # Follow-up task management
├── commercial/               # B2B portal pages
├── retail/                   # Retail portal pages
└── partner/                  # Partner portal pages

docs/                         # GTM strategy, technical specs, market research
marketing/                    # Campaign plans, keyword research
database/                     # Supabase schema + migrations
cad/                          # Product CAD files
bom/                          # Bill of materials
manufacturer-rfq/             # Supplier RFQs
```

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite (dev port 8080) + Tailwind + shadcn/ui
- **Backend:** Vercel Serverless Functions (Node.js)
- **Database:** Supabase (PostgreSQL)
- **AI:** Anthropic Claude (sonnet-4) + OpenAI (embeddings)
- **Analytics:** Microsoft Clarity + GA4 (placeholder ID — needs setup)
- **Deployment:** Vercel auto-deploy from GitHub `main` branch
- **Repo:** github.com/richardfoulkes-max/apex-tv-enclosures

## Key Commands

```bash
# Dev server
cd website/preorder-lovable && npm run dev    # localhost:8080

# Build
cd website/preorder-lovable && npm run build  # outputs to dist/

# Deploy (auto on push to main)
git push origin main
```

## Known TODOs

- `src/lib/constants.ts` — WhatsApp number is placeholder `971XXXXXXXXX`
- `index.html` — GA4 ID is placeholder `G-XXXXXXXXXX`
- `index.html` — OG image points to `apextvenclosures.com/og-image.jpg` (needs actual file in `public/`)
- No payment gateway yet — pre-orders via WhatsApp only
- No UAE trade license yet (required before accepting payments)

## Market Context

- **UAE:** ~420 searches/month for "outdoor tv" (340 English, 80 Arabic)
- **Saudi:** ~630 searches/month (300 English, 330 Arabic)
- **Gulf combined:** 1,050/month = 12,600/year
- **Target:** 1-2K units/year in UAE
- **Key Arabic terms:** تلفزيون خارجي (outdoor tv), غطاء تلفزيون خارجي (outdoor tv cover)
- **Google Ads plan ready:** AED 100-150/day, 6 ad groups, English + Arabic campaigns

## Development Rules

- Do what has been asked; nothing more, nothing less
- Prefer editing existing files over creating new ones
- Never save working files to the root folder
- Never create documentation files unless explicitly requested
- All WhatsApp CTAs must use `openWhatsApp()` from `src/lib/constants.ts` (fires GA4 event)

## Claude Flow V3

Installed at `.claude-flow/`. Config: hierarchical-mesh topology, 15 max agents, hybrid memory with HNSW.

```bash
# Quick reference (full docs in .claude-flow/CAPABILITIES.md)
npx @claude-flow/cli@latest daemon start          # Start background workers
npx @claude-flow/cli@latest doctor --fix           # Health check
npx @claude-flow/cli@latest memory search --query "keyword"  # Search memory
npx @claude-flow/cli@latest memory store --key "k" --value "v" --namespace patterns
npx @claude-flow/cli@latest swarm init --topology hierarchical --max-agents 8 --strategy specialized
```

For complex multi-file tasks, use Claude Code's Task tool to spawn parallel agents. CLI coordinates, Task tool executes.
