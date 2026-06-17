# FinSight AI: Career & Portfolio Integration Toolkit

Use the resources in this file to showcase your engineering contributions on your resume, GitHub profile, LinkedIn, and portfolio sites.

---

## 1. Resume Project Description (2-3 Lines)
> Architected and engineered **FinSight AI**, a production-grade personal finance and expense intelligence platform deployed on **Vercel** (frontend), **Render** (backend), and serverless **Neon PostgreSQL** (database). Built with Next.js 14 App Router, Express, TypeScript, and Prisma ORM, the platform integrates **Groq AI** (Llama-3.3-70b) to deliver secure, contextual financial summary metrics, budget analytics, and chat agents via a ChatGPT-style collapsible sidebar.

---

## 2. GitHub Repository Description (Under 200 Characters)
> 💡 AI-Powered Personal Finance Platform. Built with Next.js 14, Express, TypeScript, Prisma, Neon serverless PostgreSQL, and Groq AI (Llama-3.3-70b). Deployed live on Vercel and Render.

---

## 3. LinkedIn Project Description
> ### Project: FinSight AI — AI-Powered Personal Finance Platform (Tech Lead & Full-Stack Architect)
> 
> Designed, optimized, and deployed a complete, secure enterprise-grade expense tracking and financial intelligence platform. FinSight AI merges traditional financial ledgers with advanced AI reasoning agents to provide users with proactive savings recommendations, budget alerts, and category analytics.
> 
> **Key Engineering Accomplishments:**
> * Designed a clean, layered architectural boundary separating UI state (Zustand) from server-cached datasets (React Query).
> * Implemented secure stateless authentication (JWT + Refresh Tokens) with cryptographically hashed passwords (bcrypt).
> * Optimized PostgreSQL querying using composite database indexes and Prisma cascade rules, boosting analytical aggregation query performance.
> * Architected Groq AI (Llama-3.3-70b) contextual prompts, parsing ledgers and budget categories while enforcing strict PII data omission for user security.
> * Standardized error handling, rate limiting, and inputs using Zod schemas, securing the backend API surface.
> * Fully deployed production workloads using **Vercel** for the frontend client, **Render** for the API gateway, and serverless **Neon PostgreSQL** for highly resilient database storage.
> 
> **Technologies Used:** TypeScript, Node.js, Express, Next.js 14, React, Tailwind CSS, Recharts, Prisma ORM, Neon serverless PostgreSQL, Docker, OpenAPI/Swagger, **Groq API** (Llama-3.3-70b), Vercel, Render, TanStack React Query v5, Zustand.

---

## 4. 10 Key Technical Achievements (Resume Bullets)
1. **Multi-Tier Caching Architecture:** Separated global frontend state by routing UI-only flags to Zustand and server data to React Query, applying per-query staleTime policies (24h categories, 30s analytics) to reduce client-server roundtrips by ~60%.
2. **Normalized Database Architecture:** Structured an optimized relational PostgreSQL schema with composite indexes on `(userId, date)` and `(userId, categoryId, startDate, endDate)`, accelerating analytical queries.
3. **Groq AI Financial Advisor:** Architected a modular AI service connecting user budgets and transaction records to Groq's Llama-3.3-70b model, outputting personalized text recommendations while enforcing strict PII data omission in prompts.
4. **ChatGPT-Style Sidebar UX:** Engineered a collapsible sidebar (72px/260px) with Zustand-driven state, smooth CSS transitions, accurate hover tooltips, and a mobile slide-over drawer with backdrop — matching ChatGPT's exact interaction model.
5. **Stateless JWT Guard:** Secured application interfaces with JWT access tokens and sliding refresh token flow, protecting user data via role-based route permissions and auth middleware.
6. **Payload Schema Sanitization:** Integrated strict Zod validation middleware at API routes, filtering incoming request parameters and preventing bad payloads from reaching PostgreSQL.
7. **Containerized Database Environment:** Authored Docker Compose files mapping PostgreSQL services to alternative local ports (`5433:5432`) to isolate developer systems from host port conflicts.
8. **Interactive OpenAPI Specs:** Configured dynamic Swagger documentation rendering at `/api/docs`, providing developers with live, interactive endpoint execution testing.
9. **Progressive Dashboard Loading:** Dashboard sections render independently with skeleton loaders using dynamic `next/dynamic` imports for heavy Recharts bundles (~200KB deferred), ensuring no blocked rendering.
10. **Clean Architecture Separation:** Segregated domain models from infrastructure adapters (Prisma/Express), allowing core business services to be tested independently of databases and servers.

---

## 5. Demonstrated Technical Skills Matrix
* **Languages:** TypeScript, JavaScript (ES6+), SQL, HTML5, CSS3
* **Frontend Frameworks:** Next.js 14 (App Router), React 18, Tailwind CSS, Recharts, React Hook Form, Zod
* **Backend Development:** Node.js, Express.js, RESTful API Design, Swagger/OpenAPI
* **State Management:** Zustand, TanStack React Query v5
* **Databases & ORMs:** PostgreSQL, Neon Serverless PostgreSQL, Prisma ORM, Database Indexing, Schema Normalization
* **AI & LLM Integration:** Groq API (Llama-3.3-70b), Prompt Engineering, PII-safe Context Compilation, Graceful Degradation
* **UX Engineering:** ChatGPT-style collapsible sidebar, Mobile slide-over drawer, Skeleton loading states, Dynamic imports
* **DevOps & Infrastructure:** Docker, Docker Compose, Port Forwarding, WSL2, Local Development Environment, Vercel, Render
* **Security & Auth:** JSON Web Tokens (JWT), bcryptjs encryption, CORS management, Rate limiting middleware, Middleware auth guards
