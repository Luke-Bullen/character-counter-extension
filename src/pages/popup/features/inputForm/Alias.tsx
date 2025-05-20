import { IconButton, Stack, TextField } from '@mui/material';
import { useFormikContext } from 'formik';
import { FC, useEffect, useRef } from 'react';
import { Tooltip } from '../shared';
import { SaveRounded } from '@mui/icons-material';
import { FormValues } from './InputForm';

const Alias: FC = () => {
  const {
    values: { input, alias, saving },
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormikContext<FormValues>();

  const aliasRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    aliasRef.current?.focus();
    setFieldValue('alias', input.slice(0, 25));
  }, [saving]);

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='center'
      p='0.5rem'
      gap='0.5rem'
    >
      <TextField
        id='alias'
        name='alias'
        label='Alias'
        placeholder='Enter alias ...'
        value={alias}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.alias && !!errors.alias}
        helperText={touched.alias && errors.alias}
        slotProps={{ htmlInput: { maxLength: 25 } }}
        inputRef={aliasRef}
      />
      <Tooltip title='Save'>
        <IconButton
          type='submit'
          size='medium'
          disabled={!!errors.alias || !!errors.input}
        >
          <SaveRounded />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default Alias;
