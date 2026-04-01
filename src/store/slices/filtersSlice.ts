import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TransactionCategory, TransactionType, SortField, SortOrder } from '../../types';

interface FiltersState {
  search: string;
  category: TransactionCategory | 'all';
  type: TransactionType | 'all';
  sortField: SortField;
  sortOrder: SortOrder;
}

const initialState: FiltersState = {
  search: '',
  category: 'all',
  type: 'all',
  sortField: 'date',
  sortOrder: 'desc',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setCategory: (state, action: PayloadAction<TransactionCategory | 'all'>) => {
      state.category = action.payload;
    },
    setType: (state, action: PayloadAction<TransactionType | 'all'>) => {
      state.type = action.payload;
    },
    setSortField: (state, action: PayloadAction<SortField>) => {
      state.sortField = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const { setSearch, setCategory, setType, setSortField, setSortOrder, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
