// CRM Activity Update Script - Paste this in browser console on partner-crm.html
// Run this ONCE to add all email activities from Dec 2025 - Jan 2026

(function() {
    const data = JSON.parse(localStorage.getItem('apexPartnersCRM_v6') || localStorage.getItem('apexPartnersCRM_v5') || '{}');
    if (!data.partners) {
        console.error('No CRM data found!');
        return;
    }

    // Helper to add activity
    function addActivity(partner, type, description, date) {
        const maxId = partner.activities.reduce((max, a) => Math.max(max, a.id), 0);
        partner.activities.push({
            id: maxId + 1,
            type: type,
            description: description,
            timestamp: new Date(date).toISOString()
        });
    }

    // Find partners
    const eurotech = data.partners.find(p => p.companyName.includes('Eurotech'));
    const alShurooq = data.partners.find(p => p.companyName.includes('Shurooq'));
    const kdm = data.partners.find(p => p.companyName.includes('KDM'));
    const accurate = data.partners.find(p => p.companyName.includes('Accurate'));

    // === EUROTECH UPDATES ===
    if (eurotech) {
        // Add Walid as contact if not exists
        if (!eurotech.contacts.find(c => c.name.includes('Walid'))) {
            eurotech.contacts.push({
                id: 2,
                name: 'Walid Ragab',
                title: 'Sales Manager',
                email: 'walid.mohamed@eurotech-metal.com',
                phone: '',
                isPrimary: false,
                isDecisionMaker: false
            });
        }
        // Clear and rebuild activities
        eurotech.activities = [
            { id: 1, type: 'email_sent', description: 'Initial RFQ sent to general@eurotech-metal.com', timestamp: '2025-12-23T23:13:00Z' },
            { id: 2, type: 'email_received', description: 'Reply from Walid Ragab - interested in project', timestamp: '2025-12-30T09:11:00Z' },
            { id: 3, type: 'email_sent', description: 'Follow-up reply to Walid', timestamp: '2025-12-31T14:13:00Z' },
            { id: 4, type: 'email_sent', description: 'Follow-up to Walid', timestamp: '2026-01-04T14:33:00Z' },
            { id: 5, type: 'meeting', description: 'Meeting invite received from Walid - factory visit scheduled for 8 Jan', timestamp: '2026-01-05T07:49:00Z' },
            { id: 6, type: 'email_received', description: 'FW: Richard documents from Walid', timestamp: '2026-01-05T09:43:00Z' },
            { id: 7, type: 'email_received', description: 'Guillaume confirming factory visit', timestamp: '2026-01-08T08:40:00Z' },
            { id: 8, type: 'site_visit', description: 'Factory tour at JAFZA. Very impressed - 2000hr salt spray test, ISO 9001/14001/45001 certified. Met Guillaume (Head of Sales) and team.', timestamp: '2026-01-08T13:00:00Z' },
            { id: 9, type: 'email_sent', description: 'Sent ATE-75 Design Pack (14MB PDF) to Guillaume after visit', timestamp: '2026-01-08T16:58:00Z' },
            { id: 10, type: 'email_received', description: 'Guillaume confirmed working on technical review, quote by Monday', timestamp: '2026-01-09T16:45:00Z' },
            { id: 11, type: 'email_sent', description: 'Thank you reply - looking forward to quote', timestamp: '2026-01-09T21:48:00Z' }
        ];
        eurotech.status = 'Proposal';
        eurotech.lastContact = '2026-01-09T21:48:00Z';
        eurotech.notes = 'TOP PRIORITY - Factory visit 8 Jan was excellent. 2000hr salt spray, ISO certified. Guillaume quote due Monday 13 Jan.';
        console.log('✓ Eurotech updated');
    }

    // === AL SHUROOQ UPDATES ===
    if (alShurooq) {
        alShurooq.activities = [
            { id: 1, type: 'email_sent', description: 'Initial RFQ sent', timestamp: '2025-12-23T23:13:00Z' },
            { id: 2, type: 'email_received', description: 'Reply from Danica - interested, reviewing', timestamp: '2025-12-24T17:00:00Z' },
            { id: 3, type: 'email_sent', description: 'Follow-up reply', timestamp: '2025-12-24T23:16:00Z' },
            { id: 4, type: 'email_received', description: 'Danica requested trade license', timestamp: '2025-12-26T11:37:00Z' },
            { id: 5, type: 'email_sent', description: 'Replied - proceeding as individual for prototype', timestamp: '2025-12-26T14:29:00Z' },
            { id: 6, type: 'email_received', description: 'Follow-up from Danica', timestamp: '2025-12-26T14:44:00Z' },
            { id: 7, type: 'email_received', description: 'Follow-up from Danica', timestamp: '2025-12-31T10:29:00Z' },
            { id: 8, type: 'email_sent', description: 'Reply to Danica', timestamp: '2025-12-31T14:42:00Z' },
            { id: 9, type: 'email_received', description: 'Reply from Danica', timestamp: '2026-01-05T09:43:00Z' },
            { id: 10, type: 'email_sent', description: 'Follow-up sent', timestamp: '2026-01-05T09:46:00Z' },
            { id: 11, type: 'email_received', description: 'Reply from Danica', timestamp: '2026-01-06T14:32:00Z' },
            { id: 12, type: 'email_received', description: 'Follow-up from Danica', timestamp: '2026-01-09T08:33:00Z' },
            { id: 13, type: 'email_sent', description: 'Reply sent', timestamp: '2026-01-09T09:11:00Z' }
        ];
        alShurooq.status = 'Contacted';
        alShurooq.lastContact = '2026-01-09T09:11:00Z';
        alShurooq.notes = 'In discussion - requested trade license, we said prototype first as individual. Active conversation with Danica.';
        console.log('✓ Al Shurooq updated');
    }

    // === KDM STEEL UPDATES ===
    if (kdm) {
        kdm.activities = [
            { id: 1, type: 'email_sent', description: 'Initial RFQ sent for custom electronics enclosure', timestamp: '2025-12-28T09:39:00Z' },
            { id: 2, type: 'email_received', description: 'Reply from Jason - interested in project', timestamp: '2025-12-29T16:55:00Z' },
            { id: 3, type: 'email_sent', description: 'Follow-up reply to Jason', timestamp: '2025-12-31T14:43:00Z' }
        ];
        kdm.status = 'Contacted';
        kdm.lastContact = '2025-12-31T14:43:00Z';
        console.log('✓ KDM Steel updated');
    }

    // === ADD ACCURATE METAL FAB (NEW) ===
    if (!accurate) {
        const newId = Math.max(...data.partners.map(p => p.id)) + 1;
        data.partners.push({
            id: newId,
            companyName: 'Accurate Metal Fabricating',
            contactType: 'manufacturing',
            partnerType: 'Fabricator',
            region: 'USA',
            website: 'https://www.accuratemetalfab.com',
            linkedInUrl: '',
            address: 'Illinois, USA',
            leadSource: 'cold_outreach',
            status: 'Proposal',
            priority: 'High',
            dealValue: 0,
            productsInterested: ['75"'],
            expectedCloseDate: '',
            winProbability: 50,
            lostReason: '',
            followupDate: '2026-01-16',
            notes: 'HOT LEAD - Ted replied same day. Can do watertight aluminum, willing to sign NDA, 4-6 week sample lead time. Sent NDA + Design Pack.',
            contacts: [
                { id: 1, name: 'Ted Zaplatosch', title: '', email: 'tzaplatosch@accuratemetalfab.com', phone: '', isPrimary: true, isDecisionMaker: true },
                { id: 2, name: 'Daniel Cohen', title: '', email: 'sales@accuratemetalfab.com', phone: '', isPrimary: false, isDecisionMaker: false }
            ],
            activities: [
                { id: 1, type: 'email_sent', description: 'Initial RFQ sent (US manufacturing partner outreach)', timestamp: '2026-01-09T13:51:00Z' },
                { id: 2, type: 'email_received', description: 'Ted replied - can do watertight aluminum, willing to sign NDA, needs DXF/PDF, 4-6 week sample lead time. Quote for 50/100/150 units.', timestamp: '2026-01-09T20:17:00Z' },
                { id: 3, type: 'email_sent', description: 'Sent NDA + ATE-75 Design Pack (14MB). Requested quotes for 50/100/150 + prototype. Mentioned CAD coming from Dubai.', timestamp: '2026-01-09T21:47:00Z' }
            ],
            createdAt: '2026-01-09T13:51:00Z',
            lastContact: '2026-01-09T21:47:00Z'
        });
        console.log('✓ Accurate Metal Fab added');
    }

    // === ADD OTHER US MANUFACTURERS ===
    const usManufacturers = [
        { name: 'DDB Unlimited', email: 'dustin@ddbunlimited.com', contact: 'Dustin Mahorney', location: 'Oklahoma, USA' },
        { name: 'Bull Metal Products', email: 'sales@bullmetal.com', contact: 'Steve Bull', location: 'Connecticut, USA' },
        { name: 'Bison ProFab', email: 'jhenderson@bisonprofab.com', contact: 'Joshua Henderson', location: 'Texas, USA' }
    ];

    usManufacturers.forEach(mfr => {
        if (!data.partners.find(p => p.companyName.includes(mfr.name.split(' ')[0]))) {
            const newId = Math.max(...data.partners.map(p => p.id)) + 1;
            data.partners.push({
                id: newId,
                companyName: mfr.name,
                contactType: 'manufacturing',
                partnerType: 'Fabricator',
                region: 'USA',
                website: '',
                linkedInUrl: '',
                address: mfr.location,
                leadSource: 'cold_outreach',
                status: 'Contacted',
                priority: 'Medium',
                dealValue: 0,
                productsInterested: ['75"'],
                expectedCloseDate: '',
                winProbability: 30,
                lostReason: '',
                followupDate: '2026-01-16',
                notes: 'US manufacturer - initial RFQ sent 9 Jan. Awaiting response.',
                contacts: [
                    { id: 1, name: mfr.contact, title: '', email: mfr.email, phone: '', isPrimary: true, isDecisionMaker: false }
                ],
                activities: [
                    { id: 1, type: 'email_sent', description: 'Initial RFQ sent (US manufacturing partner outreach)', timestamp: '2026-01-09T13:50:00Z' }
                ],
                createdAt: '2026-01-09T13:50:00Z',
                lastContact: '2026-01-09T13:50:00Z'
            });
            console.log('✓ ' + mfr.name + ' added');
        }
    });

    // Save back to localStorage
    const key = localStorage.getItem('apexPartnersCRM_v6') ? 'apexPartnersCRM_v6' : 'apexPartnersCRM_v5';
    localStorage.setItem(key, JSON.stringify(data));

    console.log('\n✅ CRM updated! Refresh the page to see changes.');
})();
