const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const htmlPath = path.resolve(__dirname, 'website/ate-75-prototype-pack.html');
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });

    await page.pdf({
        path: 'ATE-75-Design-Pack.pdf',
        format: 'A4',
        margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' },
        printBackground: true,
        displayHeaderFooter: false  // No file path or page numbers
    });

    await browser.close();
    console.log('PDF generated: ATE-75-Design-Pack.pdf');
})();
