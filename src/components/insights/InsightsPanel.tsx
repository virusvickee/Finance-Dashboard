import React, { useMemo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Trophy, TrendingDown, Clock, ShieldAlert } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export const InsightsPanel: React.FC = () => {
  const transactions = useAppSelector(state => state.transactions.items);

  const insights = useMemo(() => {
    // Top Spending Category
    const categoryTotals: Record<string, number> = {};
    const monthlyNet: Record<string, { income: number, expense: number, monthStr: string, rawMonth: string }> = {};

    transactions.forEach(t => {
      if (!t.date || typeof t.date !== 'string' || t.date.length < 7) return;
      try {
        const monthPrefix = t.date.slice(0, 7); // YYYY-MM
        const readableMonth = format(parseISO(t.date), 'MMMM yyyy');
        
        if (!monthlyNet[monthPrefix]) monthlyNet[monthPrefix] = { income: 0, expense: 0, monthStr: readableMonth, rawMonth: monthPrefix };

        if (t.type === 'expense') {
          categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
          monthlyNet[monthPrefix].expense += t.amount;
        } else {
          monthlyNet[monthPrefix].income += t.amount;
        }
      } catch (e) {
        // Ignore malformed dates
      }
    });

    const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
    const topCategory = sortedCategories[0] || ['None', 0];

    const monthlyValues = Object.values(monthlyNet);
    const sortedByIncome = [...monthlyValues].sort((a, b) => b.income - a.income);
    const bestIncomeMonth = sortedByIncome[0];

    const sortedByExpense = [...monthlyValues].sort((a, b) => b.expense - a.expense);
    const highestExpenseMonth = sortedByExpense[0];

    // average savings
    const totalSavings = monthlyValues.reduce((acc, curr) => acc + (curr.income - curr.expense), 0);
    const avgSavings = monthlyValues.length > 0 ? Math.round(totalSavings / monthlyValues.length) : 0;
    const totalExpenses = monthlyValues.reduce((acc, curr) => acc + curr.expense, 0);

    return {
      topCategory: { name: topCategory[0], amount: topCategory[1] as number },
      bestIncomeMonth: bestIncomeMonth || { monthStr: 'N/A', income: 0, rawMonth: '' },
      highestExpenseMonth: highestExpenseMonth || { monthStr: 'N/A', expense: 0, rawMonth: '' },
      avgSavings,
      monthlyValues: monthlyValues.sort((a, b) => a.rawMonth.localeCompare(b.rawMonth)),
      categoryTotals,
      totalExpenses
    };
  }, [transactions]);

  const cards = [
    { title: 'Top Expense Category', value: insights.topCategory.name, sub: `₹${insights.topCategory.amount.toLocaleString('en-IN')}`, icon: <TrendingDown className="w-6 h-6 text-pink" />, delay: '0ms' },
    { title: 'Best Income Month', value: insights.bestIncomeMonth.monthStr, sub: `₹${insights.bestIncomeMonth.income.toLocaleString('en-IN')}`, icon: <Trophy className="w-6 h-6 text-emerald" />, delay: '100ms' },
    { title: 'Highest Expense Month', value: insights.highestExpenseMonth.monthStr, sub: `₹${insights.highestExpenseMonth.expense.toLocaleString('en-IN')}`, icon: <ShieldAlert className="w-6 h-6 text-amber" />, delay: '200ms' },
    { title: 'Avg Monthly Savings', value: `₹${insights.avgSavings.toLocaleString('en-IN')}`, sub: 'Across active months', icon: <Clock className="w-6 h-6 text-accent" />, delay: '300ms' },
  ];

  return (
    <div className="animate-in fade-in duration-500 pb-20 md:pb-8 flex flex-col">
      <h2 className="text-xl font-display font-semibold mb-6">Financial Insights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-card border border-border p-6 rounded-2xl shadow-lg shadow-black/20" style={{ animationDelay: card.delay, animationFillMode: 'both' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-surface mb-4">
              {card.icon}
            </div>
            <p className="text-sm font-medium text-muted mb-1">{card.title}</p>
            <p className="text-xl md:text-2xl font-bold font-display capitalize mb-1">{card.value}</p>
            <p className="text-sm font-mono text-white/70">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl shadow-lg shadow-black/20 overflow-hidden" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
        <div className="p-6 border-b border-border">
          <h3 className="font-display font-semibold">Monthly Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-muted bg-surface/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Month</th>
                <th className="px-6 py-4 font-medium">Income</th>
                <th className="px-6 py-4 font-medium">Expenses</th>
                <th className="px-6 py-4 font-medium">Net Income</th>
              </tr>
            </thead>
            <tbody>
              {insights.monthlyValues.map((month, idx) => {
                const net = month.income - month.expense;
                return (
                  <tr key={idx} className="border-b border-border hover:bg-surface/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{month.monthStr}</td>
                    <td className="px-6 py-4 font-mono text-emerald">₹{month.income.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 font-mono text-pink">₹{month.expense.toLocaleString('en-IN')}</td>
                    <td className={`px-6 py-4 font-mono font-bold ${net >= 0 ? 'text-emerald' : 'text-pink'}`}>
                      {net >= 0 ? '+' : '-'}₹{Math.abs(net).toLocaleString('en-IN')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 mt-6 shadow-lg shadow-black/20" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
        <h3 className="font-display font-semibold text-lg mb-5">Top 5 Spending Categories</h3>
        <div className="flex flex-col gap-4">
          {Object.entries(insights.categoryTotals)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([cat, amt], i) => {
              const percentage = insights.totalExpenses > 0 ? ((amt / insights.totalExpenses) * 100).toFixed(1) : "0.0";
              const colors = ['#EC4899', '#6366F1', '#F59E0B', '#10B981', '#3B82F6'];
              return (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="capitalize font-sans text-white/80">{cat}</span>
                    <span className="font-mono text-muted">
                      ₹{amt.toLocaleString('en-IN')} · {percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full transition-all duration-700"
                      style={{ width: `${percentage}%`, backgroundColor: colors[i] }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
