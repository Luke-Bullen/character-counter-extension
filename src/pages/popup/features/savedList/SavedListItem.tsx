import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { FC } from 'react';
import { CopyButton, EntityObjectType } from '../shared';

const SavedListItem: FC<{ id: string; entityProperties: EntityObjectType }> = ({
  id,
  entityProperties,
}) => {
  const { alias, value, characterCount, byteCount } = entityProperties;

  return (
    <Accordion key={id} id={`${alias}-key`}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          width='100%'
        >
          <Typography
            variant='body1'
            noWrap
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '170px',
            }}
          >
            {alias}
          </Typography>
          <CopyButton copyValue={value} title='Copy Value' />
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction='column' alignItems='center' spacing={1}>
          <Typography variant='body1' noWrap>
            {value}
          </Typography>
          <Stack direction='column' alignItems='flex-end'>
            <Typography variant='body1'>Charcters: {characterCount}</Typography>
            <Typography variant='body1'>Bytes: {byteCount}</Typography>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default SavedListItem;
