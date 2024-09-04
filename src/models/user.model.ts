import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const User = model('User', UserSchema);
