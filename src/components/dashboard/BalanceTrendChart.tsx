import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { useAppSelector } from '../../hooks/useAppSelector';
import { format, parseISO } from 'date-fns';

export const BalanceTrendChart: React.FC = () => {
  const transactions = useAppSelector(state => state.transactions.items);

  const data = useMemo(() => {
    const monthlyData: Record<string, { income: number; expense: number; month: string }> = {};

    transactions.forEach(t => {
      const date = parseISO(t.date);
      const monthKey = format(date, 'MMM yy');
      
      if (!monthlyData[monthKey]) monthlyData[monthKey] = { income: 0, expense: 0, month: monthKey };
      
      if (t.type === 'income') monthlyData[monthKey].income += t.amount;
      if (t.type === 'expense') monthlyData[monthKey].expense += t.amount;
    });

    // Reduce iteratively to compute running net balance
    let prevNet = 0;
    return Object.values(monthlyData).sort((a, b) => {
        const da = new Date('01 ' + a.month);
        const db = new Date('01 ' + b.month);
        return da.getTime() - db.getTime();
    }).map((m) => {
        const net = m.income - m.expense;
        prevNet += net;
        return { ...m, balance: prevNet };
    });
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border p-4 rounded-xl shadow-xl z-50">
          <p className="font-medium text-white mb-2">{label}</p>
          {payload.map((p: any, i: number) => (
            <div key={i} className="flex gap-4 justify-between items-center text-sm font-mono mt-1">
              <span style={{ color: p.color }}>{p.name}:</span>
              <span className="font-bold text-white">₹{p.value.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 h-[400px] w-full flex flex-col shadow-lg shadow-black/20">
      <h3 className="font-display font-semibold mb-6">Balance Trend</h3>
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3A" vertical={false} />
            <XAxis dataKey="month" stroke="#6B7280" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
            <YAxis stroke="#6B7280" tick={{ fill: '#6B7280', fontSize: 12, fontFamily: 'DM Mono' }} tickFormatter={(val) => `₹${val/1000}k`} axisLine={false} tickLine={false} dx={-10} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
            <Line type="monotone" name="Income" dataKey="income" stroke="#10B981" strokeWidth={3} dot={{ strokeWidth: 2, r: 4 }} />
            <Line type="monotone" name="Expense" dataKey="expense" stroke="#EC4899" strokeWidth={3} dot={{ strokeWidth: 2, r: 4 }} />
            <Line type="monotone" name="Net Balance" dataKey="balance" stroke="#6366F1" strokeWidth={4} strokeDasharray="5 5" dot={{ strokeWidth: 2, r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
