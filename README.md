# Praashi by Supal — Luxury Jewellery E-Commerce & Atelier Control

> A high-jewellery e-commerce platform inspired by the visual storytelling of India's royal ateliers, complete with custom horizontal category navigation, a conversational concierge chatbot, database-backed enquiry and order fulfillment management, and a complete end-to-end checkout system with Razorpay integration.

---

## ✨ Features

### 👑 Customer Storefront
- **Horizontal Category Navigation**: Sticky navigation bar directly below the main search bar with custom iconography, overflow scrolling, and smooth filtering (All Jewellery, Gold, Diamond, Earrings, Daily Wear, Necklaces, Rings, Bracelets, Bangles).
- **Cinematic Hero Slider**: Seamless auto-advancing slides with high-resolution campaign assets and two action triggers (*Explore Collection* and *Book Atelier Consultation*).
- **Interactive Jewellery Concierge**: Predefined conversational assistant widget featuring a welcoming Namaste avatar, multi-step enquiry collection, and live SQLite database storage.
- **End-to-End Checkout Experience**:
  - Shopping Bag Drawer with live subtotal and complimentary insured shipping calculation.
  - Patron Account Authentication (Sign In & Register modal with cart persistence).
  - Dedicated `/checkout` route with insured delivery address capture and order breakdown.
  - Razorpay payment simulation dialog (supports test success and failure handling).
  - Celebratory order confirmation receipt with unique `PB-2026-XXXX` order numbers.

### 🛡️ Protected Admin Atelier Control (`/admin/login`)
- **Dashboard Overview**: Key performance indicators (Total Revenue, Pending Orders, Patron Enquiries, Bullion Rates).
- **Enquiry Management**: Real-time enquiry records with status updates (`NEW`, `CONTACTED`, `RESOLVED`), source origin tags (`CHATBOT` vs `CONTACT_FORM`), customer search, date filtering, and detailed inspection modal.
- **Order Management & Fulfillment**: Real-time database orders with itemized breakdowns, client contact info, delivery address, payment status (`PENDING`, `SUCCESS`, `FAILED`), and order workflow status updates (`PENDING` $\rightarrow$ `CONFIRMED` $\rightarrow$ `PROCESSING` $\rightarrow$ `SHIPPED` $\rightarrow$ `DELIVERED`).
- **Product & Content Management**: Catalogue editor, category organizers, and promotional banner management.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Backend & API**: Vite API middleware (`server/api.ts`) with native Node 24 SQLite (`node:sqlite`)
- **Database**: SQLite (`praashi.db`) in WAL mode with relational models (`users`, `customer_profiles`, `products`, `orders`, `order_items`, `payments`, `enquiries`)
- **Testing**: Playwright automated end-to-end test suite (`tests/suite.js`)

---

## 🚀 Getting Started

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/tirth-patel29/praashi-jewels.git
cd praashi-jewels

# Install dependencies
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory (refer to `.env.example`):
```env
VITE_ADMIN_EMAIL=admin@praashibysupal.com
VITE_ADMIN_PASSWORD=Praashi@Admin2026!
VITE_STORE_NAME="Praashi by Supal"
```

### 3. Development Server
```bash
npm run dev
```
Open `http://localhost:5173` to explore the storefront or visit `http://localhost:5173/admin/login` for the admin portal.

### 4. Build for Production
```bash
npm run build
npm run preview
```

### 5. Automated E2E Tests
```bash
node tests/suite.js
```

---

## 🔒 Security & Privacy
- Sensitive `.env` files, private credentials, and SQLite local database files (`*.db`, `*-wal`, `*-shm`) are excluded from version control via `.gitignore`.
- Passwords are encrypted server-side using SHA-256 with cryptographically generated salts.
- Order amounts and product prices are strictly verified against the database; client-side price totals are never trusted.

---

## 📄 License
Private & Proprietary — Developed for **Praashi by Supal**.
