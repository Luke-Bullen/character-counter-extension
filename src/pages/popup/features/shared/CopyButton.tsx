import { IconButton } from '@mui/material';
import { ContentCopyRounded } from '@mui/icons-material';
import { FC, useCallback } from 'react';

const CopyButton: FC<{ copyValue: string }> = ({ copyValue }) => {
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(copyValue);
    } catch (err) {
      console.error('Failed to copy text.', err);
    }
  }, [copyValue]);

  return (
    <IconButton onClick={handleCopy}>
      <ContentCopyRounded />
    </IconButton>
  );
};

export default CopyButton;
