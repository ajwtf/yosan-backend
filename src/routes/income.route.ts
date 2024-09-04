import { Router } from 'express';

import {
    addIncome,
    deleteIncome,
    getIncomeById,
    getIncomes,
    updateIncome,
} from '../controllers/income.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

router.post('/', authMiddleware, addIncome);

router.get('/', authMiddleware, getIncomes);
router.get('/:id', authMiddleware, getIncomeById);

router.put('/:id', authMiddleware, updateIncome);

router.delete('/:id', authMiddleware, deleteIncome);

export default router;
