import { Router } from 'express';
import { AnalyticsController } from './analytics.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
const controller = new AnalyticsController();

router.use(authMiddleware);

router.get('/monthly', controller.getMonthly);
router.get('/categories', controller.getCategories);
router.get('/trends', controller.getTrends);

export const analyticsRoutes = router;
