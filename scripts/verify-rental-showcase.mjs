import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('./public/test-screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log('🚀 Starting Luxury Rental Platform Verification with Playwright...');
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
    // 1. Home Page Verification
    console.log('Testing Home Page (Cinematic Hero & 3D Canvas)...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    // Wait for intro loader if present
    await page.waitForTimeout(1600);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_home_hero.png') });
    console.log('📸 01_home_hero.png captured');

    // Scroll to Featured Showcase section
    console.log('Testing Featured Residences Showcase Carousel...');
    await page.evaluate(() => window.scrollBy(0, 750));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_home_showcase.png') });
    console.log('📸 02_home_showcase.png captured');

    // Test carousel navigation arrow
    const nextBtn = page.locator('button[aria-label="Next property"]');
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_home_showcase_next.png') });
      console.log('📸 03_home_showcase_next.png captured');
    }

    // Scroll down to Property Cards grid
    console.log('Testing Curated Rental Property Cards...');
    await page.evaluate(() => window.scrollBy(0, 900));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_home_rental_cards.png') });
    console.log('📸 04_home_rental_cards.png captured');

    // 2. Properties Listing & Filter Page
    console.log('Testing Properties Listing & Rental Filters (/properties)...');
    await page.goto('http://localhost:3000/properties', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_properties_rental_filters.png') });
    console.log('📸 05_properties_rental_filters.png captured');

    // 3. Property Detail Page
    console.log('Testing Property Detail Page (/properties/lumina-residence-west-lake)...');
    await page.goto('http://localhost:3000/properties/lumina-residence-west-lake', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_property_detail.png') });
    console.log('📸 06_property_detail.png captured');

    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06b_property_detail_specs.png') });
    console.log('📸 06b_property_detail_specs.png captured');

    // Test Schedule a Viewing modal
    console.log('Testing Schedule a Viewing Modal...');
    const scheduleTourBtn = page.locator('button:has-text("Đặt Lịch Xem Căn Này"), button:has-text("Schedule a Viewing")').first();
    if (await scheduleTourBtn.isVisible()) {
      await scheduleTourBtn.click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_viewing_modal.png') });
      console.log('📸 07_viewing_modal.png captured');
      // Close modal
      const closeBtn = page.locator('button[aria-label="Đóng"], button[aria-label="Close modal"]');
      if (await closeBtn.isVisible()) {
        await closeBtn.click();
        await page.waitForTimeout(300);
      }
    }

    // 4. About Page (Verify removal of 3 icons)
    console.log('Testing About Page (3 Pillars icons removal)...');
    await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08_about_pillars_no_icons.png') });
    console.log('📸 08_about_pillars_no_icons.png captured');

    console.log('✅ All verification steps completed successfully!');
  } catch (err) {
    console.error('❌ Error during Playwright verification:', err);
  } finally {
    await browser.close();
  }
}

run();
