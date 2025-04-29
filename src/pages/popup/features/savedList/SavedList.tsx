import { Stack } from '@mui/material';

const SavedList = () => {
  const tempOrderArray = ['1', '2', '3'];

  return (
    <Stack direction='column'>
      {tempOrderArray.map((key) => {
        return <div key={key}>{key}</div>;
      })}
    </Stack>
  );
};

export default SavedList;
