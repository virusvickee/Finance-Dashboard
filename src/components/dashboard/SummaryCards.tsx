import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import clsx from 'clsx';

export const SummaryCards: React.FC = () => {
  const transactions = useAppSelector(state => state.transactions.items);

  const stats = transactions.reduce((acc, curr) => {
    if (curr.type === 'income') acc.income += curr.amount;
    if (curr.type === 'expense') acc.expense += curr.amount;
    return acc;
  }, { income: 0, expense: 0 });

  const balance = stats.income - stats.expense;
  const savingsRate = stats.income > 0 ? ((balance / stats.income) * 100).toFixed(1) : '0';

  const cards = [
    { label: 'Total Balance', value: balance, icon: <Wallet />, color: balance >= 0 ? 'text-emerald' : 'text-pink', delay: '0ms' },
    { label: 'Total Income', value: stats.income, icon: <TrendingUp />, color: 'text-emerald', delay: '100ms' },
    { label: 'Total Expenses', value: stats.expense, icon: <TrendingDown />, color: 'text-pink', delay: '200ms' },
    { label: 'Savings Rate', value: `${savingsRate}%`, icon: <PiggyBank />, color: 'text-accent', delay: '300ms', isPct: true }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 mt-6">
      {cards.map((card, idx) => (
        <div 
          key={idx} 
          className="bg-card border border-border p-6 rounded-2xl flex items-center justify-between hover:border-accent/40 transition-colors shadow-lg shadow-black/20"
          style={{ animationDelay: card.delay, animationFillMode: 'both' }}
        >
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-muted">{card.label}</span>
            <span className={clsx("font-mono text-2xl md:text-3xl font-bold", card.color)}>
              {!card.isPct && '₹'}
              {card.isPct ? card.value : (card.value as number).toLocaleString('en-IN')}
            </span>
          </div>
          <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center bg-surface", card.color)}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
};
