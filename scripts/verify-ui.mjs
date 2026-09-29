import { chromium } from 'playwright';

async function verify() {
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

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Evaluate computed styles
  const styles = await page.evaluate(() => {
    const hero = document.querySelector('section');
    const searchBar = document.querySelector('section:nth-of-type(2)') || document.querySelector('.container-main.-mt-12') || document.querySelector('.container-main');
    const featuredSec = Array.from(document.querySelectorAll('section')).find(s => s.textContent?.includes('Bất Động Sản Nổi Bật') || s.textContent?.includes('Featured Properties'));
    const featuredHeading = featuredSec?.querySelector('h2');
    const firstCard = document.querySelector('.group.relative.flex.flex-col');

    return {
      bodyMargin: window.getComputedStyle(document.body).margin,
      featuredSectionPaddingTop: featuredSec ? window.getComputedStyle(featuredSec).paddingTop : 'not found',
      featuredSectionPaddingBottom: featuredSec ? window.getComputedStyle(featuredSec).paddingBottom : 'not found',
      featuredHeadingMarginBottom: featuredHeading ? window.getComputedStyle(featuredHeading).marginBottom : 'not found',
      cardPadding: firstCard ? window.getComputedStyle(firstCard.querySelector('.p-5') || firstCard).padding : 'not found',
    };
  });

  console.log('Computed styles verification:', JSON.stringify(styles, null, 2));

  // Take screenshot of homepage
  await page.screenshot({ path: 'homepage-after-fix.png', fullPage: false });
  console.log('Saved screenshot: homepage-after-fix.png');

  // Scroll down to featured properties section
  await page.evaluate(() => window.scrollBy(0, 750));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'featured-section-after-fix.png', fullPage: false });
  console.log('Saved screenshot: featured-section-after-fix.png');

  // Check /properties page as well
  await page.goto('http://localhost:3000/properties', { waitUntil: 'networkidle' });
  const propertiesStyles = await page.evaluate(() => {
    const headerSec = document.querySelector('section');
    const gridSec = document.querySelectorAll('section')[1];
    return {
      headerPaddingTop: headerSec ? window.getComputedStyle(headerSec).paddingTop : 'not found',
      headerPaddingBottom: headerSec ? window.getComputedStyle(headerSec).paddingBottom : 'not found',
      gridPaddingTop: gridSec ? window.getComputedStyle(gridSec).paddingTop : 'not found',
    };
  });
  console.log('Properties page computed styles:', JSON.stringify(propertiesStyles, null, 2));
  await page.screenshot({ path: 'properties-page-after-fix.png', fullPage: false });
  console.log('Saved screenshot: properties-page-after-fix.png');

  await browser.close();
}

verify().catch((err) => {
  console.error('Verification error:', err);
  process.exit(1);
});
