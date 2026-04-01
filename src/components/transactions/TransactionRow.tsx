import React from 'react';
import type { Transaction } from '../../types';
import { Edit2, Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { CATEGORY_COLORS } from '../dashboard/SpendingPieChart';
import clsx from 'clsx';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteTransaction } from '../../store/slices/transactionsSlice';

interface TransactionRowProps {
  transaction: Transaction;
  onEdit: (t: Transaction) => void;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({ transaction, onEdit }) => {
  const dispatch = useAppDispatch();
  const role = useAppSelector(state => state.ui.role);
  const color = CATEGORY_COLORS[transaction.category] || CATEGORY_COLORS.other;
  const isIncome = transaction.type === 'income';

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-border hover:bg-surface/50 transition-colors group">
      <div className="flex items-center gap-4 mb-3 sm:mb-0">
        <div className="w-10 h-10 rounded-full flex items-center justify-center opacity-80" style={{ backgroundColor: `${color}20` }}>
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
        </div>
        <div>
          <h4 className="font-medium text-white">{transaction.description}</h4>
          <p className="text-sm text-muted capitalize">{format(parseISO(transaction.date), 'MMM do, yyyy')} • {transaction.category}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between w-full sm:w-auto gap-6 pl-14 sm:pl-0">
        <span className={clsx("font-mono font-bold", isIncome ? "text-emerald" : "text-pink")}>
          {isIncome ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
        </span>
        
        {role === 'admin' ? (
          <div className="flex gap-2 sm:opacity-0 sm:invisible group-hover:opacity-100 group-hover:visible transition-all">
            <button onClick={() => onEdit(transaction)} className="p-2 text-muted hover:text-white bg-surface hover:bg-muted/20 rounded-lg transition-colors">
              <Edit2 className="w-4 h-4" />
            </button>
            <button onClick={() => dispatch(deleteTransaction(transaction.id))} className="p-2 text-muted hover:text-pink bg-surface hover:bg-pink/10 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="w-20" /> /* Placeholder spacing for viewer */
        )}
      </div>
    </div>
  );
};
