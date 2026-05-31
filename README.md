# Inventory Management System

A production-ready inventory management application built with Next.js 15, TypeScript, MongoDB Atlas, Mongoose, Tailwind CSS, and Shadcn UI.

## Tech Stack

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Shadcn UI
- **State & Forms:** TanStack Query, React Hook Form, Zod
- **Backend:** Next.js API Routes, JWT Authentication
- **Database:** MongoDB Atlas, Mongoose

## Prerequisites

- Node.js 20+
- npm
- MongoDB Atlas cluster ([create free cluster](https://www.mongodb.com/cloud/atlas/register))

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and update values:

```bash
copy .env.example .env.local
```

Edit `.env.local`:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT signing (use a long random string) |
| `NEXT_PUBLIC_APP_URL` | App URL (default: `http://localhost:3000`) |
| `JWT_EXPIRES_IN` | Token expiry (default: `7d`) |

**MongoDB Atlas setup:**

1. Create a cluster at [MongoDB Atlas](https://cloud.mongodb.com)
2. Database Access → Add a database user
3. Network Access → Add your IP (or `0.0.0.0/0` for development)
4. Connect → Drivers → copy connection string
5. Replace `<password>` and set database name to `inventory`

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Verify database connection

```bash
curl http://localhost:3000/api/health
```

Expected response when MongoDB is configured:

```json
{
  "success": true,
  "message": "Inventory Management System API is healthy",
  "database": "connected"
}
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages & API routes
├── components/       # React components (UI + feature)
├── hooks/            # Custom React hooks
├── lib/              # Core utilities (db, env, auth helpers)
├── models/           # Mongoose schemas
├── repositories/     # Data access layer
├── services/         # Business logic
├── types/            # Shared TypeScript types
├── utils/            # Constants & helpers
└── validators/       # Zod validation schemas
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed database (Phase 2+) |

## Development Phases

- [x] **Phase 1:** Project setup, dependencies, MongoDB config, folder structure
- [ ] **Phase 2:** Database models & authentication
- [ ] **Phase 3:** Dashboard
- [ ] **Phase 4:** Product management
- [ ] **Phase 5:** Suppliers
- [ ] **Phase 6:** Purchases
- [ ] **Phase 7:** Sales
- [ ] **Phase 8:** Inventory management
- [ ] **Phase 9:** Reports
- [ ] **Phase 10:** Final optimization

## License

Private — All rights reserved.
