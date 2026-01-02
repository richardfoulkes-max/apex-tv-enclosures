/**
 * Health check endpoint
 * GET /api/health
 */

export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    res.status(200).json({
        status: 'ok',
        hasApiKey: !!process.env.ANTHROPIC_API_KEY,
        timestamp: new Date().toISOString()
    });
}
