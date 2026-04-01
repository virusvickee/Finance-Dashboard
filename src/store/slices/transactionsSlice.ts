import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Transaction } from '../../types';
import { transactionsData } from '../../data/transactions';

export interface TransactionsState {
  items: Transaction[];
}

export const initialState: TransactionsState = {
  items: transactionsData,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.items.push(action.payload);
    },
    editTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.items.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
  },
});

export const { addTransaction, editTransaction, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
