import { FC } from 'react';
import { Card } from '@material-tailwind/react';
import cx from 'classnames';

import './index.scss';

type TOwnProps = {
  className?: string;
  children?: JSX.Element | JSX.Element[];
};

type TProps = FC<TOwnProps>;

const CardContainer: TProps = ({ className, children }) => {
  return (
    <div className={cx('card-container', className)}>
      <Card color="white" className="p-12 max-w-md w-full" shadow={false}>
        {children}
      </Card>
    </div>
  );
};

export default CardContainer;
