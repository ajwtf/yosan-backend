import { Request, Response } from 'express';

import { Budget } from '../models/budget.model';
import { Expense } from '../models/expense.model';
import { Income } from '../models/income.model';

export const getIncomeExpenseReport = async (req: Request, res: Response) => {
  try {
    const income = await Income.find({ userId: req.user.id });
    const expenses = await Expense.find({ userId: req.user.id });
    const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const totalBalance = totalIncome - totalExpenses;

    res.status(200).json({ totalIncome, totalExpenses, totalBalance });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving report' });
  }
};

export const getExpenseReport = async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving expenses' });
  }
};

export const getIncomeReport = async (req: Request, res: Response) => {
  try {
    const income = await Income.find({ userId: req.user.id });

    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving incomes' });
  }
};

export const getBudgetReport = async (req: Request, res: Response) => {
  try {
    const budget = await Budget.findOne({ userId: req.user.id });

    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving budget' });
  }
};

export const getReport = async (req: Request, res: Response) => {
  try {
    const report = await Budget.findOne({ userId: req.user.id });

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving report' });
  }
};

export const deleteReport = async (req: Request, res: Response) => {
  try {
    const deletedReport = await Budget.findOneAndDelete({
      userId: req.user.id,
    });

    if (!deletedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json(deletedReport);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting report' });
  }
};

export const updateReport = async (req: Request, res: Response) => {
  const { totalIncomeGoal, totalExpenseGoal, startDate, endDate } = req.body;

  try {
    const updatedReport = await Budget.findOneAndUpdate(
      { userId: req.user.id },
      { totalIncomeGoal, totalExpenseGoal, startDate, endDate },
      { new: true },
    );

    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(500).json({ message: 'Error updating report' });
  }
};

export const setReport = async (req: Request, res: Response) => {
  const { totalIncomeGoal, totalExpenseGoal, startDate, endDate } = req.body;
  try {
    const report = new Budget({
      userId: req.user.id,
      totalIncomeGoal,
      totalExpenseGoal,
      startDate,
      endDate,
    });
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error setting report' });
  }
};

export const getReports = async (req: Request, res: Response) => {
  try {
    const reports = await Budget.find({ userId: req.user.id });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving reports' });
  }
};

export const getReportById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const report = await Budget.findById(id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving report' });
  }
};

export const updateReportById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { totalIncomeGoal, totalExpenseGoal, startDate, endDate } = req.body;
  try {
    const updatedReport = await Budget.findByIdAndUpdate(
      id,
      { totalIncomeGoal, totalExpenseGoal, startDate, endDate },
      { new: true },
    );
    if (!updatedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(500).json({ message: 'Error updating report' });
  }
};

export const deleteReportById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedReport = await Budget.findByIdAndDelete(id);
    if (!deletedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(deletedReport);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting report' });
  }
};
