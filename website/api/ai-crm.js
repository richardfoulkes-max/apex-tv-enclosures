/**
 * AI CRM Assistant endpoint
 * POST /api/ai-crm
 *
 * Parses natural language CRM commands and returns structured actions
 */

import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are a CRM assistant for Apex Enclosures. Your job is to parse natural language commands about CRM operations and return structured JSON actions.

## Available Actions

1. **add_contact** - Add a contact to an existing partner
   - Required: partnerId, partnerName, contact.name
   - Optional: contact.email, contact.phone, contact.role

2. **add_activity** - Log an activity for a partner
   - Required: partnerId, partnerName, activity.type, activity.notes
   - activity.type must be one of: Note, Call, Email Sent, Email Received, Meeting, Demo, Quote Sent, Site Visit

3. **update_status** - Change a partner's status
   - Required: partnerId, partnerName, status
   - status must be one of: Lead, Contacted, Meeting, Proposal, Won, Lost, Not Contacted

4. **add_note** - Add a note to a partner (shorthand for add_activity with type "Note")
   - Required: partnerId, partnerName, note

5. **create_partner** - Create a new partner/company
   - Required: partner.name
   - Optional: partner.status, partner.contactType, partner.notes
   - contactType must be one of: partner, contractor, commercial, retail, manufacturing

## Response Format

Always respond with a JSON object with this structure:
{
    "success": true,
    "actions": [
        {
            "type": "action_type",
            // ... action-specific fields
        }
    ]
}

If you cannot understand the request or find the partner, respond with:
{
    "success": false,
    "error": "explanation of what went wrong"
}

## Partner Matching

When the user mentions a company name, match it against the provided partner list. Use fuzzy matching:
- "Eurotech" matches "Eurotech Metal Industries"
- "Al Shurooq" matches "Al Shurooq Technical Supplies"
- "Rainbow" matches "Rainbow Coatings LLC"
- Be lenient with partial matches

If a partner isn't found and the user is trying to add a contact or log an activity, respond with an error suggesting they create the partner first.

## Examples

Input: "Add a contact named Ted at Accurate Metal, email ted@accurate.com"
Output:
{
    "success": true,
    "actions": [{
        "type": "add_contact",
        "partnerId": "partner_123",
        "partnerName": "Accurate Metal Fabricating",
        "contact": {
            "name": "Ted",
            "email": "ted@accurate.com"
        }
    }]
}

Input: "Log a call with Eurotech - discussed prototype timeline"
Output:
{
    "success": true,
    "actions": [{
        "type": "add_activity",
        "partnerId": "partner_456",
        "partnerName": "Eurotech Metal Industries",
        "activity": {
            "type": "Call",
            "notes": "Discussed prototype timeline"
        }
    }]
}

Input: "Mark Al Shurooq as Won"
Output:
{
    "success": true,
    "actions": [{
        "type": "update_status",
        "partnerId": "partner_789",
        "partnerName": "Al Shurooq Technical Supplies",
        "status": "Won"
    }]
}

Input: "Add a new manufacturer called KDM Steel in China"
Output:
{
    "success": true,
    "actions": [{
        "type": "create_partner",
        "partner": {
            "name": "KDM Steel",
            "contactType": "manufacturing",
            "notes": "Located in China"
        }
    }]
}

IMPORTANT: Only respond with valid JSON. No explanations or text before or after the JSON.`;

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        return res.status(401).json({ success: false, error: 'API key not configured' });
    }

    const { input, partners, fileContent, fileName } = req.body;

    if (!input && !fileContent) {
        return res.status(400).json({ success: false, error: 'Input or file content is required' });
    }

    // Build partner list context
    const partnerContext = partners && partners.length > 0
        ? `Available partners in CRM:\n${partners.map(p => `- ${p.name} (ID: ${p.id}, Status: ${p.status || 'Unknown'})`).join('\n')}`
        : 'No partners currently in CRM.';

    // Build the user message with optional file content
    let userMessage = partnerContext + '\n\n';

    if (fileContent) {
        userMessage += `FILE ATTACHED: ${fileName || 'unknown'}\n`;
        userMessage += `--- FILE CONTENT START ---\n${fileContent.substring(0, 10000)}\n--- FILE CONTENT END ---\n\n`;
    }

    if (input) {
        userMessage += `User command: "${input}"`;
    } else {
        userMessage += 'User command: "Extract contacts, companies, and any actionable items from this file for the CRM"';
    }

    userMessage += '\n\nParse this and return the appropriate JSON actions.';

    try {
        const client = new Anthropic({ apiKey });

        const response = await client.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages: [
                {
                    role: 'user',
                    content: userMessage
                }
            ]
        });

        const aiResponse = response.content[0].text;

        // Parse the JSON response
        try {
            const result = JSON.parse(aiResponse);
            return res.status(200).json(result);
        } catch (parseErr) {
            // Try to extract JSON from response if wrapped in text
            const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                try {
                    const result = JSON.parse(jsonMatch[0]);
                    return res.status(200).json(result);
                } catch {
                    // Fall through to error
                }
            }
            return res.status(200).json({
                success: false,
                error: 'Failed to parse AI response',
                raw: aiResponse
            });
        }

    } catch (err) {
        console.error('Claude API error:', err.message);

        if (err.status === 401) {
            return res.status(401).json({ success: false, error: 'Invalid API key' });
        }
        if (err.status === 429) {
            return res.status(429).json({ success: false, error: 'Rate limit exceeded. Try again in a moment.' });
        }

        res.status(500).json({
            success: false,
            error: 'Failed to process request',
            details: err.message
        });
    }
}
