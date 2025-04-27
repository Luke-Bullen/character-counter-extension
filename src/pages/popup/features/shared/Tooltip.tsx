import { Tooltip as MUITooltip } from '@mui/material';
import { FC, ReactElement } from 'react';

const Tooltip: FC<{ title: string; children: ReactElement }> = ({
  title,
  children,
}) => {
  return <MUITooltip title={title}>{children}</MUITooltip>;
};

export default Tooltip;
