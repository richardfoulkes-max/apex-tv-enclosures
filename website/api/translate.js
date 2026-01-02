/**
 * Translation endpoint
 * POST /api/translate
 */

import Anthropic from '@anthropic-ai/sdk';

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

    const { text, targetLanguage } = req.body;

    if (!text || !targetLanguage) {
        return res.status(400).json({ error: 'text and targetLanguage are required' });
    }

    try {
        const client = new Anthropic({ apiKey });

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

        res.status(200).json({
            success: true,
            translation: response.content[0].text,
            targetLanguage
        });

    } catch (err) {
        console.error('Translation error:', err.message);
        res.status(500).json({ error: 'Translation failed', details: err.message });
    }
}
