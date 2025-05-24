import { Stack, Typography } from '@mui/material';
import ThemeSwitch from './ThemeSwitch';

const Header = () => {
  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center'>
      <Typography variant='h5'>Character Counter</Typography>
      <ThemeSwitch />
    </Stack>
  );
};

export default Header;
