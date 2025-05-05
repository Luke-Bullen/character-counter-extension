import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ValueObjType = {
  alias: string;
  value: string;
  characterCount: number;
  byteCount: number;
};

type ListType = {
  listOrder: string[];
  savedEntries: Record<string, ValueObjType>;
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
      action: PayloadAction<Record<string, ValueObjType>>,
    ) => {
      state.savedEntries = action.payload;
    },
    addItem: (
      state,
      action: PayloadAction<{ key: string; value: ValueObjType }>,
    ) => {
      state.listOrder.push(action.payload.key);
      state.savedEntries[action.payload.key] = action.payload.value;
    },
  },
});

export const { setOrder, setSavedEntries, addItem } = listSlice.actions;
export default listSlice.reducer;
