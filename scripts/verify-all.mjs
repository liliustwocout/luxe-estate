import { chromium } from 'playwright';

async function verifyAll() {
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  // 1. Detail Page
  console.log('Testing Detail Page...');
  await page.goto('http://localhost:3000/properties/luxury-riverside-villa', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'detail-page.png', fullPage: false });
  console.log('Saved detail-page.png');

  // 2. Click "Schedule a Viewing" to test modal
  console.log('Testing Viewing Modal...');
  const scheduleBtn = page.getByRole('button', { name: /Đặt Lịch Tham Quan Riêng|Schedule Private Viewing/i }).first();
  if (await scheduleBtn.isVisible()) {
    await scheduleBtn.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'viewing-modal.png', fullPage: false });
    console.log('Saved viewing-modal.png');
  }

  // 3. About Page
  console.log('Testing About Page...');
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'about-page.png', fullPage: false });
  console.log('Saved about-page.png');

  // 4. Contact Page
  console.log('Testing Contact Page...');
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'contact-page.png', fullPage: false });
  console.log('Saved contact-page.png');

  await browser.close();
  console.log('All verification checks completed successfully!');
}

verifyAll().catch((err) => {
  console.error('Error during verification:', err);
  process.exit(1);
});
