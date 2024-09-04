// Server-side Validation

export const registerValidationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const incomeValidationSchema = Yup.object({
  amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be positive'),
  category: Yup.string().required('Category is required'),
  date: Yup.date().required('Date is required'),
  description: Yup.string().required('Description is required'),
});

export const expenseValidationSchema = Yup.object({
  amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be positive'),
  category: Yup.string().required('Category is required'),
  date: Yup.date().required('Date is required'),
  description: Yup.string().required('Description is required'),
  receipt: Yup.mixed().notRequired(),
});

export const budgetValidationSchema = Yup.object({
  totalIncomeGoal: Yup.number()
    .required('Total income goal is required')
    .positive('Income goal must be positive'),
  totalExpenseGoal: Yup.number()
    .required('Total expense goal is required')
    .positive('Expense goal must be positive'),
});
