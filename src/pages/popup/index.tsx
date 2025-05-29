import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@pages/popup/index.css';
import '@assets/styles/tailwind.css';
import Popup from '@pages/popup/Popup';
import { ThemeProvider } from '@mui/material';
import { store } from './redux';
import { lightTheme, darkTheme } from './features/shared';

const init = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    store.getState().theme.darkTheme,
  );

  store.subscribe(() => {
    setIsDarkTheme(store.getState().theme.darkTheme);
  });

  const rootContainer = document.querySelector('#__root');
  if (!rootContainer) throw new Error("Can't find Popup root element");
  const root = createRoot(rootContainer);
  root.render(
    <StrictMode>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <Popup />
      </ThemeProvider>
    </StrictMode>,
  );
};

init();
