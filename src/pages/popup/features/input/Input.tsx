import browser from 'webextension-polyfill';
import { IconButton, Stack, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';
import useCharacterCount from './useCharacterCount';
import useByteCount from './useByteCount';
import { CopyButton, Tooltip, EntityObjectType } from '../shared';
import { Cancel, SaveAsRounded, SaveRounded } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { store, addItem } from '../../redux';

const InputValues: FC<{ characterCount: number; byteCount: number }> = ({
  characterCount,
  byteCount,
}) => (
  <Stack direction='column' alignItems='flex-end'>
    <Typography variant='body1'>Characters: {characterCount}</Typography>
    <Typography variant='body1'>Bytes: {byteCount}</Typography>
  </Stack>
);

const Actions: FC<{
  inputValue: string;
  isSaving: boolean;
  setIsSaving: (isSaving: boolean) => void;
}> = ({ inputValue, isSaving, setIsSaving }) => {
  const handleSave = () => {
    setIsSaving(!isSaving);
  };

  const SaveButton = () => (
    <Tooltip title={isSaving ? 'Cancel' : 'Save As'}>
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

const Alias: FC<{
  defaultValue: string;
  handleSave: (value: string) => void;
}> = ({ defaultValue, handleSave }) => {
  const [aliasValue, setAliasValue] = useState<string>(defaultValue);

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='center'
      p='0.5rem'
      gap='0.5rem'
    >
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
        <IconButton onClick={() => handleSave(aliasValue)} size='medium'>
          <SaveRounded />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

const generateUniqueId = async (attempt: number = 0): Promise<string> => {
  if (attempt >= 5) console.error('Unable to generate unique id');

  const id = uuidv4();
  const result = await browser.storage.local.get(id);
  if (id in result) return generateUniqueId(attempt + 1);
  return id;
};

const Input: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const inputCharacterCountValue = useCharacterCount(inputValue);
  const inputByteCountValue = useByteCount(inputValue);

  const handleSave = async (alias: string) => {
    try {
      const valueObject: EntityObjectType = {
        alias: alias,
        value: inputValue,
        characterCount: inputCharacterCountValue,
        byteCount: inputByteCountValue,
      };

      const id = await generateUniqueId();

      console.log('saved', id, valueObject);

      store.dispatch(addItem({ key: id, value: valueObject }));

      setIsSaving(false);
      setInputValue('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Stack direction='column' alignItems='center' gap='0.5rem'>
        <TextField
          multiline
          maxRows={4}
          sx={{ width: '100%' }}
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
          <InputValues
            characterCount={inputCharacterCountValue}
            byteCount={inputByteCountValue}
          />
          <Actions
            inputValue={inputValue}
            isSaving={isSaving}
            setIsSaving={setIsSaving}
          />
        </Stack>
        {isSaving && (
          <Alias defaultValue={inputValue} handleSave={handleSave} />
        )}
      </Stack>
    </>
  );
};

export default Input;
