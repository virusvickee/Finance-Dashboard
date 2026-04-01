import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAppSelector } from '../../hooks/useAppSelector';

export const CATEGORY_COLORS: Record<string, string> = {
  rent: '#6366F1',       // Indigo
  food: '#EC4899',       // Pink
  transport: '#F59E0B',  // Amber
  shopping: '#8B5CF6',   // Purple
  utilities: '#06B6D4',  // Cyan
  entertainment: '#10B981', // Emerald
  health: '#EF4444',     // Red
  education: '#3B82F6',  // Blue
  investment: '#F97316', // Orange
  other: '#6B7280'       // Gray
};

export const SpendingPieChart: React.FC = () => {
  const transactions = useAppSelector(state => state.transactions.items);

  const data = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const grouped = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(grouped)
        .map(key => ({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            value: grouped[key],
            color: CATEGORY_COLORS[key] || CATEGORY_COLORS.other
        }))
        .sort((a, b) => b.value - a.value); // sort descending
  }, [transactions]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border p-3 rounded-xl shadow-xl z-50 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].payload.color }}></div>
          <div>
            <p className="font-medium text-white text-sm">{payload[0].name}</p>
            <p className="font-bold text-white font-mono">₹{payload[0].value.toLocaleString('en-IN')}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 h-[400px] w-full flex flex-col shadow-lg shadow-black/20">
      <h3 className="font-display font-semibold mb-2">Spending Breakdown</h3>
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
              stroke="transparent"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} className="hover:opacity-80 transition-opacity cursor-pointer focus:outline-none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              iconType="circle"
              formatter={(value) => (
                  <span className="text-muted text-sm ml-1">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
