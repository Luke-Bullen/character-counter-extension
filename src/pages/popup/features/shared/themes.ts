import { createTheme } from '@mui/material';

export const lightTheme = createTheme({});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});