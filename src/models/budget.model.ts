import { model, Schema, Types } from 'mongoose';

const BudgetSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  totalIncomeGoal: { type: Number, required: true },
  totalExpenseGoal: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export const Budget = model('Budget', BudgetSchema);
