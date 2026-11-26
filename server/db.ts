import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import crypto from 'node:crypto';
import { INITIAL_PRODUCTS } from '../src/config/defaultData';

const DB_PATH = path.resolve(process.cwd(), 'praashi.db');
export const db = new DatabaseSync(DB_PATH);

// Enable foreign keys and WAL mode for reliability
db.exec('PRAGMA foreign_keys = ON;');
db.exec('PRAGMA journal_mode = WAL;');

// Initialize Schema
export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'CUSTOMER',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS customer_profiles (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      phone TEXT,
      city TEXT,
      tier TEXT NOT NULL DEFAULT 'Patron',
      notes TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS addresses (
      id TEXT PRIMARY KEY,
      customer_id TEXT NOT NULL,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      address_line TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      pin_code TEXT NOT NULL,
      country TEXT NOT NULL DEFAULT 'India',
      is_default INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      metal_type TEXT NOT NULL,
      price REAL NOT NULL,
      original_price REAL,
      karat TEXT,
      weight TEXT,
      image TEXT NOT NULL,
      badge TEXT,
      description TEXT NOT NULL,
      in_stock INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      order_number TEXT UNIQUE NOT NULL,
      customer_id TEXT,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      address_line TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      pin_code TEXT NOT NULL,
      country TEXT NOT NULL DEFAULT 'India',
      subtotal REAL NOT NULL,
      shipping_charges REAL NOT NULL DEFAULT 0,
      total_amount REAL NOT NULL,
      payment_status TEXT NOT NULL DEFAULT 'PENDING',
      order_status TEXT NOT NULL DEFAULT 'PENDING',
      payment_reference TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id TEXT PRIMARY KEY,
      order_id TEXT NOT NULL,
      product_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      image TEXT NOT NULL,
      category TEXT NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );

    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY,
      order_id TEXT NOT NULL,
      amount REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'PENDING',
      payment_method TEXT NOT NULL DEFAULT 'Razorpay',
      transaction_ref TEXT,
      signature TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id TEXT PRIMARY KEY,
      customer_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      enquiry_type TEXT NOT NULL,
      product_interest TEXT,
      message TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'CHATBOT',
      status TEXT NOT NULL DEFAULT 'NEW',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // Seed default products if empty
  const countStmt = db.prepare('SELECT COUNT(*) as count FROM products');
  const result = countStmt.get() as { count: number };
  if (result.count === 0) {
    const insertProd = db.prepare(`
      INSERT INTO products (id, name, category, metal_type, price, original_price, karat, weight, image, badge, description, in_stock)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const p of INITIAL_PRODUCTS) {
      insertProd.run(
        p.id,
        p.name,
        p.category,
        p.metalType,
        p.price,
        p.originalPrice || null,
        p.karat || null,
        p.weight || null,
        p.image,
        p.badge || null,
        p.description,
        p.inStock ? 1 : 0
      );
    }
  }

  // Seed default admin and sample customer user if not exists
  const adminEmail = (process.env.VITE_ADMIN_EMAIL || 'admin@praashibysupal.com').toLowerCase();
  const checkAdmin = db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail);
  if (!checkAdmin) {
    const adminPass = process.env.VITE_ADMIN_PASSWORD || 'Praashi@Admin2026!';
    const hash = hashPassword(adminPass);
    const adminId = 'USR-ADMIN-01';
    db.prepare(`
      INSERT INTO users (id, email, password_hash, name, role)
      VALUES (?, ?, ?, ?, 'ADMIN')
    `).run(adminId, adminEmail, hash, 'Supal · Atelier Director');
  }

  // Seed sample demo customer
  const checkCustomer = db.prepare('SELECT id FROM users WHERE email = ?').get('customer@praashibysupal.com');
  if (!checkCustomer) {
    const custId = 'USR-DEMO-01';
    const hash = hashPassword('Customer@123');
    db.prepare(`
      INSERT INTO users (id, email, password_hash, name, role)
      VALUES (?, ?, ?, ?, 'CUSTOMER')
    `).run(custId, 'customer@praashibysupal.com', hash, 'Aarohi Mehta');

    db.prepare(`
      INSERT INTO customer_profiles (id, user_id, phone, city, tier, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run('PROF-DEMO-01', custId, '+91 98201 44521', 'Mumbai', 'Heirloom Member', 'VIP client');
  }
}

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}
