import { IconButton } from '@mui/material';
import { ContentCopyRounded } from '@mui/icons-material';
import { FC, useCallback } from 'react';
import Tooltip from './Tooltip';

const CopyButton: FC<{ copyValue: string; title?: string }> = ({
  copyValue,
  title = 'Copy',
}) => {
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(copyValue);
    } catch (err) {
      console.error('Failed to copy text.', err);
    }
  }, [copyValue]);

  return (
    <Tooltip title={title}>
      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          handleCopy();
        }}
      >
        <ContentCopyRounded />
      </IconButton>
    </Tooltip>
  );
};

export default CopyButton;
