import React from 'react';
import { Search, RefreshCcw } from 'lucide-react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
// Removed hook double import
import { setSearch, setCategory, setType, setSortField, setSortOrder, resetFilters } from '../../store/slices/filtersSlice';
import type { TransactionCategory, TransactionType, SortField, SortOrder } from '../../types';

export const FilterBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.filters);

  const categories: TransactionCategory[] = [ // Excluding specific type map for generic array
    'salary', 'freelance', 'investment', 'refund',
    'food', 'transport', 'shopping', 'utilities',
    'entertainment', 'health', 'education', 'rent', 'other'
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col xl:flex-row gap-4 mb-6 shadow-lg shadow-black/20">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input 
          type="text" 
          placeholder="Search descriptions..." 
          value={filters.search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="w-full bg-surface border border-border text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-accent/50 transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <select 
          value={filters.type}
          onChange={(e) => dispatch(setType(e.target.value as TransactionType | 'all'))}
          className="bg-surface border border-border text-white text-sm rounded-lg px-3 py-2.5 outline-none focus:border-accent/50 capitalize"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select 
          value={filters.category}
          onChange={(e) => dispatch(setCategory(e.target.value as TransactionCategory | 'all'))}
          className="bg-surface border border-border text-white text-sm rounded-lg px-3 py-2.5 outline-none focus:border-accent/50 capitalize"
        >
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select 
          value={`${filters.sortField}-${filters.sortOrder}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split('-') as [SortField, SortOrder];
            dispatch(setSortField(field));
            dispatch(setSortOrder(order));
          }}
          className="bg-surface border border-border text-white text-sm rounded-lg px-3 py-2.5 outline-none focus:border-accent/50"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Amount: High to Low</option>
          <option value="amount-asc">Amount: Low to High</option>
          <option value="category-asc">Category</option>
        </select>

        <button 
          onClick={() => dispatch(resetFilters())}
          className="px-4 py-2.5 bg-surface hover:bg-muted/20 border border-border rounded-lg flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
          title="Reset Filters"
        >
          <RefreshCcw className="w-4 h-4" /> Reset
        </button>
      </div>
    </div>
  );
};
