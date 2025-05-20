import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

const InputValues: FC<{ characterCount: number; byteCount: number }> = ({
  characterCount,
  byteCount,
}) => (
  <Stack direction='column' alignItems='flex-end'>
    <Typography variant='body1'>Characters: {characterCount}</Typography>
    <Typography variant='body1'>Bytes: {byteCount}</Typography>
  </Stack>
);

export default InputValues;
