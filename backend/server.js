/**
 * Apex AI Director - Backend Server
 * Proxies requests to Claude API to keep API keys secure
 */

const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Load system prompt
const systemPromptPath = path.join(__dirname, '..', 'ai-director', 'system-prompt.md');
let systemPrompt = '';
try {
    systemPrompt = fs.readFileSync(systemPromptPath, 'utf8');
    console.log('Loaded AI Director system prompt');
} catch (err) {
    console.warn('Warning: Could not load system-prompt.md, using default');
    systemPrompt = `You are an AI assistant for Apex Enclosures, a company selling outdoor TV enclosures and pool equipment enclosures in the UAE and Middle East.

Key products:
- ATE Series (TV Enclosures): 55" (AED 7,500), 65" (AED 8,500), 75" (AED 10,500)
- APE Series (Pool Equipment Enclosures): BASE (AED 1,500-2,000)

Always be professional, helpful, and focus on the Gulf region market.`;
}

// Store API key in memory (loaded from config file or environment)
let claudeApiKey = process.env.ANTHROPIC_API_KEY || '';

// Config file path
const configPath = path.join(__dirname, 'config.json');

// Load config on startup
try {
    if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        if (config.apiKey) {
            claudeApiKey = config.apiKey;
            console.log('Loaded API key from config');
        }
    }
} catch (err) {
    console.warn('Could not load config:', err.message);
}

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        hasApiKey: !!claudeApiKey,
        timestamp: new Date().toISOString()
    });
});

// Set API key
app.post('/api/set-key', (req, res) => {
    const { apiKey } = req.body;

    if (!apiKey || !apiKey.startsWith('sk-ant-')) {
        return res.status(400).json({ error: 'Invalid API key format' });
    }

    claudeApiKey = apiKey;

    // Save to config file
    try {
        fs.writeFileSync(configPath, JSON.stringify({ apiKey }, null, 2));
        console.log('API key saved to config');
    } catch (err) {
        console.warn('Could not save config:', err.message);
    }

    res.json({ success: true, message: 'API key configured' });
});

// Generate AI response
app.post('/api/generate', async (req, res) => {
    if (!claudeApiKey) {
        return res.status(401).json({ error: 'API key not configured' });
    }

    const {
        customerMessage,
        customerName,
        customerEmail,
        product,        // 'tv' or 'pool'
        market,         // 'uae', 'saudi', 'spain', 'france'
        language,       // 'english', 'arabic', 'spanish', 'french'
        type,           // 'lead_response', 'follow_up', 'quote', 'outreach'
        channel         // 'whatsapp', 'email'
    } = req.body;

    if (!customerMessage) {
        return res.status(400).json({ error: 'customerMessage is required' });
    }

    // Build context for the AI
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
        const client = new Anthropic({ apiKey: claudeApiKey });

        const response = await client.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2048,
            system: systemPrompt,
            messages: [
                {
                    role: 'user',
                    content: contextInfo
                }
            ]
        });

        const aiResponse = response.content[0].text;

        // Calculate confidence based on response characteristics
        let confidence = 50;

        // Higher confidence for simple inquiries
        if (type === 'lead_response') confidence += 15;
        if (language === 'english') confidence += 10;
        if (product) confidence += 10;

        // Lower confidence for complex scenarios
        if (type === 'quote') confidence -= 20;
        if (type === 'outreach') confidence -= 30;
        if (customerMessage.toLowerCase().includes('custom') ||
            customerMessage.toLowerCase().includes('negotiate')) {
            confidence -= 15;
        }

        // Ensure bounds
        confidence = Math.max(5, Math.min(95, confidence));

        res.json({
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
});

// Translate response (for non-English markets)
app.post('/api/translate', async (req, res) => {
    if (!claudeApiKey) {
        return res.status(401).json({ error: 'API key not configured' });
    }

    const { text, targetLanguage } = req.body;

    if (!text || !targetLanguage) {
        return res.status(400).json({ error: 'text and targetLanguage are required' });
    }

    try {
        const client = new Anthropic({ apiKey: claudeApiKey });

        const response = await client.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2048,
            messages: [
                {
                    role: 'user',
                    content: `Translate the following text to ${targetLanguage}. Keep the formatting (bullet points, line breaks, etc.) intact. Only respond with the translation, nothing else.

Text to translate:
${text}`
                }
            ]
        });

        res.json({
            success: true,
            translation: response.content[0].text,
            targetLanguage
        });

    } catch (err) {
        console.error('Translation error:', err.message);
        res.status(500).json({ error: 'Translation failed', details: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════╗
║     Apex AI Director Backend Server        ║
║────────────────────────────────────────────║
║  Running on: http://localhost:${PORT}         ║
║  API Key: ${claudeApiKey ? 'Configured' : 'Not configured'}                   ║
╚════════════════════════════════════════════╝
    `);

    if (!claudeApiKey) {
        console.log('To configure API key, either:');
        console.log('1. Set ANTHROPIC_API_KEY environment variable');
        console.log('2. POST to /api/set-key with { "apiKey": "sk-ant-..." }');
        console.log('3. Use the Setup page in the web interface\n');
    }
});
