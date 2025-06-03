import { Switch, useColorScheme } from '@mui/material';
import { FC } from 'react';

const ThemeSwitch: FC = () => {
  //   const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
  //     store.getState().theme.darkTheme,
  //   );

  const { mode, setMode } = useColorScheme();

  //     const handleClick = () => {
  //     store.dispatch(switchTheme());
  //     setIsDarkTheme(store.getState().theme.darkTheme);
  //   };

  return (
    <Switch
      checked={mode === 'dark'}
      onChange={() => setMode(mode === 'dark' ? 'light' : 'dark')}
    />
  );
};

export default ThemeSwitch;
