import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { format } from 'date-fns';
import { Sun, Moon } from 'lucide-react';

export const Header: React.FC = () => {
  const { activeView } = useAppSelector((state) => state.ui);
  const transactions = useAppSelector((state) => state.transactions.items);

  const totalBalance = transactions.reduce((acc, curr) => {
    return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
  }, 0);

  const viewTitles = {
    dashboard: 'Dashboard',
    transactions: 'Transactions',
    insights: 'Insights'
  };

  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6 md:px-10">
      <div>
        <h1 className="font-display text-xl font-bold capitalize">{viewTitles[activeView]}</h1>
        <p className="text-xs text-muted mt-0.5">{format(new Date(), 'EEEE, MMMM do, yyyy')}</p>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-lg hover:bg-surface transition-colors">
          {isDark ? <Sun className="w-4 h-4 text-amber" /> : <Moon className="w-4 h-4 text-muted" />}
        </button>
        <div className="flex flex-col items-end">
          <span className="text-xs text-muted mb-0.5">Total Balance</span>
          <span className={`font-mono font-bold leading-none ${totalBalance >= 0 ? 'text-emerald' : 'text-pink'}`}>
            ₹{totalBalance.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </header>
  );
};
