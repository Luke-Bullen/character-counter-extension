import { FC } from 'react';
import { useFormikContext } from 'formik';
import { IconButton, Stack } from '@mui/material';
import { CopyButton, Tooltip } from '../shared';
import { Cancel, SaveAsRounded } from '@mui/icons-material';
import { FormValues } from './InputForm';

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

export default Actions;
