import { Request, Response } from 'express';

import { Budget } from '../models/budget.model';

export const setBudget = async (req: Request, res: Response) => {
  const { totalIncomeGoal, totalExpenseGoal, startDate, endDate } = req.body;

  try {
    const budget = new Budget({
      userId: req.user.id,
      totalIncomeGoal,
      totalExpenseGoal,
      startDate,
      endDate,
    });

    await budget.save();

    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Error setting budget' });
  }
};

export const getBudget = async (req: Request, res: Response) => {
  try {
    const budget = await Budget.findOne({ userId: req.user.id });

    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving budget' });
  }
};

export const updateBudget = async (req: Request, res: Response) => {
  const { totalIncomeGoal, totalExpenseGoal, startDate, endDate } = req.body;

  try {
    const updatedBudget = await Budget.findOneAndUpdate(
      { userId: req.user.id },
      { totalIncomeGoal, totalExpenseGoal, startDate, endDate },
      { new: true },
    );

    res.status(200).json(updatedBudget);
  } catch (error) {
    res.status(500).json({ message: 'Error updating budget' });
  }
};

export const deleteBudget = async (req: Request, res: Response) => {
  try {
    const deletedBudget = await Budget.findOneAndDelete({
      userId: req.user.id,
    });

    if (!deletedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.status(200).json(deletedBudget);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting budget' });
  }
};
