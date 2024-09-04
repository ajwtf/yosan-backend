import { Router } from 'express';

import {
    addExpense,
    deleteExpense,
    getExpenseById,
    getExpenses,
    updateExpense,
} from '../controllers/expense.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

router.post('/', authMiddleware, addExpense);

router.get('/', authMiddleware, getExpenses);
router.get('/:id', authMiddleware, getExpenseById);

router.put('/:id', authMiddleware, updateExpense);

router.delete('/:id', authMiddleware, deleteExpense);

export default router;
