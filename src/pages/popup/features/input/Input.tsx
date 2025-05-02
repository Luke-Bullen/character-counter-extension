import { IconButton, Stack, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';
import useCharacterCount from './useCharacterCount';
import useByteCount from './useByteCount';
import { CopyButton } from '../shared';
import { SaveRounded } from '@mui/icons-material';

const InputValues: FC<{ inputValue: string }> = ({ inputValue }) => {
  const inputCharacterCountValue = useCharacterCount(inputValue);
  const inputByteCountValue = useByteCount(inputValue);

  return (
    <Stack direction="column" alignItems="flex-end">
      <Typography variant="body1">
        Characters: {inputCharacterCountValue}
      </Typography>
      <Typography variant="body1">Bytes: {inputByteCountValue}</Typography>
    </Stack>
  );
};

const Actions: FC<{ inputValue: string }> = ({ inputValue }) => {
  const handleSave = () => {
    console.log('save clicked');
  };
  return (
    <Stack direction="row">
      <CopyButton copyValue={inputValue} />
      <IconButton onClick={handleSave}>
        <SaveRounded />
      </IconButton>
    </Stack>
  );
};

const Input: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [saving, setSaving] = useState(false)

  return (
    <>
      <Stack>
        <TextField
          variant="outlined"
          multiline
          maxRows={4}
          sx={{ background: 'white', width: '95%' }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          slotProps={{ htmlInput: { maxLength: 5000 } }}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <InputValues inputValue={inputValue} />
          <Actions inputValue={inputValue} />
          {saving && <p>set alias</p>}
        </Stack>
      </Stack>
    </>
  );
};

export default Input;
