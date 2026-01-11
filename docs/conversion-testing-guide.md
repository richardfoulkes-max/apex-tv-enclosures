# Landing Page Conversion Testing Guide

How to validate conversion before (and after) you have real traffic.

---

## 1) Pre-Launch Tests (No Traffic Required)

Validate clarity + persuasion. Won't give you a conversion rate, but tells you if the page is *understandable, believable, and compelling*.

### A. Message Testing
Does the page make sense to the right people?

- Use panel-based "landing page message test" tools
- **Tool:** [Wynter](https://wynter.com/landing-page-testing) - focuses on what's confusing, what resonates, what's missing
- **Output:** "Top 5 confusions", "Top 5 motivators", "What would you do next?", "What do you think this costs?"

### B. 5-Second Test + First-Click Test
Can they find the CTA and explain the offer fast?

- Run on hero + above-the-fold AND full page
- **Metrics:** % who correctly answer:
  - "What is it?"
  - "Who is it for?"
  - "What do you do next?"

### C. Remote Usability Tests
Does the flow work?

- Unmoderated tests let people complete predefined tasks on their own (fast and scalable)
- **Tools:**
  - [UserTesting](https://www.usertesting.com/) - unmoderated tests
  - [Maze](https://maze.co/) - unmoderated + preference tests
  - [Lyssna](https://www.lyssna.com/) - preference tests (choosing between hero versions)

### D. Predictive Attention Heatmaps
Are you visually guiding attention to the right places?

- AI attention tools predict where eyes are likely to go
- Great for catching "CTA is visually dead" problems before launch
- **Tool:** [Attention Insight](https://attentioninsight.com/)
- Treat as *design hygiene check*, not truth

---

## 2) Smoke Tests (Small Paid Traffic)

Measure intent before you have real conversion volume. **Closest thing to "virtual conversion."**

### How It Works

1. Put landing page live
2. Run **targeted ads** (Meta / TikTok / Google) with tight audience + single clear promise
3. Track **micro-conversions:**
   - Click CTA
   - Add to cart
   - Start checkout
   - Email capture / waitlist

### What You Learn

- Whether people *want* it (CTR to CTA / ATC rate)
- Whether your **offer/price** is killing it (drop at pricing, cart, shipping)
- Whether the **message/creative** is mismatched to the page

### Ethical Note

If you can't fulfill orders yet, don't fake a purchase. Use:
- "Join waitlist"
- "Request invite"
- Genuine preorder with clear terms (like our $100 refundable deposit)

---

## 3) Post-Launch Behavior Analytics + A/B Testing

Once you have real visitors, move from "virtual" to "truth."

### A. Session Recordings + Heatmaps

- **[Microsoft Clarity](https://clarity.microsoft.com/)** - FREE session replays + heatmaps
- **[Hotjar](https://www.hotjar.com/)** - heatmaps, session replay, funnels, surveys

### B. On-Page Surveys

Ask leavers: "What stopped you buying today?"
- Give 5-7 fixed options + "Other"

### C. A/B Tests

- Run only when you have enough volume (otherwise you'll fool yourself with noise)
- Note: Google Optimize is gone (sunset Sept 30, 2023)

---

## Practical "Do This Next" Plan

Works for most D2C:

1. **Define the conversion event** (purchase vs lead vs add-to-cart)
2. Run **5-second + first-click tests** on two hero variants
3. Run **10 unmoderated usability sessions**
   - Task: "decide if you'd buy; explain why; find price; find returns; add to cart"
4. Launch a **smoke test** with $200-$500 spend
   - Track: CTA → ATC → Checkout-start
5. Install **Clarity or Hotjar** to watch rage-clicks, stalls, and drops
6. Only then pick **1-2 A/B tests** (usually):
   - Hero message
   - Offer/price framing
   - Proof block order
   - CTA design

---

## Tools Summary

| Purpose | Tool | Cost |
|---------|------|------|
| Message testing | Wynter | Paid |
| 5-second/first-click | UsabilityHub, Lyssna | Freemium |
| Usability testing | Maze, UserTesting | Paid |
| Attention heatmaps | Attention Insight | Paid |
| Session recordings | Microsoft Clarity | FREE |
| Heatmaps + surveys | Hotjar | Freemium |
| A/B testing | VWO, Optimizely | Paid |

---

## For Apex TV Enclosures

**Category:** Premium outdoor electronics (D2C)
**Price point:** $2,200
**Traffic source:** Meta (Facebook/Instagram)

### Recommended Test Sequence:

1. **5-second test** on hero - "What is this product?"
2. **First-click test** - "Where would you click to buy?"
3. **Smoke test** ($300 Meta spend) - track CTA clicks, WhatsApp clicks
4. **Install Clarity** - watch where people drop off
5. **Survey non-converters** - "What stopped you?"

### "Good" Micro-Metrics for $2,200 Product:

- Landing page → CTA click: 15-25%
- CTA click → WhatsApp/form: 20-40%
- Overall visitor → lead: 3-8%
- Lead → sale: 10-20% (high-consideration purchase)
