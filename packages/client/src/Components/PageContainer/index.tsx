import { FC } from 'react';

import Navbar from '../../Components/Navbar';

import './index.scss';

type TOwnProps = {
  children: JSX.Element | JSX.Element[];
};

const PageContainer: FC<TOwnProps> = ({ children }) => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className='page-container'>{children}</div>
    </div>
  );
};

export default PageContainer;
