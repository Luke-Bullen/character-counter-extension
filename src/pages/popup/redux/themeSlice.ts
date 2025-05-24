import { createSlice } from '@reduxjs/toolkit';

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
    switchTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
  },
});

export const { switchTheme } = themeSlice.actions;
export default themeSlice.reducer;
