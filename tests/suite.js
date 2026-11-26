import { chromium } from 'playwright';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';

const dbPath = path.resolve(process.cwd(), 'praashi.db');
const db = new DatabaseSync(dbPath);

async function runTestSuite() {
  console.log('====================================================');
  console.log('   PRAASHI BY SUPAL — AUTOMATED TEST SUITE');
  console.log('====================================================\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const baseUrl = 'http://localhost:5173';
  let passedCount = 0;
  let failedCount = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      if (details) console.log(`       ↳ ${details}`);
      passedCount++;
    } else {
      console.error(`[FAIL] ${testName}`);
      if (details) console.error(`       ↳ ${details}`);
      failedCount++;
    }
  }

  try {
    // ----------------------------------------------------
    // TEST C: Floating Concierge Chatbot & Database Enquiry
    // ----------------------------------------------------
    console.log('\n--- Running Test C: Floating Concierge Chatbot & DB Enquiry ---');
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    // Look for floating concierge button
    const conciergeBtn = page.locator('button[aria-label="Open Praashi Jewellery Concierge"]');
    await conciergeBtn.waitFor({ state: 'visible', timeout: 8000 });
    assert(await conciergeBtn.isVisible(), 'Concierge button is visible on storefront');

    // Click concierge button
    await conciergeBtn.click();
    await page.waitForTimeout(600);

    // Verify welcome message
    const welcomeBubble = page.locator('text=Namaste! Welcome to PraashiBySupal');
    await welcomeBubble.waitFor({ state: 'visible', timeout: 5000 });
    assert(await welcomeBubble.isVisible(), 'Concierge welcome message displayed');

    // Click "Gold Jewellery" option
    const goldOption = page.locator('button:has-text("Gold Jewellery")').first();
    await goldOption.click();
    await page.waitForTimeout(600);

    // Click "Necklaces & Chokers" option
    const neckOption = page.locator('button:has-text("Necklaces & Chokers")').first();
    await neckOption.click();
    await page.waitForTimeout(1000);

    // Assistant asks for name
    const chatInput = page.locator('#conciergeInput');
    await chatInput.waitFor({ state: 'visible', timeout: 8000 });
    await chatInput.fill('Ananya Sharma');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(800);

    // Assistant asks for email
    await chatInput.fill('ananya.sharma@example.com');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(800);

    // Assistant asks for mobile number
    await chatInput.fill('+91 98765 43210');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(800);

    // Assistant asks for message
    await chatInput.fill('Looking for bridal trousseau consultation for upcoming wedding in December.');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1500);

    // Verify completion message
    const completedMsg = page.locator('text=Thank you for contacting PraashiBySupal');
    await completedMsg.waitFor({ state: 'visible', timeout: 6000 });
    assert(await completedMsg.isVisible(), 'Concierge enquiry submitted and success message shown');

    // Verify direct database entry in SQLite
    const enquiryRow = db.prepare('SELECT * FROM enquiries WHERE email = ? ORDER BY created_at DESC LIMIT 1').get('ananya.sharma@example.com');
    assert(!!enquiryRow, 'Enquiry record saved in SQLite database', `ID: ${enquiryRow?.id}, Source: ${enquiryRow?.source}`);
    assert(enquiryRow?.source === 'CHATBOT', 'Enquiry source correctly marked as CHATBOT');
    assert(enquiryRow?.status === 'NEW', 'Enquiry status initialized as NEW');

    // ----------------------------------------------------
    // TEST A & B: Complete Checkout Journey & Razorpay Payment
    // ----------------------------------------------------
    console.log('\n--- Running Test A: Complete Checkout Journey & Customer Auth ---');
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    // Open cart drawer
    const bagBtn = page.locator('button[aria-label*="Shopping bag containing"]').first();
    await bagBtn.click();
    await page.waitForTimeout(600);

    // Click Proceed to Checkout
    const checkoutDrawerBtn = page.locator('button:has-text("Proceed to Checkout")');
    await checkoutDrawerBtn.click();
    await page.waitForTimeout(600);

    // Auth modal should open since not logged in
    const authModal = page.locator('text=Praashi Patron Account');
    const authVisible = await authModal.isVisible();
    assert(authVisible, 'Customer authentication modal triggered before checkout');

    // Switch to Register Patron
    const signUpToggle = page.locator('button:has-text("New to Praashi? Create a patron account")');
    if (await signUpToggle.isVisible()) {
      await signUpToggle.click();
      await page.waitForTimeout(300);
    }

    const testEmail = `patron_${Date.now()}@example.com`;
    await page.locator('input[placeholder="e.g. Aarohi Mehta"]').fill('Pooja Mehta');
    await page.locator('input[placeholder="you@example.com"]').fill(testEmail);
    await page.locator('input[placeholder="+91 98200 00000"]').fill('+91 98200 11223');
    await page.locator('input[placeholder="At least 6 characters"]').fill('SecretPass123!');

    // Submit registration
    await page.locator('button:has-text("Create Account & Continue")').click();
    await page.waitForTimeout(1000);

    // Should navigate to /checkout
    await page.waitForURL('**/checkout', { timeout: 8000 });
    assert(page.url().includes('/checkout'), 'Navigated to /checkout after successful authentication');

    // Fill delivery address
    await page.locator('#phone').fill('+91 98200 11223');
    await page.locator('#addressLine').fill('Flat 402, Royal Palms, Altamount Road');
    await page.locator('#city').fill('Mumbai');
    await page.locator('#pinCode').fill('400026');

    // Click Place Order & Continue to Payment
    const proceedPaymentBtn = page.locator('button:has-text("Place Order & Continue to Payment")');
    await proceedPaymentBtn.click();
    await page.waitForTimeout(1200);

    // Razorpay Dialog should open
    const razorpayModal = page.locator('text=Razorpay Secure Checkout');
    await razorpayModal.waitFor({ state: 'visible', timeout: 5000 });
    assert(await razorpayModal.isVisible(), 'Razorpay payment simulation modal displayed');

    // ----------------------------------------------------
    // TEST B: Razorpay Payment Simulation & Confirmation
    // ----------------------------------------------------
    console.log('\n--- Running Test B: Razorpay Payment Simulation & Confirmation ---');
    const paySuccessBtn = page.locator('button:has-text("Complete Test Payment (Simulate Success)")');
    await paySuccessBtn.click();
    await page.waitForTimeout(1500);

    // Verify Order Confirmation View
    const confirmationHdr = page.locator('text=Payment Verified · Order Confirmed');
    await confirmationHdr.waitFor({ state: 'visible', timeout: 8000 });
    assert(await confirmationHdr.isVisible(), 'Order confirmation page displayed with celebratory banner');

    // Check confirmed order in database
    const dbOrder = db.prepare('SELECT * FROM orders WHERE customer_email = ? ORDER BY created_at DESC LIMIT 1').get(testEmail);
    assert(!!dbOrder, 'Order recorded in SQLite database', `Order No: ${dbOrder?.order_number}, Amount: ₹${dbOrder?.total_amount}`);
    assert(dbOrder?.payment_status === 'SUCCESS', 'Order payment status is SUCCESS in database');
    assert(dbOrder?.order_status === 'CONFIRMED', 'Order status is CONFIRMED in database');
    assert(dbOrder?.order_number.startsWith('PB-2026-'), 'Order has unique PB-2026-XXXX order number format');

    // ----------------------------------------------------
    // TEST E: Checkout Form Validation
    // ----------------------------------------------------
    console.log('\n--- Running Test E: Checkout Form Validation ---');
    // Add item back to cart to test validation
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    const addBtn = page.locator('button[aria-label="Add to shopping bag"]').first();
    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click();
    await page.waitForTimeout(800);

    // Proceed to checkout from drawer
    const checkoutDrawerBtn2 = page.locator('button:has-text("Proceed to Checkout")');
    await checkoutDrawerBtn2.waitFor({ state: 'visible', timeout: 5000 });
    await checkoutDrawerBtn2.click();
    await page.waitForTimeout(1000);

    // Wait for checkout page
    await page.waitForURL('**/checkout', { timeout: 8000 });
    const addressInput = page.locator('#addressLine');
    await addressInput.waitFor({ state: 'visible', timeout: 5000 });

    // Fill valid phone & city to specifically isolate missing address validation
    await page.locator('#phone').fill('+91 98200 11223');
    await page.locator('#city').fill('Mumbai');
    await page.locator('#pinCode').fill('400026');

    // Clear delivery address to provoke validation error
    await addressInput.fill('');
    await page.locator('button:has-text("Place Order & Continue to Payment")').click();
    await page.waitForTimeout(800);

    const errorAlert = page.locator('text=Please complete your full delivery street address and PIN code');
    assert(await errorAlert.isVisible(), 'Server / client validation error correctly prevents empty checkout');

    // ----------------------------------------------------
    // TEST F: Payment Failure Simulation
    // ----------------------------------------------------
    console.log('\n--- Running Test F: Payment Failure Simulation ---');
    await page.locator('#phone').fill('+91 98200 11223');
    await page.locator('#addressLine').fill('Villa 12, Golden Meadows, Bandra West');
    await page.locator('#city').fill('Mumbai');
    await page.locator('#pinCode').fill('400050');
    await page.locator('button:has-text("Place Order & Continue to Payment")').click();

    const razorpayModal2 = page.locator('text=Razorpay Secure Checkout');
    await razorpayModal2.waitFor({ state: 'visible', timeout: 8000 });

    const payFailBtn = page.locator('button:has-text("Simulate Payment Failure")');
    await payFailBtn.click();
    await page.waitForTimeout(1000);

    // Verify failure banner is displayed and not confirmation
    const failureBanner = page.locator('text=Payment transaction failed or was cancelled');
    assert(await failureBanner.isVisible(), 'Payment failure banner displayed correctly');
    const orderNotConfirmed = !(await page.locator('text=Payment Verified · Order Confirmed').isVisible());
    assert(orderNotConfirmed, 'Order NOT falsely confirmed upon payment failure');

    // ----------------------------------------------------
    // TEST D: Admin Dashboard — Enquiries & Orders Management
    // ----------------------------------------------------
    console.log('\n--- Running Test D: Admin Dashboard Management & Persistence ---');
    await page.goto(`${baseUrl}/admin/login`, { waitUntil: 'networkidle' });

    // Fill Admin credentials
    await page.locator('input[type="email"]').fill('admin@praashibysupal.com');
    await page.locator('input[type="password"]').fill('Praashi@Admin2026!');
    await page.locator('button:has-text("Sign In to Atelier")').click();
    await page.waitForTimeout(1000);

    // Verify Admin Layout
    const adminHdr = page.locator('text=Welcome Back, Supal');
    await adminHdr.waitFor({ state: 'visible', timeout: 8000 });
    assert(await adminHdr.isVisible(), 'Admin dashboard loaded successfully');

    // Navigate to Enquiries section
    const enquiriesNav = page.locator('button:has-text("Enquiries")').first();
    await enquiriesNav.click();
    await page.waitForTimeout(800);

    // Verify the Chatbot enquiry from Ananya Sharma is listed
    const ananyaRow = page.locator('text=Ananya Sharma').first();
    assert(await ananyaRow.isVisible(), 'Chatbot enquiry by Ananya Sharma appears in Admin Enquiries module');

    // Update status in Admin UI
    const statusSelect = page.locator('tr:has-text("Ananya Sharma") select').first();
    await statusSelect.selectOption('CONTACTED');
    await page.waitForTimeout(1000);

    // Verify persistence in SQLite
    const updatedEnquiry = db.prepare('SELECT status FROM enquiries WHERE customer_name = ? AND status = ?').get('Ananya Sharma', 'CONTACTED');
    assert(updatedEnquiry?.status === 'CONTACTED', 'Enquiry status update persisted in SQLite database as CONTACTED');

    // Navigate to Orders section
    const ordersNav = page.locator('button:has-text("Orders")').first();
    await ordersNav.click();
    await page.waitForTimeout(800);

    // Verify confirmed order from Pooja Mehta is listed
    const poojaRow = page.locator('text=Pooja Mehta').first();
    assert(await poojaRow.isVisible(), 'Customer order by Pooja Mehta appears in Admin Orders module');

    // Update Order workflow status to SHIPPED
    const orderStatusSelect = page.locator('tr:has-text("Pooja Mehta") select').first();
    await orderStatusSelect.selectOption('SHIPPED');
    await page.waitForTimeout(1000);

    // Verify persistence in SQLite
    const updatedOrder = db.prepare('SELECT order_status FROM orders WHERE customer_name = ? AND order_status = ?').get('Pooja Mehta', 'SHIPPED');
    assert(updatedOrder?.order_status === 'SHIPPED', 'Order status update persisted in SQLite database as SHIPPED');

    console.log('\n====================================================');
    console.log(`TEST RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`);
    console.log('====================================================\n');

  } catch (err) {
    console.error('Fatal error during test run:', err);
    failedCount++;
  } finally {
    await browser.close();
  }

  process.exit(failedCount > 0 ? 1 : 0);
}

runTestSuite();
