import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('./public/test-screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log('🚀 Starting Admin Portal Verification with Playwright...');
  let browser;
  try {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  } catch {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  }

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  try {
    // 1. Login Page
    console.log('Testing Admin Login (/admin/login)...');
    await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09_admin_login.png') });
    console.log('📸 09_admin_login.png captured');

    // Click submit login
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/dashboard', { timeout: 6000 });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10_admin_dashboard.png') });
    console.log('📸 10_admin_dashboard.png captured');

    // 2. Properties List
    console.log('Testing Admin Properties List (/admin/properties)...');
    await page.goto('http://localhost:3000/admin/properties', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '11_admin_properties.png') });
    console.log('📸 11_admin_properties.png captured');

    // 3. Add Property Form
    console.log('Testing Add Property Form (/admin/properties/new)...');
    await page.goto('http://localhost:3000/admin/properties/new', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '12_admin_add_property.png') });
    console.log('📸 12_admin_add_property.png captured');

    // 4. Viewings List
    console.log('Testing Admin Viewings List (/admin/viewings)...');
    await page.goto('http://localhost:3000/admin/viewings', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '13_admin_viewings.png') });
    console.log('📸 13_admin_viewings.png captured');

    // 5. Calendar View
    console.log('Testing Admin Calendar View (/admin/viewings/calendar)...');
    await page.goto('http://localhost:3000/admin/viewings/calendar', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '14_admin_calendar.png') });
    console.log('📸 14_admin_calendar.png captured');

    // 6. Customers Directory
    console.log('Testing Admin Customers Directory (/admin/customers)...');
    await page.goto('http://localhost:3000/admin/customers', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '15_admin_customers.png') });
    console.log('📸 15_admin_customers.png captured');

    // 7. Settings Page
    console.log('Testing Admin Settings (/admin/settings)...');
    await page.goto('http://localhost:3000/admin/settings', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '16_admin_settings.png') });
    console.log('📸 16_admin_settings.png captured');

    console.log('✅ All Admin verification steps completed successfully!');
  } catch (err) {
    console.error('❌ Error during Admin verification:', err);
  } finally {
    await browser.close();
  }
}

run();
