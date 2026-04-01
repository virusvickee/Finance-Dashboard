export type TransactionType = 'income' | 'expense';
export type TransactionCategory =
  | 'salary' | 'freelance' | 'investment' | 'refund'
  | 'food' | 'transport' | 'shopping' | 'utilities'
  | 'entertainment' | 'health' | 'education' | 'rent' | 'other';
export type Role = 'admin' | 'viewer';
export type SortField = 'date' | 'amount' | 'category';
export type SortOrder = 'asc' | 'desc';
export type ActiveView = 'dashboard' | 'transactions' | 'insights';

export interface Transaction {
  id: string;
  date: string; // 'YYYY-MM-DD'
  description: string;
  amount: number; // INR
  category: TransactionCategory;
  type: TransactionType;
}
