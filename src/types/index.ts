export type TransactionType = 'income' | 'expense';
export type IncomeCategory = 'salary' | 'freelance' | 'investment' | 'refund' | 'other';
export type ExpenseCategory = 'food' | 'transport' | 'shopping' | 'utilities' | 'entertainment' | 'health' | 'education' | 'rent' | 'investment' | 'other';
export type TransactionCategory = IncomeCategory | ExpenseCategory;
export type Role = 'admin' | 'viewer';
export type SortField = 'date' | 'amount' | 'category';
export type SortOrder = 'asc' | 'desc';
export type ActiveView = 'dashboard' | 'transactions' | 'insights';

export type Transaction = {
  id: string;
  date: string; // 'YYYY-MM-DD'
  description: string;
  amount: number; // INR
} & (
  | { type: 'income'; category: IncomeCategory }
  | { type: 'expense'; category: ExpenseCategory }
);
