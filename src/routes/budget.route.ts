import { Router } from 'express';

import {
    deleteBudget,
    getBudget,
    setBudget,
    updateBudget,
} from '../controllers/budget.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

router.post('/', authMiddleware, setBudget);

router.get('/', authMiddleware, getBudget);

router.put('/:id', authMiddleware, updateBudget);

router.delete('/:id', authMiddleware, deleteBudget);

export default router;
