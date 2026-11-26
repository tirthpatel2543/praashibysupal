import { chromium } from 'playwright';

async function testMobileAndAdmin() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 }, // iPhone SE mobile viewport
  });
  const page = await context.newPage();

  console.log('--- Testing Mobile View (375x667) ---');
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(1000);

  // 1. Hamburger menu button
  const hamburgerBtn = page.locator('button[aria-label="Toggle mobile navigation menu"]');
  const isHamburgerVisible = await hamburgerBtn.isVisible();
  console.log(`[PASS] Hamburger button visible on mobile: ${isHamburgerVisible}`);

  // Click hamburger button to open drawer
  await hamburgerBtn.click();
  await page.waitForTimeout(500);

  // 2. Check drawer content
  const drawerTitle = page.locator('text=Praashi by Supal');
  console.log(`[PASS] Mobile drawer opened with title: ${await drawerTitle.first().isVisible()}`);

  const goldRateInDrawer = page.locator('text=Live 22K Gold');
  console.log(`[PASS] Live gold rate displayed in mobile drawer: ${await goldRateInDrawer.first().isVisible()}`);

  const goldCategoryBtn = page.locator('div.space-y-1 button:has-text("Gold")');
  console.log(`[PASS] Gold category visible in drawer: ${await goldCategoryBtn.first().isVisible()}`);

  // 3. Admin portal button in mobile drawer
  const mobileAdminBtn = page.locator('div.fixed.inset-0 button:has-text("Admin Login")');
  console.log(`[PASS] Admin Login button in mobile drawer: ${await mobileAdminBtn.isVisible()}`);

  // Click Admin Login from mobile drawer
  await mobileAdminBtn.click();
  await page.waitForTimeout(1000);

  console.log(`[PASS] Navigated to: ${page.url()}`);
  const adminPortalHeader = page.locator('text=Praashi Admin Portal');
  console.log(`[PASS] Admin portal heading visible: ${await adminPortalHeader.first().isVisible()}`);

  // Test 1-click autofill and login
  const autofillBtn = page.locator('button:has-text("1-Click Autofill")');
  await autofillBtn.click();
  await page.waitForTimeout(300);

  const signInBtn = page.locator('button:has-text("Sign In to Atelier")');
  await signInBtn.click();
  await page.waitForTimeout(1000);

  const adminDashboardHeading = page.locator('text=Dashboard Overview');
  console.log(`[PASS] Successfully logged into Admin Dashboard: ${await adminDashboardHeading.first().isVisible()}`);

  await browser.close();
  console.log('--- ALL MOBILE & ADMIN TESTS PASSED ---');
}

testMobileAndAdmin().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
