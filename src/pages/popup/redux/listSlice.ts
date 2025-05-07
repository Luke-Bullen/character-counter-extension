import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EntityObjectType } from '../features/shared';

type ListType = {
  listOrder: string[];
  savedEntries: Record<string, EntityObjectType>;
  deleteKey: string;
};

const initialState: ListType = {
  listOrder: [],
  savedEntries: {},
  deleteKey: '',
};

const listSlice = createSlice({
  name: 'listSlice',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<string[]>) => {
      state.listOrder = action.payload;
    },
    setSavedEntries: (
      state,
      action: PayloadAction<Record<string, EntityObjectType>>,
    ) => {
      state.savedEntries = action.payload;
    },
    addItem: (
      state,
      action: PayloadAction<{ key: string; value: EntityObjectType }>,
    ) => {
      state.listOrder.push(action.payload.key);
      state.savedEntries[action.payload.key] = action.payload.value;
    },
  },
});

export const { setOrder, setSavedEntries, addItem } = listSlice.actions;
export default listSlice.reducer;
