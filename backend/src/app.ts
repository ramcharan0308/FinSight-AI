import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env';
import { globalLimiter } from './middlewares/rateLimit.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import { getSwaggerUIHtml } from './config/swagger';
import { authRoutes } from './modules/auth/auth.routes';
import { transactionRoutes } from './modules/transactions/transaction.routes';
import { budgetRoutes } from './modules/budgets/budget.routes';
import { analyticsRoutes } from './modules/analytics/analytics.routes';
import { aiRoutes } from './modules/ai/ai.routes';
import { prisma } from './config/prisma';
import { authMiddleware } from './middlewares/auth.middleware';

const app = express();

// 1. Request logging
if (env.NODE_ENV !== 'test') {
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// 2. CORS configuration setup
const allowedOrigins = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS security policy'));
      }
    },
    credentials: true,
  }),
);

// 3. Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. DDOS rate limiters
app.use(globalLimiter);

// 5. Expose Swagger API Docs endpoint UI
app.get('/api/docs', (_req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(getSwaggerUIHtml());
});

// Basic service status healthchecks
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Categories endpoints
app.get('/api/categories', authMiddleware, async (_req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
});
app.get('/api/v1/categories', authMiddleware, async (_req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
});

// 6. Router mapping (matching both /api and /api/v1 to support client & Swagger UI)
app.use('/api/auth', authRoutes);
app.use('/api/v1/auth', authRoutes);

app.use('/api/transactions', transactionRoutes);
app.use('/api/v1/transactions', transactionRoutes);

app.use('/api/budgets', budgetRoutes);
app.use('/api/v1/budgets', budgetRoutes);

app.use('/api/analytics', analyticsRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

app.use('/api/ai', aiRoutes);
app.use('/api/v1/ai', aiRoutes);

// 7. Global central error boundary handlers
app.use(errorMiddleware);

export default app;
