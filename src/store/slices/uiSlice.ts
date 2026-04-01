import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Role, ActiveView } from '../../types';

export interface UiState {
  role: Role;
  activeView: ActiveView;
}

export const initialState: UiState = {
  role: 'viewer',
  activeView: 'dashboard',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<Role>) => {
      state.role = action.payload;
    },
    setActiveView: (state, action: PayloadAction<ActiveView>) => {
      state.activeView = action.payload;
    },
  },
});

export const { setRole, setActiveView } = uiSlice.actions;
export default uiSlice.reducer;
