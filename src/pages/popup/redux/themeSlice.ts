import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeType = {
  darkTheme: boolean;
};

const initialState: ThemeType = {
  darkTheme: true,
};

const themeSlice = createSlice({
  name: 'themeSlice',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.darkTheme = action.payload;
    },
    switchTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
  },
});

export const { setTheme, switchTheme } = themeSlice.actions;
export default themeSlice.reducer;
