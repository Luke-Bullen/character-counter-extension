import browser from 'webextension-polyfill';
import { FC } from 'react';
import { Stack, TextField } from '@mui/material';
import useCharacterCount from './useCharacterCount';
import useByteCount from './useByteCount';
import { EntityObjectType } from '../shared';
import { v4 as uuidv4 } from 'uuid';
import { store, addItem } from '../../redux';
import { FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
import InputValues from './InputValues';
import Alias from './Alias';
import Actions from './Actions';

export type FormValues = {
  input: string;
  alias: string;
  saving: boolean;
};

const generateUniqueId = async (attempt: number = 0): Promise<string> => {
  if (attempt >= 5) console.error('Unable to generate unique id');

  const id = uuidv4();
  const result = await browser.storage.local.get(id);
  if (id in result) return generateUniqueId(attempt + 1);
  return id;
};

const validationSchema = yup.object({
  input: yup.string().required().max(5000),
  alias: yup.string().required().max(25),
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
