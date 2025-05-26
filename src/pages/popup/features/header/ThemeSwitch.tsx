import { Switch } from '@mui/material';
import { store, switchTheme } from '../../redux';
import { FC, useState } from 'react';

const ThemeSwitch: FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    store.getState().theme.darkTheme,
  );

  const handleClick = () => {
    store.dispatch(switchTheme());
    setIsDarkTheme(store.getState().theme.darkTheme);
  };

  return <Switch checked={isDarkTheme} onChange={handleClick} />;
};

export default ThemeSwitch;
