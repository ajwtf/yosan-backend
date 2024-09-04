import { Router } from 'express';

import { getIncomeExpenseReport } from '../controllers/report.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

router.get('/income-expense', authMiddleware, getIncomeExpenseReport);

export default router;
