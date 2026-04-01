import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addTransaction, editTransaction } from '../../store/slices/transactionsSlice';
import type { Transaction, TransactionCategory, TransactionType } from '../../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Transaction;
}

export const AddTransactionModal: React.FC<ModalProps> = ({ isOpen, onClose, initialData }) => {
  const dispatch = useAppDispatch();
  
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'other' as TransactionCategory,
    type: 'expense' as TransactionType,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        description: initialData.description,
        amount: initialData.amount.toString(),
        date: initialData.date,
        category: initialData.category,
        type: initialData.type,
      });
    } else {
      setFormData({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: 'other' as TransactionCategory,
        type: 'expense' as TransactionType,
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const categories: TransactionCategory[] = [
    'salary', 'freelance', 'investment', 'refund',
    'food', 'transport', 'shopping', 'utilities',
    'entertainment', 'health', 'education', 'rent', 'other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.date) return;
    
    const parsedAmount = parseFloat(formData.amount.trim());
    if (isNaN(parsedAmount) || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }

    const payload = {
      id: initialData ? initialData.id : `trx-${Date.now()}`,
      description: formData.description,
      amount: parsedAmount,
      date: formData.date,
      category: formData.category,
      type: formData.type,
    } as unknown as Transaction;

    if (initialData) {
      dispatch(editTransaction(payload));
    } else {
      dispatch(addTransaction(payload));
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm shadow-2xl animate-in fade-in duration-200">
      <div className="bg-card border border-border w-full max-w-md rounded-2xl p-6 shadow-xl relative top-0 slide-in-from-bottom-4 animate-in duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-semibold">
            {initialData ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button onClick={onClose} className="p-2 text-muted hover:text-white bg-surface rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <label className={`flex-1 flex justify-center items-center py-3 rounded-xl border cursor-pointer font-medium transition-all ${formData.type === 'expense' ? 'bg-pink/10 border-pink/50 text-pink' : 'bg-surface border-border text-muted hover:border-border/80'}`}>
              <input type="radio" className="hidden" checked={formData.type === 'expense'} onChange={() => setFormData({...formData, type: 'expense'})} />
              Expense
            </label>
            <label className={`flex-1 flex justify-center items-center py-3 rounded-xl border cursor-pointer font-medium transition-all ${formData.type === 'income' ? 'bg-emerald/10 border-emerald/50 text-emerald' : 'bg-surface border-border text-muted hover:border-border/80'}`}>
              <input type="radio" className="hidden" checked={formData.type === 'income'} onChange={() => setFormData({...formData, type: 'income'})} />
              Income
            </label>
          </div>

          <div>
            <label className="text-xs text-muted mb-1.5 block">Description</label>
            <input 
              required
              autoFocus
              type="text" 
              placeholder="E.g. Groceries at Walmart"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent/50 text-white"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-xs text-muted mb-1.5 block">Amount (₹)</label>
              <input 
                required
                type="number" 
                min="1"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: e.target.value})}
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent/50 text-white font-mono"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-muted mb-1.5 block">Date</label>
              <input 
                required
                type="date" 
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent/50 text-white md:cursor-text cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-muted mb-1.5 block">Category</label>
            <select 
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value as TransactionCategory})}
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent/50 text-white capitalize appearance-none"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <button 
            type="submit"
            className="w-full bg-accent hover:bg-accent/80 text-white font-medium py-3 rounded-xl mt-4 transition-colors"
          >
            {initialData ? 'Save Changes' : 'Create Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
};
