import { Stack } from '@mui/material';
import { FC } from 'react';
import SavedListItem from './SavedListItem';

const SavedList: FC = () => {
  const tempOrderArray = ['1', '2', '3'];

  return (
    <Stack direction='column'>
      {tempOrderArray.map((id) => {
        return <SavedListItem key={id} id={id} />;
      })}
    </Stack>
  );
};

export default SavedList;
