import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { DeleteRounded, ExpandMore } from '@mui/icons-material';
import { FC } from 'react';
import { CopyButton, EntityObjectType, Tooltip } from '../shared';
import { removeItem, store } from '../../redux';

const DeleteButton: FC<{ id: string }> = ({ id }) => {
  const handleDelete = () => {
    try {
      console.log('deleting', id);
      store.dispatch(removeItem(id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Tooltip title='Delete'>
      <IconButton onClick={handleDelete}>
        <DeleteRounded />
      </IconButton>
    </Tooltip>
  );
};

const SavedListItem: FC<{ id: string; entityProperties: EntityObjectType }> = ({
  id,
  entityProperties,
}) => {
  const { alias, value, characterCount, byteCount } = entityProperties;

  const ValueTypography = styled(Typography)({
    fontWeight: 'bold',
    width: '90%',
    overflow: 'scroll',
    height: '40px',
  });

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
          <ValueTypography variant='body1'>{value}</ValueTypography>
          <Stack direction='row' justifyContent='space-between' width='100%'>
            <Stack direction='column' alignItems='flex-start' width='100%'>
              <Typography variant='body2'>
                Charcters: {characterCount}
              </Typography>
              <Typography variant='body2'>Bytes: {byteCount}</Typography>
            </Stack>
            <DeleteButton id={id} />
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default SavedListItem;
