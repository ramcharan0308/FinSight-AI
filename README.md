# FinSight AI: Enterprise Personal Finance & Intelligence Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![Groq](https://img.shields.io/badge/Groq-f55036?style=flat-square&logo=groq&logoColor=white)](https://groq.com/)

FinSight AI is a production-grade, AI-powered personal finance and expense intelligence platform. It enables users to securely manage transaction ledgers, set budgets, analyze spending trends, and receive custom-tailored financial advice via a Groq AI-powered chat interface and dynamic dashboard summaries.

---

## 🚀 Live Production URLS

* **Frontend Live App:** [https://finsight-ai-nu.vercel.app](https://finsight-ai-nu.vercel.app)
* **Backend Production API Gateway:** [https://finsight-ai-pz69.onrender.com/api/v1](https://finsight-ai-pz69.onrender.com/api/v1)
* **Interactive API Documentation (Swagger):** [https://finsight-ai-pz69.onrender.com/api/docs](https://finsight-ai-pz69.onrender.com/api/docs)
* **Backend API Health Endpoint:** [https://finsight-ai-pz69.onrender.com/api/health](https://finsight-ai-pz69.onrender.com/api/health)

---

## 🔐 Explore Demo Data

Evaluate the application instantly using our pre-configured, data-rich recruiter account:

* **Email:** `test@finsight.ai`
* **Password:** `Test@123456`

This account contains pre-populated, realistic sandboxed data matching the active financial quarter (April–June 2026):
* **3 Registered Users** (Admin, User, Test)
* **11 Core Category Definitions** (Groceries, Salary, Rent, Utilities, Dining Out, Transport, Entertainment, etc.)
* **10 Active Budgets** (Limit configurations & progress tracking metrics)
* **70 Multi-Month Transactions** (Realistic ledger records representing normal personal cashflow)
* **Personalized AI Financial Summary Reports** & chat conversation context

> The login page includes an **"Explore Demo"** card that auto-fills these credentials with a single click.

---

## 1. System Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                          USER WEB BROWSER                              │
│                                                                        │
│  ┌───────────────────────┐   ┌──────────────────────────────────────┐  │
│  │     Client-State      │   │          Server-Synchronized         │  │
│  │   (Zustand Store)     │   │         (React Query Cache)          │  │
│  │  - Theme / UI State   │   │  - Auth User   - Transactions list   │  │
│  │  - Sidebar toggle     │   │  - Active Chat - Budgets metrics     │  │
│  └───────────────────────┘   └──────────────────────────────────────┘  │
│              │                                  │                      │
└──────────────┼──────────────────────────────────┼──────────────────────┘
               │                                  │
               │ HTTP Requests (JSON) / JWT Auth  │
               ▼                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       EXPRESS.JS BACKEND (TS)                          │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                        Presentation Layer                        │  │
│  │  - Route Router Configs         - Request Validations (Zod)      │  │
│  │  - Controllers handlers         - Error / Auth Middlewares       │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                   │                                    │
│                                   ▼                                    │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                        Application Layer                         │  │
│  │  - AuthService                  - TransactionService             │  │
│  │  - BudgetService                - AIService                      │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                   │                                    │
│                                   ▼                                    │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                        Infrastructure Layer                      │  │
│  │  - Prisma ORM Engine Context                                     │  │
│  │  - PrismaRepositories implementations                            │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
                    ▼                                ▼
       ┌─────────────────────────┐      ┌─────────────────────────┐
       │   POSTGRESQL DATABASE   │      │    GROQ AI API ENGINE   │
       │ (User, Transaction, DB) │      │  (Llama-3.3-70b Agent)  │
       └─────────────────────────┘      └─────────────────────────┘
```

---

## 2. Directory Structure

### 2.1 Frontend Structure (Next.js 14 App Router)
```text
frontend/
├── public/
│   ├── favicon.ico
│   └── logo.svg
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx           # Login Screen UI + Demo Account card
│   │   │   ├── register/
│   │   │   │   └── page.tsx           # Registration Screen UI component
│   │   │   └── layout.tsx             # Auth layout template wrapper
│   │   ├── (dashboard)/
│   │   │   ├── page.tsx               # Metrics, Charts, Summary Dashboard (root /)
│   │   │   ├── transactions/
│   │   │   │   └── page.tsx           # Transactions list & CRUD Page
│   │   │   ├── budgets/
│   │   │   │   └── page.tsx           # Budgets configuration panel
│   │   │   ├── chat/
│   │   │   │   └── page.tsx           # Interactive Groq AI Chat Console
│   │   │   ├── settings/
│   │   │   │   └── page.tsx           # Profile & theme settings
│   │   │   └── layout.tsx             # Dashboard Sidebar & Header wrapper
│   │   ├── layout.tsx                 # HTML5 root wrapper, Fonts & Theme provider
│   │   └── providers.tsx              # React Query + Theme providers registry
│   ├── components/
│   │   ├── dashboard/                 # Feature-specific dashboard components
│   │   │   ├── StatsCard.tsx          # Aggregate metric display cards
│   │   │   ├── MonthlyChart.tsx       # Monthly income vs expense chart (Recharts)
│   │   │   ├── CategoryDonutChart.tsx # Category distribution donut chart
│   │   │   ├── BudgetProgressList.tsx # Horizontal budget limit progress bars
│   │   │   ├── RecentTransactions.tsx # Compact transaction list widget
│   │   │   └── AISummaryWidget.tsx    # Auto-generated AI financial summary
│   │   ├── transactions/              # Transaction feature components
│   │   │   ├── TransactionTable.tsx   # Paginated transactions data table
│   │   │   ├── TransactionFilters.tsx # Date/type/category filter controls
│   │   │   ├── TransactionModal.tsx   # Create/edit modal dialog wrapper
│   │   │   ├── TransactionForm.tsx    # Income/expense entry form fields
│   │   │   └── CSVExportButton.tsx    # CSV download export functionality
│   │   ├── budgets/                   # Budget feature components
│   │   │   ├── BudgetCard.tsx         # Individual budget configuration card
│   │   │   ├── BudgetModal.tsx        # Create/edit modal dialog wrapper
│   │   │   ├── BudgetForm.tsx         # Budget entry form fields
│   │   │   └── BudgetProgressBar.tsx  # Visual spend vs limit progress bar
│   │   ├── chat/                      # AI Chat feature components
│   │   │   ├── ChatWindow.tsx         # Message thread display container
│   │   │   ├── ChatMessage.tsx        # Individual user/AI message bubble
│   │   │   ├── ChatInput.tsx          # Message input with send button
│   │   │   ├── SuggestedQuestions.tsx # Clickable prompt suggestions
│   │   │   └── TypingIndicator.tsx    # Animated typing dots indicator
│   │   ├── layout/                    # Layout scaffolding components
│   │   │   ├── Sidebar.tsx            # ChatGPT-style collapsible sidebar
│   │   │   ├── Header.tsx             # Top header with user greeting
│   │   │   └── MobileNav.tsx          # Mobile slide-over drawer menu
│   │   └── shared/                    # Reusable utility components
│   │       ├── PageHeader.tsx         # Page title + description header
│   │       ├── LoadingSkeleton.tsx    # Skeleton shimmer loaders
│   │       ├── EmptyState.tsx         # Empty data placeholder
│   │       ├── ErrorState.tsx         # Error display placeholder
│   │       ├── ConfirmDialog.tsx      # Destructive action confirm dialog
│   │       └── Toaster.tsx            # Toast notification system
│   ├── hooks/                         # React Query wrapper Hooks
│   │   ├── useAuth.ts                 # Sign-in, sign-up, session mutations
│   │   ├── useTransactions.ts         # CRUD queries & invalidation handlers
│   │   ├── useBudgets.ts              # Budget limit config hooks
│   │   ├── useAnalytics.ts            # Monthly summary & trends queries
│   │   ├── useCategories.ts           # Category list query (24h cache)
│   │   └── useAI.ts                   # Chat & AI summary mutations
│   ├── services/                      # Axios API service layer
│   │   ├── auth.service.ts
│   │   ├── transaction.service.ts
│   │   ├── budget.service.ts
│   │   ├── analytics.service.ts
│   │   └── ai.service.ts
│   ├── store/                         # Zustand global state stores
│   │   ├── auth-store.ts              # Ephemeral token & user state
│   │   ├── ui-store.ts                # Sidebar collapse, mobile menu state
│   │   ├── transaction-store.ts       # Transaction filter state
│   │   ├── budget-store.ts            # Budget UI state
│   │   └── toast-store.ts             # Toast notification queue
│   ├── lib/
│   │   ├── axios.ts                   # Axios instance with JWT interceptors
│   │   ├── queryClient.ts             # React Query client configuration
│   │   └── utils.ts                   # Utility functions (cn, formatCurrency)
│   ├── middleware.ts                   # Next.js edge auth middleware
│   ├── types/
│   │   └── index.ts                   # Shared TypeScript interfaces
│   └── index.css                      # Global design system Tailwind styles
```

### 2.2 Backend Structure (Node.js & Express)
```text
backend/
├── prisma/
│   ├── schema.prisma                  # Database models & relationships
│   └── migrations/                    # SQL schema files folder
├── src/
│   ├── domain/                        # Pure enterprise logic (Framework independent)
│   │   ├── entities/
│   │   │   ├── user.entity.ts         # User properties rules
│   │   │   ├── transaction.entity.ts  # Transaction structure definitions
│   │   │   └── budget.entity.ts       # Budget boundaries structure
│   │   └── repositories/
│   │       ├── user.repository.interface.ts         # Port contract for User
│   │       ├── transaction.repository.interface.ts  # Port contract for Transactions
│   │       └── budget.repository.interface.ts       # Port contract for Budgets
│   ├── infrastructure/                # External tools wrappers
│   │   ├── database/
│   │   │   └── prisma.service.ts      # Active Prisma connection broker
│   │   └── repositories/              # Adapters implementation of Domain Contracts
│   │       ├── prisma-user.repository.ts
│   │       ├── prisma-transaction.repository.ts
│   │       └── prisma-budget.repository.ts
│   ├── application/                   # Use-cases orchestrators
│   │   ├── services/                  # Orchestrates business logic & boundaries
│   │   │   ├── auth.service.ts
│   │   │   ├── transaction.service.ts
│   │   │   ├── budget.service.ts
│   │   │   └── ai.service.ts
│   │   └── dtos/                      # Input structures validation definitions
│   │       ├── auth.dto.ts
│   │       ├── transaction.dto.ts
│   │       └── budget.dto.ts
│   ├── presentation/                  # Routing & transport delivery mechanics
│   │   ├── controllers/               # Express request mappings handlers
│   │   │   ├── auth.controller.ts
│   │   │   ├── transaction.controller.ts
│   │   │   ├── budget.controller.ts
│   │   │   └── ai.controller.ts
│   │   ├── middlewares/               # Security, logging checks
│   │   │   ├── auth.middleware.ts     # JWT request filter
│   │   │   ├── error.middleware.ts    # Centralized exception router
│   │   │   └── rate-limiter.middleware.ts # DDoS protection limits
│   │   └── routes/                    # API router routes endpoints configuration
│   │       ├── auth.routes.ts
│   │       ├── transaction.routes.ts
│   │       ├── budget.routes.ts
│   │       ├── ai.routes.ts
│   │       └── index.ts               # Routing orchestrator mapping v1
│   ├── app.ts                         # Express application wrapper setup
│   └── server.ts                      # App execution entry point
```

---

## 3. Tech Stack Details

* **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, TanStack React Query v5, Zustand, Recharts, Axios, React Hook Form, Zod.
* **Backend:** Node.js, Express, TypeScript, Prisma ORM, PostgreSQL (Dockerized or Managed), ts-node-dev.
* **Security:** JSON Web Tokens (JWT), BCryptJS (10 salt rounds encryption), CORS allowed origin maps, custom Express rate-limiter middleware.
* **AI Engine:** Groq API accessed via the OpenAI-compatible SDK interface (utilizing the `llama-3.3-70b-versatile` model) for dynamic spending summarizations and chat.

---

## 4. API Design Strategy

The API conforms to RESTful standards, returning standardized envelopes for all responses.

### Success Envelope
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Envelope
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error description",
    "details": [ ... ]
  }
}
```

### API Endpoint Summary Table

All routes are mounted at both `/api/*` and `/api/v1/*` for backward compatibility. Swagger UI is available at `http://localhost:5000/api/docs`.

| Method | Endpoint | Description | Auth Required |
|:---|:---|:---|:---|
| **POST** | `/api/v1/auth/register` | Register a new user | No |
| **POST** | `/api/v1/auth/login` | Log in and receive JWT Access Token | No |
| **GET** | `/api/v1/categories` | Retrieve all available categories | Yes (Bearer JWT) |
| **GET** | `/api/v1/transactions` | Retrieve paginated user transactions | Yes (Bearer JWT) |
| **POST** | `/api/v1/transactions` | Create a new transaction | Yes (Bearer JWT) |
| **PUT** | `/api/v1/transactions/:id` | Update an existing transaction | Yes (Bearer JWT) |
| **DELETE** | `/api/v1/transactions/:id` | Delete an existing transaction | Yes (Bearer JWT) |
| **GET** | `/api/v1/budgets` | Retrieve user budget configurations | Yes (Bearer JWT) |
| **POST** | `/api/v1/budgets` | Create a budget limit | Yes (Bearer JWT) |
| **PUT** | `/api/v1/budgets/:id` | Update an existing budget | Yes (Bearer JWT) |
| **DELETE** | `/api/v1/budgets/:id` | Delete a budget configuration | Yes (Bearer JWT) |
| **GET** | `/api/v1/budgets/status` | Get budget spending status | Yes (Bearer JWT) |
| **GET** | `/api/v1/analytics/monthly` | Monthly income vs expense summary | Yes (Bearer JWT) |
| **GET** | `/api/v1/analytics/categories` | Category breakdown analytics | Yes (Bearer JWT) |
| **GET** | `/api/v1/analytics/trends` | 30-day transaction trend data | Yes (Bearer JWT) |
| **POST** | `/api/v1/ai/summary` | Generate AI financial summary | Yes (Bearer JWT) |
| **POST** | `/api/v1/ai/chat` | Send message to AI Chat Assistant | Yes (Bearer JWT) |
| **GET** | `/api/docs` | Swagger interactive API UI | No |
| **GET** | `/api/health` | Service health check | No |

---

## 5. Prerequisites & Environment Setup

### Prerequisites
* **Node.js:** v18.0.0 or higher
* **npm:** v9.0.0 or higher
* **Docker & Docker Desktop:** Configured to support WSL2 container execution

### Environment Configurations

Create a `.env` file in `/backend` (derived from `backend/.env.example`):

```env
PORT=5000
NODE_ENV=development

# Database Connection URL (Prisma)
# Uses localhost:5433 to prevent port collision with host Postgres databases
DATABASE_URL="postgresql://postgres:postgrespassword@localhost:5433/finsight_db?schema=public"

# JWT Auth Secrets
JWT_SECRET="super-secret-jwt-signing-key-replace-in-production-environments-32-chars-long"
JWT_ACCESS_EXPIRATION="15m"
JWT_REFRESH_EXPIRATION="7d"

# Rate Limiting Parameters
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Groq API Key Config (Get yours at console.groq.com)
GROQ_API_KEY="your_real_api_key_here"

# CORS Allowed Origins
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:5000"
```

---

## 6. Step-by-Step Local Setup

### 1. Database Initialization
Spin up the PostgreSQL instance using Docker Desktop from the root folder:
```bash
docker compose up -d
```
*Note: The container maps host port `5433` to container port `5432` to avoid conflicts with any running host databases.*

### 2. Backend Installation and Execution
Navigating to the `/backend` folder:
```bash
cd backend
npm install
```

Synchronize the database schema with Prisma:
```bash
npx prisma db push
```

Run the database seed script to populate demo users and sample data:
```bash
npx ts-node prisma/seed.ts
```

This creates three accounts:
- **Demo/Test Account:** `test@finsight.ai` / `Test@123456` (pre-populated with 35+ transactions and budgets)
- **Sample Account:** `john.doe@finsight.ai` / `usersecret123`
- **Admin Account:** `admin@finsight.ai` / `adminsecret123`

Start the backend server:
```bash
npm run dev
```
The backend starts at `http://localhost:5000`. API docs at `http://localhost:5000/api/docs`.

### 3. Frontend Installation and Execution
Open a new terminal and navigate to the `/frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
The client dashboard will start at `http://localhost:3000`.

---

## 7. Authentication Flow & Role-Based Access

### Access Token Strategy
* FinSight AI uses stateless JWT tokens (`Authorization: Bearer <token>`).
* Password encryption at rest is managed using `bcryptjs` with 10 salt rounds.
* Route handlers are protected by role authentication guards (`USER`, `ADMIN`).

---

## 8. Deployment Architecture (Production)

The application is fully configured for cloud deployment with continuous integration:

* **Frontend:** Hosted on **Vercel** ([https://finsight-ai-nu.vercel.app](https://finsight-ai-nu.vercel.app)), utilizing server-side routing overlays and optimized static bundle serving.
* **Backend:** Hosted on **Render** as a Web Service ([https://finsight-ai-pz69.onrender.com](https://finsight-ai-pz69.onrender.com)), automatically scaling web threads.
  * **Build Command:** `npm install --include=dev && npx prisma generate && npm run build`
  * **Start Command:** `npx prisma migrate deploy && npm start`
* **Database:** Serverless **Neon PostgreSQL** connected via secure pooling URI parameters.
* **AI Integration:** Communicates with the **Groq API** service using the OpenAI Node SDK configuration mapped to Groq endpoint hosts.

---

## Application Screenshots

### Login Experience
![Login Experience](docs/screenshots/login-page-v2.png)

### Financial Dashboard
![Financial Dashboard](docs/screenshots/dashboard-overview-v2.png)

### Transactions Management
![Transactions Management](docs/screenshots/transactions-page-v2.png)

### Budget Planning
![Budget Planning](docs/screenshots/budgets-page-v2.png)

### AI Financial Advisor
![AI Financial Advisor](docs/screenshots/ai-advisor-page-v2.png)

### Light Theme
![Light Theme](docs/screenshots/dashboard-light-theme-v2.png)

### Dark Theme
![Dark Theme](docs/screenshots/dashboard-dark-theme-v2.png)

---

## 9. Contributing & License

### Contributing
Contributions are welcome. Please open an issue or submit a pull request for any performance optimizations or features.

### License
This project is licensed under the MIT License.
