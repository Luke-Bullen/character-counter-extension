import { Stack, Switch, Typography } from '@mui/material';

const Header = () => {
  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center'>
      <Typography variant='h5' color='black'>
        Character Counter
      </Typography>
      <Switch />
    </Stack>
  );
};

export default Header;
