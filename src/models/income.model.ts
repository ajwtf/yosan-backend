import { model, Schema, Types } from 'mongoose';

const IncomeSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
});

export const Income = model('Income', IncomeSchema);
