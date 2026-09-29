import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const screenshotDir = path.resolve(__dirname, '../public/test-screenshots');

async function verifyModal() {
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Find a "Đặt Lịch Xem" or "Book Viewing" button
  console.log('Clicking booking button...');
  const bookBtn = page.locator('button:has-text("Đặt Lịch Xem"), button:has-text("Đặt Lịch"), button:has-text("ĐẶT LỊCH")').first();
  await bookBtn.waitFor({ state: 'visible', timeout: 5000 });
  await bookBtn.click();

  // Wait for modal
  const modal = page.locator('.fixed.inset-0.z-\\[60\\]');
  await modal.waitFor({ state: 'visible', timeout: 3000 });
  console.log('✓ Modal opened successfully');

  // Verify Date and Time inputs are gone
  const dateInputCount = await page.locator('input[type="date"], #date').count();
  const timeSelectCount = await page.locator('#time').count();
  console.log(`Date inputs found: ${dateInputCount} (Expected: 0)`);
  console.log(`Time slots found: ${timeSelectCount} (Expected: 0)`);

  if (dateInputCount !== 0 || timeSelectCount !== 0) {
    throw new Error('FAILED: Date or Time field is still present!');
  }
  console.log('✓ Date and Time fields successfully removed');

  // Screenshot form state
  await page.screenshot({ path: path.join(screenshotDir, 'modal-form-no-datetime.png') });
  console.log('✓ Saved modal-form-no-datetime.png');

  // Fill in form
  await page.fill('#customerName', 'Nguyễn Gia Bảo');
  await page.fill('#phone', '0901234567');
  await page.fill('#email', 'giabao.nguyen@vip.vn');
  await page.fill('#message', 'Cần tư vấn hồ bơi vô cực và pháp lý sở hữu lâu dài');

  // Click Submit
  console.log('Submitting form...');
  const submitBtn = modal.locator('button[type="submit"]');
  await submitBtn.click();

  // Wait for success screen
  await page.waitForSelector('text=Đặt Lịch Tham Quan Thành Công!', { timeout: 8000 });
  console.log('✓ Success screen shown!');

  // Check booking code
  const bookingCode = await page.locator('.font-mono.font-bold').textContent();
  console.log(`✓ Generated booking code: ${bookingCode?.trim()}`);

  // Screenshot success state
  await page.screenshot({ path: path.join(screenshotDir, 'modal-success-screen.png') });
  console.log('✓ Saved modal-success-screen.png');

  // Test EN version
  await page.click('button:has-text("Hoàn Tất & Đóng")');
  await page.waitForTimeout(400);
  await page.click('button:has-text("EN")');
  await page.waitForTimeout(300);
  const bookBtnEn = page.locator('button:has-text("Book Viewing")').first();
  await bookBtnEn.click();
  await page.waitForSelector('.fixed.inset-0.z-\\[60\\]', { timeout: 3000 });
  await page.screenshot({ path: path.join(screenshotDir, 'modal-form-en.png') });
  console.log('✓ Saved modal-form-en.png');

  await browser.close();
  console.log('ALL CHECKS PASSED!');
}

verifyModal().catch((err) => {
  console.error(err);
  process.exit(1);
});
