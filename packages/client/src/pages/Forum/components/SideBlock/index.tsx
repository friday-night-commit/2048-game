import React, { FC } from 'react';
import { Typography } from '@material-tailwind/react';

type TOwnProps = {
  title?: string;
  children: JSX.Element | JSX.Element[];
};

type TProps = FC<TOwnProps>;

export const SideBlock: TProps = ({ title, children }: TOwnProps) => {
  return (
    <div className='mb 20 shadow p-4 rounded-lg bg-white'>
      {title && (
        <Typography variant='h6' className='pl-pr-4 pt-0 pb-4'>
          {title}
        </Typography>
      )}
      {children}
    </div>
  );
};
