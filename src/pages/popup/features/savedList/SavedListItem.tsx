import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { FC } from 'react';
import { CopyButton } from '../shared';

const SavedListItem: FC<{ id: string }> = ({ id }) => {
  return (
    <Accordion key={id} id={`${id}-key`}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          width='100%'
        >
          <Typography variant='body1' noWrap>
            {id}
          </Typography>
          <CopyButton copyValue={id} title='Copy Value' />
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction='column' alignItems='center' spacing={1}>
          <Typography variant='body1' noWrap>
            {id}
          </Typography>
          <Stack direction='column' alignItems='flex-end'>
            <Typography variant='body1'>charcters: </Typography>
            <Typography variant='body1'>bytes: </Typography>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default SavedListItem;
