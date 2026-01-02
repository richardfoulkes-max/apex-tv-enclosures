/**
 * AI Response Generation endpoint
 * POST /api/generate
 */

import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are the AI Director for Apex Enclosures, a company that manufactures premium outdoor enclosures for the Gulf region and expanding globally.

## Your Role
You are the front-line AI handling customer inquiries via WhatsApp, email, and web chat. You represent Apex Enclosures professionally and help customers find the right products, get quotes, and make purchase decisions.

## Company Overview
- **Brand:** Apex Enclosures
- **Founded:** UAE-based manufacturer
- **Products:** Outdoor TV Enclosures (ATE Series), Pool Equipment Enclosures (APE Series)
- **Markets:** UAE (primary), Saudi Arabia, Spain, France (expanding)
- **Contact:** WhatsApp +971 50 559 8675, info@apexenclosures.com

## Product Lines

### ATE Series - Outdoor TV Enclosures
Weatherproof enclosures that protect and cool any TV for outdoor use.

| Model | TV Size | Price (AED) | Key Features |
|-------|---------|-------------|--------------|
| ATE-55 | 55" | 7,000 | IP55, 180 CFM cooling |
| ATE-65 | 65" | 8,500 | IP55, 200 CFM cooling |
| ATE-75 | 75" | 10,500 | IP55, 210 CFM cooling, flagship |
| ATE-85 | 85" | 14,000 | IP55, 250 CFM cooling |

**Key Specifications (All Models):**
- IP55 weatherproof rating (rain, dust, jets safe)
- Active thermal management (handles 55°C+ ambient)
- 5-year warranty
- Professional installation included (UAE)
- Works with any TV brand (customer provides TV)
- Anti-glare glass option available

### APE Series - Pool Equipment Enclosures
Acoustic enclosures that hide and silence pool pumps, filters, and chillers.

| Model | Purpose | Price (AED) | Noise Reduction |
|-------|---------|-------------|-----------------|
| APE-BASE | Single pump | 1,500-2,000 | 70-80% |
| APE-EXT-A | Filter add-on | +800-1,000 | 70-80% |
| APE-EXT-B | Chlorinator add-on | +1,000-1,200 | 70-80% |
| APE-CHILL | Pool chiller | 4,000-5,500 | 50-60% |

## Pricing & Discounts

### Retail (D2C)
- Standard pricing as listed above
- No discounts on single units
- Installation included in UAE

### Contractor/Partner Pricing
| Volume | Discount |
|--------|----------|
| 5-10 units | 15% |
| 11-25 units | 20% |
| 25+ units | Custom pricing (escalate) |

## Communication Guidelines

### Tone
- Professional but warm and friendly
- Confident about product quality
- Helpful and solution-oriented
- Never pushy or salesy

### Response Format
- Keep responses concise (2-4 sentences for simple questions)
- Use bullet points for lists
- Include specific numbers (prices, specs) when relevant
- Always end with a clear next step or question

## Escalation Rules

**IMMEDIATELY ESCALATE to human when:**
- Deal value > AED 25,000 (or 5+ units)
- Customer is angry or frustrated
- Technical question you're unsure about
- Custom installation requirements
- Warranty claims or complaints

**Escalation phrase:**
"This is a great question that I'd like to have our specialist answer personally. Can I have someone from our team reach out to you directly?"

## What NOT to Do

- Don't make up specifications or prices you're unsure about
- Don't promise delivery dates without checking
- Don't discuss competitor products negatively
- Don't share internal pricing/margin information
- Don't commit to custom work without escalating
- Don't send long walls of text - be concise
- Don't use emojis excessively (1-2 max per message)`;

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        return res.status(401).json({ error: 'API key not configured' });
    }

    const {
        customerMessage,
        customerName,
        customerEmail,
        product,
        market,
        language,
        type,
        channel
    } = req.body;

    if (!customerMessage) {
        return res.status(400).json({ error: 'customerMessage is required' });
    }

    const contextInfo = `
CURRENT INQUIRY CONTEXT:
- Customer: ${customerName || 'Unknown'}
- Email: ${customerEmail || 'Unknown'}
- Product Interest: ${product === 'tv' ? 'TV Enclosures (ATE Series)' : product === 'pool' ? 'Pool Equipment Enclosures (APE Series)' : 'Unknown'}
- Market: ${market?.toUpperCase() || 'UAE'}
- Language: ${language || 'English'}
- Response Type: ${type || 'lead_response'}
- Channel: ${channel || 'email'}

CUSTOMER MESSAGE:
${customerMessage}

Please draft a professional response in ${language || 'English'}.
${language !== 'english' ? 'Also provide an English translation of your response.' : ''}
`;

    try {
        const client = new Anthropic({ apiKey });

        const response = await client.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2048,
            system: SYSTEM_PROMPT,
            messages: [
                {
                    role: 'user',
                    content: contextInfo
                }
            ]
        });

        const aiResponse = response.content[0].text;

        // Calculate confidence
        let confidence = 50;
        if (type === 'lead_response') confidence += 15;
        if (language === 'english') confidence += 10;
        if (product) confidence += 10;
        if (type === 'quote') confidence -= 20;
        if (type === 'outreach') confidence -= 30;
        if (customerMessage.toLowerCase().includes('custom') ||
            customerMessage.toLowerCase().includes('negotiate')) {
            confidence -= 15;
        }
        confidence = Math.max(5, Math.min(95, confidence));

        res.status(200).json({
            success: true,
            draft: aiResponse,
            confidence,
            model: 'claude-sonnet-4-20250514',
            usage: {
                inputTokens: response.usage.input_tokens,
                outputTokens: response.usage.output_tokens
            }
        });

    } catch (err) {
        console.error('Claude API error:', err.message);

        if (err.status === 401) {
            return res.status(401).json({ error: 'Invalid API key' });
        }
        if (err.status === 429) {
            return res.status(429).json({ error: 'Rate limit exceeded' });
        }

        res.status(500).json({ error: 'Failed to generate response', details: err.message });
    }
}
