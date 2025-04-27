import { Tooltip as MUITooltip } from '@mui/material';
import { FC, ReactElement } from 'react';

const Tooltip: FC<{ title: string; children: ReactElement }> = ({
  title,
  children,
}) => (
  <MUITooltip
    title={title}
    arrow
    enterDelay={1000}
    slotProps={{
      popper: {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -8],
            },
          },
        ],
      },
    }}
  >
    {children}
  </MUITooltip>
);

export default Tooltip;
