import type { Transaction } from '../types';

const generateTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const startYear = 2025;

  let idCounter = 1;

  for (let month = 1; month <= 6; month++) {
    const monthStr = month.toString().padStart(2, '0');
    
    // Fixed monthly income
    transactions.push({
      id: `trx-${idCounter++}`,
      date: `${startYear}-${monthStr}-01`,
      description: 'Monthly Salary',
      amount: month <= 3 ? 85000 : 90000,
      category: 'salary',
      type: 'income',
    });

    // Freelance (variable deterministic)
    const seededRandom = ((startYear * month * 13) % 17) / 17;
    transactions.push({
      id: `trx-${idCounter++}`,
      date: `${startYear}-${monthStr}-10`,
      description: 'Freelance Project',
      amount: Math.floor(seededRandom * (35000 - 18000 + 1)) + 18000,
      category: 'freelance',
      type: 'income',
    });

    // Rent
    transactions.push({
      id: `trx-${idCounter++}`,
      date: `${startYear}-${monthStr}-05`,
      description: 'Apartment Rent',
      amount: 18000,
      category: 'rent',
      type: 'expense',
    });

    // Food & Groceries
    transactions.push({
      id: `trx-${idCounter++}`,
      date: `${startYear}-${monthStr}-08`,
      description: 'Supermarket Groceries',
      amount: 4500,
      category: 'food',
      type: 'expense',
    });
    transactions.push({
      id: `trx-${idCounter++}`,
      date: `${startYear}-${monthStr}-15`,
      description: 'Restaurant Dinner',
      amount: 2100,
      category: 'food',
      type: 'expense',
    });

    // Utilities
    transactions.push({
      id: `trx-${idCounter++}`,
      date: `${startYear}-${monthStr}-11`,
      description: 'Electricity & Water',
      amount: 1500,
      category: 'utilities',
      type: 'expense',
    });

    // Transport
    transactions.push({
      id: `trx-${idCounter++}`,
      date: `${startYear}-${monthStr}-20`,
      description: 'Fuel & Transit',
      amount: 3200,
      category: 'transport',
      type: 'expense',
    });

    // Shopping
    transactions.push({
      id: `trx-${idCounter++}`,
      date: `${startYear}-${monthStr}-18`,
      description: 'Amazon Shopping',
      amount: 5400,
      category: 'shopping',
      type: 'expense',
    });

    // Entertainment
    transactions.push({
      id: `trx-${idCounter++}`,
      date: `${startYear}-${monthStr}-25`,
      description: 'Netflix & Spotify',
      amount: 999,
      category: 'entertainment',
      type: 'expense',
    });

    // Investment
    transactions.push({
      id: `trx-${idCounter++}`,
      date: `${startYear}-${monthStr}-28`,
      description: 'Mutual Fund SIP',
      amount: 15000,
      category: 'investment',
      type: 'expense', // It's an outflow from this account
    });
  }

  return transactions;
};

export const transactionsData = generateTransactions();
