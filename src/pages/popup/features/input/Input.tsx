import { IconButton, Stack, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';
import useCharacterCount from './useCharacterCount';
import useByteCount from './useByteCount';
import { CopyButton, Tooltip } from '../shared';
import { Cancel, SaveAsRounded, SaveRounded } from '@mui/icons-material';

const InputValues: FC<{ inputValue: string }> = ({ inputValue }) => {
  const inputCharacterCountValue = useCharacterCount(inputValue);
  const inputByteCountValue = useByteCount(inputValue);

  return (
    <Stack direction='column' alignItems='flex-end'>
      <Typography variant='body1'>
        Characters: {inputCharacterCountValue}
      </Typography>
      <Typography variant='body1'>Bytes: {inputByteCountValue}</Typography>
    </Stack>
  );
};

const Actions: FC<{
  inputValue: string;
  isSaving: boolean;
  setIsSaving: (isSaving: boolean) => void;
}> = ({ inputValue, isSaving, setIsSaving }) => {
  const handleSave = () => {
    setIsSaving(!isSaving);
  };

  const SaveButton = () => (
    <Tooltip title='Save as'>
      <IconButton onClick={handleSave}>
        {isSaving ? <Cancel /> : <SaveAsRounded />}
      </IconButton>
    </Tooltip>
  );

  return (
    <Stack direction='row'>
      <CopyButton copyValue={inputValue} />
      <SaveButton />
    </Stack>
  );
};

const Alias: FC<{ defaultValue: string }> = ({ defaultValue }) => {
  const [aliasValue, setAliasValue] = useState(defaultValue);

  const handleSave = () => {};
  return (
    <Stack direction='row' alignItems='center' justifyContent='center' p='1rem'>
      <TextField
        label='Alias'
        placeholder='Enter alias here ...'
        multiline
        maxRows={4}
        defaultValue={defaultValue}
        value={aliasValue}
        onChange={(e) => setAliasValue(e.target.value)}
        slotProps={{ htmlInput: { maxLength: 25 } }}
      />
      <Tooltip title='Save'>
        <IconButton onClick={handleSave} size='medium'>
          <SaveRounded />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

const Input: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  return (
    <>
      <Stack direction='column' alignItems='center'>
        <TextField
          multiline
          maxRows={4}
          sx={{ width: '95%' }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          slotProps={{ htmlInput: { maxLength: 5000 } }}
        />
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          width='100%'
        >
          <InputValues inputValue={inputValue} />
          <Actions
            inputValue={inputValue}
            isSaving={isSaving}
            setIsSaving={setIsSaving}
          />
        </Stack>
        {isSaving && <Alias defaultValue={inputValue} />}
      </Stack>
    </>
  );
};

export default Input;
