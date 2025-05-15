import React from 'react';
import { Header, InputForm, SavedList } from './features';
import { Stack } from '@mui/material';

export default function Popup() {
  return (
    <Stack p='1rem' width='100%' height='100%' gap='0.5rem'>
      <Header />
      <InputForm />
      <SavedList />
    </Stack>
  );
}
