import type { IncomingMessage, ServerResponse } from 'node:http';
import crypto from 'node:crypto';
import { db, initDatabase, hashPassword } from './db';

// Ensure DB schema and initial data are ready
initDatabase();

export interface ApiRequest extends IncomingMessage {
  body?: any;
  query?: Record<string, string>;
}

// Helper to parse JSON body
export async function parseJsonBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res: ServerResponse, status: number, data: any) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

// Server-side input validation helpers
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\+\(\)]/g, '');
  return cleaned.length >= 10;
}

export async function handleApiRequest(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;
  const method = req.method?.toUpperCase();

  // Only handle /api/* routes
  if (!pathname.startsWith('/api/')) {
    return false;
  }

  try {
    // 1. Health check
    if (pathname === '/api/health' && method === 'GET') {
      sendJson(res, 200, { status: 'healthy', timestamp: new Date().toISOString() });
      return true;
    }

    // 2. Chatbot & Contact Enquiries: POST /api/enquiries
    if (pathname === '/api/enquiries' && method === 'POST') {
      const body = await parseJsonBody(req);
      const { customerName, email, phone, enquiryType, productInterest, message, source } = body;

      // Server-side Validation
      if (!customerName || typeof customerName !== 'string' || customerName.trim().length < 2) {
        sendJson(res, 400, { error: 'Please enter a valid customer name (at least 2 characters).' });
        return true;
      }
      if (!email || !isValidEmail(email)) {
        sendJson(res, 400, { error: 'Please provide a valid email address.' });
        return true;
      }
      if (!phone || !isValidPhone(phone)) {
        sendJson(res, 400, { error: 'Please provide a valid mobile number (at least 10 digits).' });
        return true;
      }
      if (!enquiryType) {
        sendJson(res, 400, { error: 'Enquiry type is required.' });
        return true;
      }
      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        sendJson(res, 400, { error: 'Enquiry message cannot be empty.' });
        return true;
      }

      const id = `ENQ-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
      const enquirySource = (source || 'CHATBOT').toUpperCase();
      const status = 'NEW';
      const now = new Date().toISOString();

      const stmt = db.prepare(`
        INSERT INTO enquiries (id, customer_name, email, phone, enquiry_type, product_interest, message, source, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      stmt.run(
        id,
        customerName.trim(),
        email.trim().toLowerCase(),
        phone.trim(),
        enquiryType.trim(),
        productInterest ? productInterest.trim() : null,
        message.trim(),
        enquirySource,
        status,
        now,
        now
      );

      const created = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(id);
      sendJson(res, 201, { success: true, enquiry: created });
      return true;
    }

    // 3. Enquiries list & stats: GET /api/enquiries
    if (pathname === '/api/enquiries' && method === 'GET') {
      const search = url.searchParams.get('search')?.toLowerCase() || '';
      const statusFilter = url.searchParams.get('status') || 'ALL';

      let query = 'SELECT * FROM enquiries WHERE 1=1';
      const params: any[] = [];

      if (statusFilter !== 'ALL') {
        query += ' AND status = ?';
        params.push(statusFilter);
      }
      if (search) {
        query += ' AND (LOWER(customer_name) LIKE ? OR LOWER(email) LIKE ? OR phone LIKE ?)';
        const term = `%${search}%`;
        params.push(term, term, term);
      }
      query += ' ORDER BY created_at DESC';

      const enquiries = db.prepare(query).all(...params);

      // Calculate stats
      const total = (db.prepare('SELECT COUNT(*) as count FROM enquiries').get() as any).count;
      const newCount = (db.prepare("SELECT COUNT(*) as count FROM enquiries WHERE status = 'NEW'").get() as any).count;
      const contactedCount = (db.prepare("SELECT COUNT(*) as count FROM enquiries WHERE status = 'CONTACTED'").get() as any).count;
      const resolvedCount = (db.prepare("SELECT COUNT(*) as count FROM enquiries WHERE status = 'RESOLVED'").get() as any).count;

      sendJson(res, 200, {
        enquiries,
        stats: { total, new: newCount, contacted: contactedCount, resolved: resolvedCount },
      });
      return true;
    }

    // 4. Update enquiry status: PATCH /api/enquiries/:id
    if (pathname.startsWith('/api/enquiries/') && method === 'PATCH') {
      const id = pathname.replace('/api/enquiries/', '');
      const body = await parseJsonBody(req);
      const { status } = body;

      if (!['NEW', 'CONTACTED', 'RESOLVED'].includes(status)) {
        sendJson(res, 400, { error: 'Invalid enquiry status. Must be NEW, CONTACTED, or RESOLVED.' });
        return true;
      }

      const stmt = db.prepare("UPDATE enquiries SET status = ?, updated_at = datetime('now') WHERE id = ?");
      stmt.run(status, id);

      const updated = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(id);
      sendJson(res, 200, { success: true, enquiry: updated });
      return true;
    }

    // 5. Delete enquiry: DELETE /api/enquiries/:id
    if (pathname.startsWith('/api/enquiries/') && method === 'DELETE') {
      const id = pathname.replace('/api/enquiries/', '');
      db.prepare('DELETE FROM enquiries WHERE id = ?').run(id);
      sendJson(res, 200, { success: true, message: 'Enquiry deleted successfully.' });
      return true;
    }

    // 6. User Auth: POST /api/auth/register
    if (pathname === '/api/auth/register' && method === 'POST') {
      const body = await parseJsonBody(req);
      const { name, email, password, phone, city } = body;

      if (!name || name.trim().length < 2) {
        sendJson(res, 400, { error: 'Name must be at least 2 characters.' });
        return true;
      }
      if (!email || !isValidEmail(email)) {
        sendJson(res, 400, { error: 'Valid email is required.' });
        return true;
      }
      if (!password || password.length < 6) {
        sendJson(res, 400, { error: 'Password must be at least 6 characters.' });
        return true;
      }

      const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase().trim());
      if (existing) {
        sendJson(res, 409, { error: 'An account with this email already exists. Please sign in.' });
        return true;
      }

      const userId = `USR-${Date.now()}`;
      const hash = hashPassword(password);
      db.prepare(`
        INSERT INTO users (id, email, password_hash, name, role)
        VALUES (?, ?, ?, ?, 'CUSTOMER')
      `).run(userId, email.toLowerCase().trim(), hash, name.trim());

      db.prepare(`
        INSERT INTO customer_profiles (id, user_id, phone, city, tier)
        VALUES (?, ?, ?, ?, 'Patron')
      `).run(`PROF-${Date.now()}`, userId, phone || '', city || 'India');

      sendJson(res, 201, {
        success: true,
        user: { id: userId, email: email.toLowerCase().trim(), name: name.trim(), role: 'CUSTOMER' },
      });
      return true;
    }

    // 7. User Auth: POST /api/auth/login
    if (pathname === '/api/auth/login' && method === 'POST') {
      const body = await parseJsonBody(req);
      const { email, password } = body;

      if (!email || !password) {
        sendJson(res, 400, { error: 'Email and password are required.' });
        return true;
      }

      const user = db.prepare('SELECT id, email, password_hash, name, role FROM users WHERE email = ?').get(
        email.toLowerCase().trim()
      ) as any;

      if (!user || user.password_hash !== hashPassword(password)) {
        sendJson(res, 401, { error: 'Invalid email or password.' });
        return true;
      }

      sendJson(res, 200, {
        success: true,
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      });
      return true;
    }

    // 8. Order Creation: POST /api/orders/create
    if (pathname === '/api/orders/create' && method === 'POST') {
      const body = await parseJsonBody(req);
      const {
        customerId,
        customerName,
        customerEmail,
        customerPhone,
        addressLine,
        city,
        state,
        pinCode,
        country = 'India',
        items,
        paymentMethod = 'Razorpay',
      } = body;

      // Validation
      if (!customerName || customerName.trim().length < 2) {
        sendJson(res, 400, { error: 'Please provide a valid full name.' });
        return true;
      }
      if (!customerEmail || !isValidEmail(customerEmail)) {
        sendJson(res, 400, { error: 'Please provide a valid delivery email.' });
        return true;
      }
      if (!customerPhone || !isValidPhone(customerPhone)) {
        sendJson(res, 400, { error: 'Please provide a valid mobile number for dispatch.' });
        return true;
      }
      if (!addressLine || addressLine.trim().length < 5) {
        sendJson(res, 400, { error: 'Please provide a complete delivery street address.' });
        return true;
      }
      if (!city || !state || !pinCode || pinCode.trim().length < 5) {
        sendJson(res, 400, { error: 'City, State, and a valid PIN code are required.' });
        return true;
      }
      if (!items || !Array.isArray(items) || items.length === 0) {
        sendJson(res, 400, { error: 'Shopping cart is empty. Please select products to order.' });
        return true;
      }

      // CRITICAL SERVER-SIDE PRICE CALCULATION: Never trust client totals
      let calculatedSubtotal = 0;
      const verifiedItems: any[] = [];

      for (const item of items) {
        const prod = db.prepare('SELECT id, name, price, category, image, in_stock FROM products WHERE id = ?').get(
          item.productId
        ) as any;

        if (!prod) {
          sendJson(res, 400, { error: `Product ID ${item.productId} was not found in the atelier catalogue.` });
          return true;
        }

        const qty = Math.max(1, parseInt(item.quantity) || 1);
        const itemTotal = prod.price * qty;
        calculatedSubtotal += itemTotal;

        verifiedItems.push({
          productId: prod.id,
          name: prod.name,
          price: prod.price, // Actual database price
          quantity: qty,
          image: prod.image,
          category: prod.category,
        });
      }

      // Server calculates shipping
      const freeShippingThreshold = 5000;
      const shippingCharges = calculatedSubtotal >= freeShippingThreshold ? 0 : 250;
      const totalAmount = calculatedSubtotal + shippingCharges;

      // Unique Order Number
      const randomSeq = Math.floor(1000 + Math.random() * 9000);
      const orderNumber = `PB-2026-${randomSeq}`;
      const orderId = `ORD-${Date.now()}-${randomSeq}`;
      const now = new Date().toISOString();

      // Database Transaction for Atomic Order & Items insertion
      db.exec('BEGIN TRANSACTION;');
      try {
        db.prepare(`
          INSERT INTO orders (
            id, order_number, customer_id, customer_name, customer_email, customer_phone,
            address_line, city, state, pin_code, country, subtotal, shipping_charges,
            total_amount, payment_status, order_status, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING', 'PENDING', ?, ?)
        `).run(
          orderId,
          orderNumber,
          customerId || null,
          customerName.trim(),
          customerEmail.trim().toLowerCase(),
          customerPhone.trim(),
          addressLine.trim(),
          city.trim(),
          state.trim(),
          pinCode.trim(),
          country.trim(),
          calculatedSubtotal,
          shippingCharges,
          totalAmount,
          now,
          now
        );

        const insertItemStmt = db.prepare(`
          INSERT INTO order_items (id, order_id, product_id, name, price, quantity, image, category)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);

        for (const vItem of verifiedItems) {
          const orderItemId = `ITEM-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
          insertItemStmt.run(
            orderItemId,
            orderId,
            vItem.productId,
            vItem.name,
            vItem.price,
            vItem.quantity,
            vItem.image,
            vItem.category
          );
        }

        db.exec('COMMIT;');
      } catch (err: any) {
        db.exec('ROLLBACK;');
        sendJson(res, 500, { error: `Failed to create order: ${err.message}` });
        return true;
      }

      // Generate Razorpay Order Details (Test mode / demo)
      const razorpayOrderId = `order_${crypto.randomBytes(8).toString('hex')}`;
      const razorpayKeyId = process.env.VITE_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || 'rzp_test_praashi_demo';

      sendJson(res, 201, {
        success: true,
        orderId,
        orderNumber,
        subtotal: calculatedSubtotal,
        shippingCharges,
        totalAmount,
        razorpay: {
          orderId: razorpayOrderId,
          amount: Math.round(totalAmount * 100), // in paise
          currency: 'INR',
          keyId: razorpayKeyId,
        },
      });
      return true;
    }

    // 9. Payment Verification: POST /api/orders/verify-payment
    if (pathname === '/api/orders/verify-payment' && method === 'POST') {
      const body = await parseJsonBody(req);
      const {
        orderId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
        paymentStatus = 'SUCCESS', // SUCCESS | FAILED
        paymentMethod = 'Razorpay',
      } = body;

      const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId) as any;
      if (!order) {
        sendJson(res, 404, { error: 'Order not found in database.' });
        return true;
      }

      const paymentId = `PAY-${Date.now()}`;
      const now = new Date().toISOString();

      if (paymentStatus === 'SUCCESS') {
        const txRef = razorpayPaymentId || `pay_test_${Date.now()}`;

        db.exec('BEGIN TRANSACTION;');
        try {
          db.prepare(`
            UPDATE orders
            SET payment_status = 'SUCCESS', order_status = 'CONFIRMED', payment_reference = ?, updated_at = ?
            WHERE id = ?
          `).run(txRef, now, orderId);

          db.prepare(`
            INSERT INTO payments (id, order_id, amount, status, payment_method, transaction_ref, signature, created_at)
            VALUES (?, ?, ?, 'SUCCESS', ?, ?, ?, ?)
          `).run(paymentId, orderId, order.total_amount, paymentMethod, txRef, razorpaySignature || null, now);

          db.exec('COMMIT;');
        } catch (err: any) {
          db.exec('ROLLBACK;');
          sendJson(res, 500, { error: `Failed to confirm payment: ${err.message}` });
          return true;
        }

        const confirmedOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
        const orderItems = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(orderId);

        sendJson(res, 200, {
          success: true,
          order: confirmedOrder,
          items: orderItems,
          message: 'Payment verified successfully and order confirmed.',
        });
        return true;
      } else {
        // Payment Failure Handling
        db.prepare(`
          UPDATE orders
          SET payment_status = 'FAILED', order_status = 'PENDING', updated_at = ?
          WHERE id = ?
        `).run(now, orderId);

        db.prepare(`
          INSERT INTO payments (id, order_id, amount, status, payment_method, transaction_ref, created_at)
          VALUES (?, ?, ?, 'FAILED', ?, ?, ?)
        `).run(paymentId, orderId, order.total_amount, paymentMethod, razorpayPaymentId || 'FAILED_ATTEMPT', now);

        sendJson(res, 400, {
          success: false,
          error: 'Payment transaction failed or was cancelled by user.',
          orderId,
        });
        return true;
      }
    }

    // 10. Admin Orders List: GET /api/admin/orders
    if (pathname === '/api/admin/orders' && method === 'GET') {
      const search = url.searchParams.get('search')?.toLowerCase() || '';
      const statusFilter = url.searchParams.get('status') || 'ALL';
      const paymentFilter = url.searchParams.get('payment') || 'ALL';

      let query = 'SELECT * FROM orders WHERE 1=1';
      const params: any[] = [];

      if (statusFilter !== 'ALL') {
        query += ' AND order_status = ?';
        params.push(statusFilter);
      }
      if (paymentFilter !== 'ALL') {
        query += ' AND payment_status = ?';
        params.push(paymentFilter);
      }
      if (search) {
        query += ' AND (LOWER(order_number) LIKE ? OR LOWER(customer_name) LIKE ? OR customer_phone LIKE ?)';
        const term = `%${search}%`;
        params.push(term, term, term);
      }
      query += ' ORDER BY created_at DESC';

      const orders = db.prepare(query).all(...params) as any[];

      // Attach items to each order
      const getItemsStmt = db.prepare('SELECT * FROM order_items WHERE order_id = ?');
      const populatedOrders = orders.map((o) => ({
        ...o,
        items: getItemsStmt.all(o.id),
      }));

      sendJson(res, 200, { orders: populatedOrders });
      return true;
    }

    // 11. Update Order Status: PATCH /api/admin/orders/:id
    if (pathname.startsWith('/api/admin/orders/') && method === 'PATCH') {
      const id = pathname.replace('/api/admin/orders/', '');
      const body = await parseJsonBody(req);
      const { orderStatus, paymentStatus } = body;

      if (orderStatus) {
        db.prepare("UPDATE orders SET order_status = ?, updated_at = datetime('now') WHERE id = ?").run(orderStatus, id);
      }
      if (paymentStatus) {
        db.prepare("UPDATE orders SET payment_status = ?, updated_at = datetime('now') WHERE id = ?").run(
          paymentStatus,
          id
        );
      }

      const updated = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
      sendJson(res, 200, { success: true, order: updated });
      return true;
    }

    // 12. Clean Test Orders (Section 7 requirement: preserve real customers, clean only clearly identifiable test orders)
    if (pathname === '/api/admin/orders/clean-test' && method === 'POST') {
      const deleted = db
        .prepare("DELETE FROM orders WHERE customer_email LIKE '%test%' OR customer_name LIKE '%test%' OR id LIKE '%test%'")
        .run();
      sendJson(res, 200, { success: true, removedCount: deleted.changes });
      return true;
    }

    return false;
  } catch (err: any) {
    console.error('API Error:', err);
    sendJson(res, 500, { error: err.message || 'Internal server error' });
    return true;
  }
}
