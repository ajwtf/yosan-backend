import { Request, Response } from 'express';

import { Expense } from '../models/expense.model';

export const addExpense = async (req: Request, res: Response) => {
  const { date, category, description, amount, receiptUrl } = req.body;

  try {
    const newExpense = new Expense({
      userId: req.user.id,
      date,
      category,
      description,
      amount,
      receiptUrl,
    });

    await newExpense.save();

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: 'Error adding expense' });
  }
};

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving expenses' });
  }
};

export const getExpenseById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving expense' });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date, category, description, amount, receiptUrl } = req.body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { userId: req.user.id, amount, category, date, description, receiptUrl },
      { new: true },
    );

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Error updating expense' });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json(deletedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense' });
  }
};
