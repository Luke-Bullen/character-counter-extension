import React, { useEffect, useState } from 'react';
import { Header, InputForm, SavedList } from './features';
import { Stack, ThemeProvider } from '@mui/material';
import { store } from './redux';
import { darkTheme, lightTheme, theme } from './features/shared';

export default function Popup() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setIsDarkTheme(store.getState().theme.darkTheme);
    });
    return unsubscribe;
  }, []);

  return (
    // <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
    <ThemeProvider theme={theme}>
      <Stack p='1rem' width='100%' height='100%' gap='0.5rem'>
        <Header />
        <InputForm />
        <SavedList />
      </Stack>
    </ThemeProvider>
  );
}
