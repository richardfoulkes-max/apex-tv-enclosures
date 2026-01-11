/**
 * Apex TV Enclosures - Market Intelligence Scanner
 * Uses Exa AI to find competitor info, pricing, market news
 */

const EXA_API_KEY = '4999b6a0-6c04-406d-b47c-8e6656c736f1';
const EXA_API_URL = 'https://api.exa.ai/search';

async function searchExa(query, options = {}) {
    const {
        numResults = 10,
        type = 'neural',
        category = null
    } = options;

    const body = {
        query,
        type,
        useAutoprompt: true,
        numResults,
        contents: {
            text: { maxCharacters: 1000 },
            highlights: true
        }
    };

    if (category) body.category = category;

    const response = await fetch(EXA_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': EXA_API_KEY
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        console.error('Exa error:', response.status, await response.text());
        return [];
    }

    const data = await response.json();
    return data.results || [];
}

async function runApexTVScans() {
    console.log('🔍 Running Apex TV Enclosures Market Intelligence Scan...\n');

    const searches = [
        {
            name: 'Outdoor TV Enclosure Competitors',
            query: 'outdoor TV enclosure weatherproof cabinet for television price',
            category: 'company'
        },
        {
            name: 'Outdoor TV Market News 2025-2026',
            query: 'outdoor television market growth 2025 2026 trends',
            category: 'news'
        },
        {
            name: 'Pool Equipment Enclosure Products',
            query: 'pool pump enclosure noise reduction outdoor equipment cabinet',
            category: 'company'
        },
        {
            name: 'UAE/Gulf Outdoor Living Market',
            query: 'Dubai UAE outdoor living luxury villa pool entertainment',
            category: 'news'
        },
        {
            name: 'Outdoor TV Distributor Opportunities',
            query: 'outdoor TV distribution wholesale reseller partner program',
            category: 'company'
        }
    ];

    const allResults = [];

    for (const search of searches) {
        console.log(`\n📡 ${search.name}...`);
        const results = await searchExa(search.query, {
            numResults: 8,
            category: search.category
        });

        console.log(`   Found ${results.length} results`);

        for (const r of results) {
            allResults.push({
                category: search.name,
                title: r.title,
                url: r.url,
                text: r.text?.substring(0, 300) || '',
                score: r.score
            });
            console.log(`   - ${r.title?.substring(0, 60)}...`);
        }
    }

    // Output JSON for further processing
    console.log('\n\n=== FULL RESULTS JSON ===\n');
    console.log(JSON.stringify(allResults, null, 2));

    return allResults;
}

runApexTVScans().catch(console.error);
