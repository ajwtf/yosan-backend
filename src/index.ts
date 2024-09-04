// import './config/passport';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';

// import passport from 'passport';
import connectDB from './config/database';
import authRoute from './routes/auth.route';
import budgetRoute from './routes/budget.route';
import expenseRoute from './routes/expense.route';
import incomeRoute from './routes/income.route';
import reportRoute from './routes/report.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for all routes
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }),
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
  }),
);
// app.use(passport.initialize());
// app.use(passport.session());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/income', incomeRoute);
app.use('/api/expense', expenseRoute);
app.use('/api/budget', budgetRoute);
app.use('/api/report', reportRoute);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(err));
