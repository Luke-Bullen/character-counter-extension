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
  },
});

export const { setOrder, setSavedEntries } = listSlice.actions;
export default listSlice.reducer;
