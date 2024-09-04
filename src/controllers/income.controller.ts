import { Request, Response } from 'express';

import { Income } from '../models/income.model';

export const addIncome = async (req: Request, res: Response) => {
  const { date, category, description, amount } = req.body;

  try {
    const newIncome = new Income({
      userId: req.user.id,
      date,
      category,
      description,
      amount,
    });

    await newIncome.save();

    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: 'Error adding income' });
  }
};

export const getIncomes = async (req: Request, res: Response) => {
  try {
    const incomes = await Income.find({ userId: req.user.id });

    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving incomes' });
  }
};

export const getIncomeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const income = await Income.findById(id);

    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    if (income.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving income' });
  }
};

export const updateIncome = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date, category, description, amount } = req.body;

  try {
    const updatedIncome = await Income.findByIdAndUpdate(
      id,
      { userId: req.user.id, amount, category, date, description },
      { new: true },
    );

    res.status(200).json(updatedIncome);
  } catch (error) {
    res.status(500).json({ message: 'Error updating income' });
  }
};

export const deleteIncome = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedIncome = await Income.findByIdAndDelete(id);

    if (!deletedIncome) {
      return res.status(404).json({ message: 'Income not found' });
    }
    res.status(200).json(deletedIncome);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting income' });
  }
};
