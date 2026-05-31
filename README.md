# Inventory Management System

Monorepo with separate **frontend** (Next.js) and **backend** (Express + MongoDB) applications.

## Project Structure

```
inventory-management-system/
├── backend/          # Express API, Mongoose, JWT auth
│   └── src/
│       ├── models/
│       ├── repositories/
│       ├── services/
│       ├── controllers/
│       ├── routes/
│       └── scripts/seed.ts
├── frontend/         # Next.js UI (App Router)
│   └── src/
│       ├── app/
│       ├── components/
│       └── hooks/
└── package.json      # Root scripts (run both apps)
```

## Prerequisites

- Node.js 20+
- MongoDB Atlas cluster

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

**`backend/.env.local`**

```env
PORT=5000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-long-random-secret
JWT_EXPIRES_IN=7d
```

**`frontend/.env.local`**

```env
BACKEND_URL=http://localhost:5000
JWT_SECRET=your-long-random-secret
```

`JWT_SECRET` must match on both apps.

### 3. Seed admin user

```bash
npm run seed
```

### 4. Run development

```bash
npm run dev
```

| App      | URL                        |
|----------|----------------------------|
| Frontend | http://localhost:3000      |
| Backend  | http://localhost:5000      |

Frontend proxies `/api/*` → backend (see `frontend/next.config.ts`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start backend + frontend |
| `npm run dev:backend` | Backend only (port 5000) |
| `npm run dev:frontend` | Frontend only (port 3000) |
| `npm run seed` | Seed admin user |
| `npm run build` | Build both apps |

## Default Admin

| Email | Password |
|-------|----------|
| admin@inventory.com | Admin@123 |

## API Endpoints (Backend)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Current user |
| POST | `/api/auth/logout` | Logout |

From the browser, use `http://localhost:3000/api/...` (proxied to backend).
