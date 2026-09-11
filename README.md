# UNIKMO Gifting Platform

A secure gifting platform with Stripe Checkout, built with Next.js 14, TypeScript, MongoDB, and Amazon S3.

## Features

- **Stripe Checkout**: Hosted checkout with signed, webhook-based fulfillment
- **Moment Codes**: Unique, encoded codes generated after payment confirmation
- **Media Upload**: Secure direct-to-S3 uploads
- **Recipient Unlock**: Code-based media unlocking with rate limiting
- **Admin Dashboard**: Full-featured admin panel for managing users, orders, and codes

## Tech Stack

- **Framework**: Next.js 14.x (App Router, Node runtime)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4.x
- **Animations**: Framer Motion
- **Database**: MongoDB + Mongoose
- **Media**: Amazon S3
- **Auth**: JWT + bcrypt (admin only)
- **Email**: Nodemailer with SMTP

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Amazon S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=your_bucket

# Stripe (use test-mode values until checkout is verified end to end)
STRIPE_SECRET_KEY=sk_test_replace_me
STRIPE_WEBHOOK_SECRET=whsec_replace_me

# Shopify (temporary fallback and historical-order support during migration)
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_ACCESS_TOKEN=your_access_token
SHOPIFY_WEBHOOK_SECRET=your_webhook_secret
SHOPIFY_API_VERSION=2024-10

# Application
BASE_URL=https://yourdomain.com
JWT_SECRET=your_jwt_secret

# SMTP (Nodemailer)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SMTP_FROM=noreply@yourdomain.com

# Admin Seed
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
```

### 3. Seed Admin User

Create the initial admin user:

```bash
npm run seed:admin
```

### 4. Configure Stripe Webhooks

In Stripe test mode, create a webhook endpoint at `${BASE_URL}/api/webhooks/stripe` and subscribe it to:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`

Copy its signing secret to `STRIPE_WEBHOOK_SECRET`. The Admin → Payments page reports whether the key and webhook secret are configured. Keep the legacy Shopify configuration only until a Stripe test purchase has created the order, generated its Moment Codes, and sent the buyer email.

### 5. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
/app
  /admin              # Admin dashboard pages
    /dashboard        # Overview stats
    /buyers           # Buyers management
    /codes            # Codes management
    /payments         # Stripe connection status
  /upload             # Media upload page
  /unlock             # Recipient unlock page
  /api                # API routes
    /webhooks         # Stripe and legacy Shopify webhook handlers
    /admin            # Admin API endpoints
    /media            # Media upload endpoints
/models               # Mongoose models
/lib                  # Utility functions
/scripts              # Seed and setup scripts
```

## Key Features

### Moment Code Format

Codes are generated in the format: `UNIKMO-XXXX-[Q][D]XX-XXX`

- `UNIKMO` - Fixed prefix
- `XXXX` - 4 random alphanumeric characters
- `Q` - Quantity (1, 4, or 7)
- `D` - Delivery type (D=digital, P=physical, S=split)
- `XX` - 2 random alphanumeric characters
- `XXX` - 3 random alphanumeric characters

Example: `UNIKMO-A7FQ-1D23-XYZ` = 1 Digital

### Stripe Integration

The platform uses Stripe Checkout and signed webhooks to:
1. Create a hosted Checkout Session from the server-owned product catalog
2. Validate the Stripe webhook signature
3. Verify that the Checkout Session is paid
4. Create/find the buyer by email
5. Store the order and payment provider
6. Generate the correct Moment Codes
7. Send the buyer email

The Shopify webhook remains in the repository temporarily for historical-order compatibility and rollback. New storefront and admin-created orders do not require Shopify.

### Media Upload

- Buyers can upload media using their Moment Code
- Files are validated (1GB limit)
- Uploads go to Amazon S3
- Code must be in "new" status (not claimed)

### Recipient Unlock

- Recipients enter the Moment Code
- Rate limiting prevents brute force (5 attempts per minute)
- Media is displayed after successful unlock
- Code status changes to "claimed" on first unlock

### Admin Dashboard

Protected routes requiring admin authentication:
- **Overview**: Revenue, provider mix, recent orders, and buyer/code stats
- **Buyers**: List of buyers with search and sorting
- **Codes**: Code management with filters and actions
- **Media Viewer**: View media for specific codes
- **Payments**: Verify Stripe API and webhook configuration

## API Endpoints

### Public
- `POST /api/checkout` - Create a Stripe Checkout Session
- `POST /api/webhooks/stripe` - Stripe fulfillment webhook
- `POST /api/webhooks/shopify/orders-paid` - Legacy Shopify webhook handler
- `POST /api/unlock` - Unlock media with code
- `GET /api/media/validate-code` - Validate code for upload
- `POST /api/media/upload` - Upload media

### Admin (Protected)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/buyers` - List buyers
- `GET /api/admin/codes` - List codes
- `GET /api/admin/codes/[codeId]` - Get code details
- `PATCH /api/admin/codes` - Update code (revoke/reset)

## Security

- Stripe signature validation for payment webhooks
- JWT authentication for admin routes
- HTTP-only cookies for session management
- Rate limiting on unlock attempts
- Idempotent webhook processing
- Input validation and sanitization

## Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Notes

- The platform uses **Node runtime** (not Edge) for all API routes
- Tailwind CSS **3.4.x** is used (NOT v4)
- All admin routes are protected by middleware
- Buyers do not have login - they access via codes only
- Moment Codes are never emailed to recipients - buyers must share them

## License

Private project - All rights reserved
