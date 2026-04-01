import { configureStore, combineReducers } from '@reduxjs/toolkit';
import transactionsReducer, { initialState as transactionsInitialState } from './slices/transactionsSlice';
import filtersReducer from './slices/filtersSlice';
import uiReducer, { initialState as uiInitialState } from './slices/uiSlice';

const rootReducer = combineReducers({
  transactions: transactionsReducer,
  filters: filtersReducer,
  ui: uiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const loadState = (): Partial<RootState> | undefined => {
  try {
    const serializedTx = localStorage.getItem('finpulse_transactions');
    const savedRole = localStorage.getItem('finpulse_role') as any;
    
    if (!serializedTx && !savedRole) return undefined;

    return {
      ...(serializedTx ? { transactions: { ...transactionsInitialState, items: JSON.parse(serializedTx) } } : {}),
      ...(savedRole ? { ui: { ...uiInitialState, role: savedRole } } : {})
    };
  } catch {
    return undefined;
  }
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
});

store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem('finpulse_transactions', JSON.stringify(state.transactions.items));
    localStorage.setItem('finpulse_role', state.ui.role);
  } catch {}
});

export type AppDispatch = typeof store.dispatch;
