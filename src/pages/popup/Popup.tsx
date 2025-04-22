import React from 'react';
import { Header, Input, SavedList } from '@pages/popup/components';
import { Stack } from '@mui/material';

export default function Popup() {
  return (
      <Stack p="1rem" width="100%" height="100%">
        <Header />
        <Input />
        <SavedList />
      </Stack>
  );
}
