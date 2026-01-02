/**
 * Apex Enclosures - Chat Widget, Lead Magnet & Contact Form
 * Include this on any page: <script src="chat-widget.js"></script>
 */

const BACKEND_URL = 'https://apex-tv-enclosures.vercel.app';

// ============================================
// CHAT WIDGET - Floating button with options
// ============================================
function initChatWidget() {
    // Remove existing WhatsApp float if present
    const existingFloat = document.querySelector('.whatsapp-float');
    if (existingFloat) existingFloat.remove();

    const widget = document.createElement('div');
    widget.innerHTML = `
        <style>
            .apex-chat-widget {
                position: fixed;
                bottom: 24px;
                right: 24px;
                z-index: 9999;
                font-family: 'Inter', -apple-system, sans-serif;
            }
            .apex-chat-bubble {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(13,148,136,0.4);
                transition: transform 0.2s, box-shadow 0.2s;
            }
            .apex-chat-bubble:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 28px rgba(13,148,136,0.5);
            }
            .apex-chat-bubble svg {
                width: 28px;
                height: 28px;
                fill: white;
            }
            .apex-chat-menu {
                position: absolute;
                bottom: 70px;
                right: 0;
                background: white;
                border-radius: 16px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.15);
                padding: 8px;
                min-width: 220px;
                display: none;
                animation: slideUp 0.2s ease;
            }
            .apex-chat-menu.open {
                display: block;
            }
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .apex-chat-option {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 16px;
                border-radius: 10px;
                cursor: pointer;
                transition: background 0.15s;
                text-decoration: none;
                color: #0f172a;
            }
            .apex-chat-option:hover {
                background: #f1f5f9;
            }
            .apex-chat-option-icon {
                width: 40px;
                height: 40px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
            }
            .apex-chat-option-icon.whatsapp { background: #dcfce7; }
            .apex-chat-option-icon.email { background: #dbeafe; }
            .apex-chat-option-icon.guide { background: #fef3c7; }
            .apex-chat-option-text strong {
                display: block;
                font-size: 14px;
                font-weight: 600;
            }
            .apex-chat-option-text span {
                font-size: 12px;
                color: #64748b;
            }
            .apex-chat-close {
                position: absolute;
                top: -8px;
                right: -8px;
                width: 24px;
                height: 24px;
                background: #ef4444;
                border-radius: 50%;
                color: white;
                border: none;
                cursor: pointer;
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        </style>
        <div class="apex-chat-widget">
            <div class="apex-chat-menu" id="chatMenu">
                <button class="apex-chat-close" onclick="toggleChatMenu()">×</button>
                <a href="https://wa.me/971505598675" target="_blank" class="apex-chat-option">
                    <div class="apex-chat-option-icon whatsapp">💬</div>
                    <div class="apex-chat-option-text">
                        <strong>WhatsApp</strong>
                        <span>Chat now - instant reply</span>
                    </div>
                </a>
                <div class="apex-chat-option" onclick="openContactModal()">
                    <div class="apex-chat-option-icon email">✉️</div>
                    <div class="apex-chat-option-text">
                        <strong>Send Message</strong>
                        <span>We'll reply within 24 hours</span>
                    </div>
                </div>
                <div class="apex-chat-option" onclick="openLeadMagnet()">
                    <div class="apex-chat-option-icon guide">📖</div>
                    <div class="apex-chat-option-text">
                        <strong>Free Buying Guide</strong>
                        <span>Download PDF</span>
                    </div>
                </div>
            </div>
            <div class="apex-chat-bubble" onclick="toggleChatMenu()">
                <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>
            </div>
        </div>
    `;
    document.body.appendChild(widget);
}

function toggleChatMenu() {
    const menu = document.getElementById('chatMenu');
    menu.classList.toggle('open');
}

// ============================================
// CONTACT MODAL - Quick message form
// ============================================
function openContactModal() {
    toggleChatMenu();

    // Remove existing modal
    const existing = document.getElementById('apexContactModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'apexContactModal';
    modal.innerHTML = `
        <style>
            .apex-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.2s ease;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .apex-modal {
                background: white;
                border-radius: 20px;
                padding: 32px;
                max-width: 440px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                animation: slideIn 0.3s ease;
            }
            @keyframes slideIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
            .apex-modal-close {
                position: absolute;
                top: 16px;
                right: 16px;
                width: 32px;
                height: 32px;
                border: none;
                background: #f1f5f9;
                border-radius: 50%;
                cursor: pointer;
                font-size: 18px;
            }
            .apex-modal h2 {
                font-size: 24px;
                margin-bottom: 8px;
            }
            .apex-modal p {
                color: #64748b;
                margin-bottom: 24px;
            }
            .apex-form-group {
                margin-bottom: 16px;
            }
            .apex-form-group label {
                display: block;
                margin-bottom: 6px;
                font-weight: 500;
                font-size: 14px;
            }
            .apex-form-group input,
            .apex-form-group textarea {
                width: 100%;
                padding: 12px 14px;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                font-size: 15px;
                transition: border-color 0.15s;
            }
            .apex-form-group input:focus,
            .apex-form-group textarea:focus {
                outline: none;
                border-color: #0d9488;
            }
            .apex-form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
            }
            .apex-submit-btn {
                width: 100%;
                padding: 14px;
                background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
                color: white;
                border: none;
                border-radius: 10px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                margin-top: 8px;
                transition: transform 0.15s;
            }
            .apex-submit-btn:hover {
                transform: translateY(-1px);
            }
            .apex-submit-btn:disabled {
                opacity: 0.7;
                cursor: not-allowed;
            }
            .apex-success {
                text-align: center;
                padding: 20px;
            }
            .apex-success-icon {
                font-size: 48px;
                margin-bottom: 16px;
            }
        </style>
        <div class="apex-modal-overlay" onclick="if(event.target===this)closeContactModal()">
            <div class="apex-modal">
                <button class="apex-modal-close" onclick="closeContactModal()">×</button>
                <div id="contactFormContent">
                    <h2>Send us a message</h2>
                    <p>We typically respond within a few hours during business days.</p>
                    <form id="apexContactForm">
                        <div class="apex-form-row">
                            <div class="apex-form-group">
                                <label>Name *</label>
                                <input type="text" name="name" required>
                            </div>
                            <div class="apex-form-group">
                                <label>Phone</label>
                                <input type="tel" name="phone" placeholder="+971...">
                            </div>
                        </div>
                        <div class="apex-form-group">
                            <label>Email *</label>
                            <input type="email" name="email" required>
                        </div>
                        <div class="apex-form-group">
                            <label>Message *</label>
                            <textarea name="message" rows="4" required placeholder="How can we help you?"></textarea>
                        </div>
                        <button type="submit" class="apex-submit-btn">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('apexContactForm').addEventListener('submit', handleContactSubmit);
}

function closeContactModal() {
    const modal = document.getElementById('apexContactModal');
    if (modal) modal.remove();
}

async function handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const data = Object.fromEntries(new FormData(form));

    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
        const response = await fetch(`${BACKEND_URL}/api/enquiries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customerName: data.name,
                customerEmail: data.email,
                subject: 'Website Contact Form',
                message: `${data.message}${data.phone ? '\n\nPhone: ' + data.phone : ''}`
            })
        });

        if (response.ok) {
            document.getElementById('contactFormContent').innerHTML = `
                <div class="apex-success">
                    <div class="apex-success-icon">✅</div>
                    <h2>Message Sent!</h2>
                    <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
                    <button class="apex-submit-btn" onclick="closeContactModal()" style="margin-top:20px">Close</button>
                </div>
            `;
        } else {
            throw new Error('Failed to send');
        }
    } catch (err) {
        btn.disabled = false;
        btn.textContent = 'Send Message';
        alert('Something went wrong. Please try WhatsApp instead.');
    }
}

// ============================================
// LEAD MAGNET - Free PDF guide with email capture
// ============================================
function openLeadMagnet() {
    toggleChatMenu();

    const existing = document.getElementById('apexLeadMagnet');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'apexLeadMagnet';
    modal.innerHTML = `
        <style>
            .lead-magnet-content {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 24px;
            }
            .lead-magnet-preview {
                background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
                border-radius: 12px;
                padding: 24px;
                color: white;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            .lead-magnet-preview h3 {
                font-size: 20px;
                margin-bottom: 16px;
            }
            .lead-magnet-preview ul {
                list-style: none;
                padding: 0;
            }
            .lead-magnet-preview li {
                padding: 8px 0;
                font-size: 14px;
                opacity: 0.9;
            }
            .lead-magnet-preview li::before {
                content: "✓ ";
                margin-right: 8px;
            }
            .lead-magnet-form h2 {
                font-size: 22px;
                margin-bottom: 8px;
            }
            .lead-magnet-form > p {
                color: #64748b;
                font-size: 14px;
                margin-bottom: 20px;
            }
            @media (max-width: 600px) {
                .lead-magnet-content {
                    grid-template-columns: 1fr;
                }
                .lead-magnet-preview {
                    display: none;
                }
            }
        </style>
        <div class="apex-modal-overlay" onclick="if(event.target===this)closeLeadMagnet()">
            <div class="apex-modal" style="max-width:600px">
                <button class="apex-modal-close" onclick="closeLeadMagnet()">×</button>
                <div id="leadMagnetContent" class="lead-magnet-content">
                    <div class="lead-magnet-preview">
                        <h3>📖 Outdoor TV Buying Guide</h3>
                        <ul>
                            <li>Enclosure vs outdoor TV comparison</li>
                            <li>Size selection guide</li>
                            <li>Installation considerations</li>
                            <li>Gulf climate requirements</li>
                            <li>Maintenance tips</li>
                            <li>Cost comparison calculator</li>
                        </ul>
                    </div>
                    <div class="lead-magnet-form">
                        <h2>Get Your Free Guide</h2>
                        <p>Enter your email and we'll send you the PDF instantly.</p>
                        <form id="leadMagnetForm">
                            <div class="apex-form-group">
                                <label>Name</label>
                                <input type="text" name="name" required>
                            </div>
                            <div class="apex-form-group">
                                <label>Email *</label>
                                <input type="email" name="email" required placeholder="you@example.com">
                            </div>
                            <button type="submit" class="apex-submit-btn">Download Free Guide</button>
                            <p style="font-size:11px;color:#94a3b8;margin-top:12px;text-align:center">
                                No spam. Unsubscribe anytime.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('leadMagnetForm').addEventListener('submit', handleLeadMagnetSubmit);
}

function closeLeadMagnet() {
    const modal = document.getElementById('apexLeadMagnet');
    if (modal) modal.remove();
}

async function handleLeadMagnetSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const data = Object.fromEntries(new FormData(form));

    btn.disabled = true;
    btn.textContent = 'Processing...';

    try {
        // Save lead to AI Director
        await fetch(`${BACKEND_URL}/api/enquiries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customerName: data.name || 'Guide Download',
                customerEmail: data.email,
                subject: 'Lead Magnet: Outdoor TV Buying Guide',
                message: `Downloaded the Outdoor TV Buying Guide.\n\nThis is a lead capture - follow up with helpful info about their outdoor TV project.`
            })
        });

        // Show success and trigger download
        document.getElementById('leadMagnetContent').innerHTML = `
            <div class="apex-success" style="grid-column: 1/-1">
                <div class="apex-success-icon">📖</div>
                <h2>Check Your Email!</h2>
                <p style="color:#64748b;margin-bottom:20px">
                    We've sent the Outdoor TV Buying Guide to <strong>${data.email}</strong>
                </p>
                <p style="font-size:14px;color:#94a3b8;margin-bottom:24px">
                    Didn't receive it? Check your spam folder or <a href="https://wa.me/971505598675" style="color:#0d9488">message us on WhatsApp</a>
                </p>
                <button class="apex-submit-btn" onclick="closeLeadMagnet()">Close</button>
            </div>
        `;

    } catch (err) {
        btn.disabled = false;
        btn.textContent = 'Download Free Guide';
        alert('Something went wrong. Please try again.');
    }
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', initChatWidget);

// Also init if script loaded after DOMContentLoaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initChatWidget, 1);
}
