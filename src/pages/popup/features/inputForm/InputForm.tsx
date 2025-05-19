import browser from 'webextension-polyfill';
import { IconButton, Stack, TextField, Typography } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import useCharacterCount from './useCharacterCount';
import useByteCount from './useByteCount';
import { CopyButton, Tooltip, EntityObjectType } from '../shared';
import { Cancel, SaveAsRounded, SaveRounded } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { store, addItem } from '../../redux';
import { FormikProvider, useFormik, useFormikContext } from 'formik';
import * as yup from 'yup';

const InputValues: FC<{ characterCount: number; byteCount: number }> = ({
  characterCount,
  byteCount,
}) => (
  <Stack direction='column' alignItems='flex-end'>
    <Typography variant='body1'>Characters: {characterCount}</Typography>
    <Typography variant='body1'>Bytes: {byteCount}</Typography>
  </Stack>
);

const Actions: FC = () => {
  const {
    values: { input, saving },
    setFieldValue,
    errors,
    touched,
  } = useFormikContext<FormValues>();

  const handleSave = () => {
    setFieldValue('saving', !saving);
  };

  const SaveButton = () => (
    <Tooltip title={saving ? 'Cancel' : 'Save As'}>
      <IconButton
        onClick={handleSave}
        disabled={!saving && (!!errors.input || !touched.input)}
      >
        {saving ? <Cancel /> : <SaveAsRounded />}
      </IconButton>
    </Tooltip>
  );

  return (
    <Stack direction='row'>
      <CopyButton copyValue={input} />
      <SaveButton />
    </Stack>
  );
};

type FormValues = {
  input: string;
  alias: string;
  saving: boolean;
};

const Alias: FC = () => {
  const {
    values: { alias },
    errors,
    touched,
    handleChange,
    handleBlur,
  } = useFormikContext<FormValues>();

  const aliasRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    aliasRef.current?.focus();
  }, []);

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

const generateUniqueId = async (attempt: number = 0): Promise<string> => {
  if (attempt >= 5) console.error('Unable to generate unique id');

  const id = uuidv4();
  const result = await browser.storage.local.get(id);
  if (id in result) return generateUniqueId(attempt + 1);
  return id;
};

const validationSchema = yup.object({
  input: yup.string().required(),
  alias: yup.string().required(),
});

const InputForm: FC = () => {
  const formik = useFormik({
    initialValues: {
      input: '',
      alias: '',
      saving: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues, { resetForm }) => {
      try {
        const valueObject: EntityObjectType = {
          alias: values.alias,
          value: values.input,
          characterCount: inputCharacterCountValue,
          byteCount: inputByteCountValue,
        };

        const id = await generateUniqueId();

        console.log('saved', id, valueObject);

        store.dispatch(addItem({ key: id, value: valueObject }));

        resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const {
    values: { input, saving },
    touched,
    errors,
    handleChange,
    handleBlur,
  } = formik;

  const inputCharacterCountValue = useCharacterCount(input);
  const inputByteCountValue = useByteCount(input);

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Stack direction='column' alignItems='center' gap='0.5rem'>
          <TextField
            id='input'
            name='input'
            placeholder='Enter string ...'
            value={input}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.input && !!errors.input}
            helperText={touched.input && errors.input}
            multiline
            maxRows={4}
            sx={{ width: '100%' }}
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
            <Actions />
          </Stack>
          {saving && <Alias />}
        </Stack>
      </form>
    </FormikProvider>
  );
};

export default InputForm;
