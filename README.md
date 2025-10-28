# Next.js E-commerce (Assignment) - Starter

This repository contains a complete Next.js (App Router) e-commerce-style application scaffold in TypeScript, with MongoDB (Mongoose), TailwindCSS, basic JWT auth for admin, and examples of SSG/ISR/SSR/Server Components as required by the assignment.

## Features
- Home page: SSG (static)
- Product detail: ISR (revalidate every 60s)
- Inventory dashboard: SSR (always fresh)
- Admin panel: CSR with CRUD (protected via JWT)
- Server Components example: `/recommendations`
- MongoDB with Mongoose model
- TailwindCSS for styling

## Quick Start

1. Copy `.env.example` to `.env.local` and fill values:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Open http://localhost:3000

## Admin authentication
- Use `POST /api/auth` with JSON body `{ "password": "adminpassword" }` to receive a JWT token.
- Use the token in `Authorization: Bearer <token>` when calling protected API endpoints (POST / PUT).

## Notes
- This starter includes working code for all major pieces. Replace placeholder images and adjust styles as needed.
- The README and REPORT included are ready to edit before submission (change name/date in REPORT.md).

