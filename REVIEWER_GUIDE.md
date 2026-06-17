# FinSight AI — Reviewer Guide

> **Estimated Time to Evaluate: 5–10 minutes**
> This guide is designed for EdgeFleet.AI engineering reviewers to quickly and completely evaluate the FinSight AI platform.

---

## 🔐 Step 1 — Instant Login with Demo Account

Navigate to: **[http://localhost:3000/login](http://localhost:3000/login)**

The login page includes a **Demo Account panel** with:
- A **"Use Demo Account"** button that auto-fills credentials with one click
- Individual **Copy Email** / **Copy Password** buttons

| Field    | Value               |
|:---------|:--------------------|
| Email    | `test@finsight.ai`  |
| Password | `Test@123456`       |

> This account is pre-seeded with 35+ realistic transactions, 5 budget configurations, and full analytics data across April–June 2026.

---

## 📊 Step 2 — Dashboard

URL: **[http://localhost:3000/](http://localhost:3000/)**

**What to evaluate:**
- ✅ **Stats Cards** — Total Income, Total Expenses, Net Savings (with month-over-month % change)
- ✅ **AI Financial Summary** — Auto-generated insights widget (click "Ask AI Advisor" to trigger)
- ✅ **Monthly Income vs Expense Chart** — 30-day trend visualization (lazy-loaded Recharts)
- ✅ **Category Distribution Donut Chart** — Spending breakdown by category
- ✅ **Budget Progress List** — Live spend-vs-limit tracking
- ✅ **Recent Transactions** — Last 5 entries with amounts and dates
- ✅ **Skeleton loaders** appear while data fetches, no blank screens

---

## 💳 Step 3 — Transactions

URL: **[http://localhost:3000/transactions](http://localhost:3000/transactions)**

**What to evaluate:**
- ✅ Paginated transactions table (35+ entries across 3 months)
- ✅ Filters: search by date range, category, transaction type (income/expense)
- ✅ Create new transaction via **"Add Transaction"** button
- ✅ Inline edit and delete with confirm dialog
- ✅ CSV export button (downloads all filtered transactions)
- ✅ Pagination controls

---

## 🎯 Step 4 — Budgets

URL: **[http://localhost:3000/budgets](http://localhost:3000/budgets)**

**What to evaluate:**
- ✅ 5 pre-configured budgets: Groceries ($500), Dining Out ($300), Transport ($200), Utilities ($150), Entertainment ($250)
- ✅ Each budget card shows: category name, limit amount, spent amount, and % progress bar
- ✅ Budget status color coding (green → yellow → red as limits are approached)
- ✅ Create, edit, and delete budget configurations
- ✅ Budget period is displayed (April 1 – June 30, 2026)

---

## 🤖 Step 5 — AI Chat

URL: **[http://localhost:3000/chat](http://localhost:3000/chat)**

**What to evaluate:**
- ✅ **Groq AI** (Llama-3.3-70b) powered chat assistant
- ✅ Suggested question prompts to get started immediately:
  - *"How much did I spend this month?"*
  - *"Am I on track for my groceries budget?"*
  - *"What was my largest expense recently?"*
- ✅ Full conversation history in the session
- ✅ Typing indicator animation while AI responds
- ✅ AI uses your actual transaction and budget data for contextual answers
- ✅ PII-safe: no names/emails are sent to the AI model

---

## ⚙️ Step 6 — Settings

URL: **[http://localhost:3000/settings](http://localhost:3000/settings)**

**What to evaluate:**
- ✅ Profile update form (name, email)
- ✅ Dark/Light theme toggle (persisted across sessions)
- ✅ Form validation with error feedback

---

## 📡 Step 7 — Swagger API Docs

URL: **[http://localhost:5000/api/docs](http://localhost:5000/api/docs)**

**What to evaluate:**
- ✅ All REST endpoints are documented with request/response schemas
- ✅ Routes: `/api/v1/auth`, `/api/v1/transactions`, `/api/v1/budgets`, `/api/v1/analytics`, `/api/v1/ai`
- ✅ Health check: `GET /api/health`
- ✅ Interactive — you can execute API calls directly from the UI
- ✅ Authentication: use the login endpoint to get a JWT token, then click "Authorize"

---

## 🏗️ Step 8 — Architecture Review

### Tech Stack
| Layer | Technology |
|:---|:---|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| State Management | Zustand (client), TanStack React Query v5 (server) |
| Charts | Recharts (lazy-loaded via `next/dynamic`) |
| Backend | Node.js, Express.js, TypeScript |
| Database | PostgreSQL 16 (Docker), Prisma ORM |
| AI Engine | Groq API — Llama-3.3-70b-versatile |
| Auth | JWT (15m access tokens), bcryptjs (10 salt rounds) |
| API Docs | OpenAPI/Swagger at `/api/docs` |
| Security | Rate limiting, CORS, Zod request validation |

### Key Architecture Decisions
1. **Clean/Layered Backend Architecture** — Repository pattern separates DB queries from business logic
2. **ChatGPT-style Sidebar** — 72px collapsed / 260px expanded with Zustand state, smooth CSS transitions, and mobile slide-over drawer
3. **Progressive Dashboard Loading** — Each section renders independently with skeleton loaders; no blocked rendering waiting for all APIs
4. **Dynamic Chart Imports** — Recharts (~200KB) is deferred until needed via `next/dynamic`
5. **Per-query staleTime caching** — Categories cached 24h, analytics 30s, transactions 30s

### Project Structure
```
FinSight AI/
├── backend/          # Express + TypeScript + Prisma
│   ├── prisma/       # Schema + seed script
│   └── src/
│       ├── config/   # Swagger, env, Prisma connection
│       ├── middlewares/ # Auth, error, rate-limit
│       └── modules/  # auth, transactions, budgets, analytics, ai
├── frontend/         # Next.js 14 App Router
│   └── src/
│       ├── app/      # (auth)/, (dashboard)/ routes
│       ├── components/ # dashboard/, transactions/, budgets/, chat/, layout/, shared/
│       ├── hooks/    # useAuth, useTransactions, useBudgets, useAnalytics, useAI
│       ├── services/ # Axios API service layer
│       ├── store/    # Zustand stores
│       └── types/    # Shared TypeScript interfaces
├── docker-compose.yml # PostgreSQL container (port 5433)
├── README.md
├── REPORT.md         # Technical Architecture Report
└── CAREER.md         # Portfolio integration guide
```

---

## 🚀 Quick Local Setup (If Not Already Running)

```bash
# 1. Start PostgreSQL via Docker
docker compose up -d

# 2. Backend
cd backend
npm install
npx prisma db push
npx ts-node prisma/seed.ts   # Seeds demo account + sample data
npm run dev                  # Starts at http://localhost:5000

# 3. Frontend (new terminal)
cd frontend
npm install
npm run dev                  # Starts at http://localhost:3000
```

**Environment variables:** Copy `backend/.env.example` to `backend/.env` and set your `GROQ_API_KEY` from [console.groq.com](https://console.groq.com).

---

## ✅ Evaluation Checklist

| Feature | Status |
|:---|:---:|
| Login with demo credentials | ✅ |
| Dashboard analytics cards | ✅ |
| AI financial summary | ✅ |
| Interactive charts (monthly + donut) | ✅ |
| Budget progress tracking | ✅ |
| Transaction CRUD (create, edit, delete) | ✅ |
| Transaction filters + pagination | ✅ |
| CSV export | ✅ |
| Budget CRUD | ✅ |
| Groq AI Chat with context | ✅ |
| Settings profile update | ✅ |
| Dark/Light theme | ✅ |
| Swagger API documentation | ✅ |
| JWT authentication | ✅ |
| Rate limiting | ✅ |
| Mobile responsive (try resizing browser) | ✅ |
| ChatGPT-style collapsible sidebar | ✅ |
| Skeleton loading states | ✅ |
| Docker PostgreSQL | ✅ |
| Prisma ORM + Migrations | ✅ |
