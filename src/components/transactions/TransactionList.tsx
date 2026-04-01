import React, { useState, useMemo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { FilterBar } from './FilterBar';
import { TransactionRow } from './TransactionRow';
import { AddTransactionModal } from './AddTransactionModal';
import { Inbox, Plus, Download } from 'lucide-react';
import type { Transaction } from '../../types';

export const TransactionList: React.FC = () => {
  const { items } = useAppSelector(state => state.transactions);
  const filters = useAppSelector(state => state.filters);
  const role = useAppSelector(state => state.ui.role);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();

  const filteredItems = useMemo(() => {
    return items.filter(t => {
      if (filters.search && !t.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.category !== 'all' && t.category !== filters.category) return false;
      if (filters.type !== 'all' && t.type !== filters.type) return false;
      return true;
    }).sort((a, b) => {
      let comparison = 0;
      if (filters.sortField === 'date') comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      if (filters.sortField === 'amount') comparison = a.amount - b.amount;
      if (filters.sortField === 'category') comparison = a.category.localeCompare(b.category);
      
      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });
  }, [items, filters]);

  const handleEdit = (t: Transaction) => {
    setEditingTransaction(t);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTransaction(undefined);
    setModalOpen(true);
  };

  const exportCSV = () => {
    const quoteField = (value: any) => {
      const stringValue = String(value).replace(/\r\n|\n/g, ' ');
      return `"${stringValue.replace(/"/g, '""')}"`;
    };

    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount (INR)'];
    const rows = filteredItems.map(t => [
      quoteField(t.date),
      quoteField(t.description),
      quoteField(t.category),
      quoteField(t.type),
      quoteField(t.amount),
    ]);
    const csv = [headers.map(quoteField), ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finpulse_transactions_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20 md:pb-8 flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-display font-semibold">Transaction History</h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={exportCSV}
            className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-3 py-2 bg-surface hover:bg-muted/20 text-muted hover:text-white border border-border rounded-lg text-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="sm:inline">Export CSV</span>
          </button>
          {role === 'admin' && (
            <button 
              onClick={handleAdd}
              className="flex-1 sm:flex-none justify-center bg-accent hover:bg-accent/80 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" /> <span className="sm:inline">Add Transaction</span>
            </button>
          )}
        </div>
      </div>

      <FilterBar />

      <div className="bg-card border border-border rounded-xl shadow-lg shadow-black/20 overflow-hidden flex-1">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 text-center text-muted">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4">
              <Inbox className="w-8 h-8 opacity-50" />
            </div>
            <p className="font-medium text-white mb-1">No transactions found</p>
            <p className="text-sm">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {filteredItems.map(t => (
              <TransactionRow key={t.id} transaction={t} onEdit={handleEdit} />
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <AddTransactionModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          initialData={editingTransaction} 
        />
      )}
    </div>
  );
};
