import { FC } from 'react';

type preloaderProps = {
  children?: JSX.Element | JSX.Element[];
};

const Preloader: FC<preloaderProps> = ({ children }) => {
  return (
    <div className='text-center preloader'>
      {children || 'Идёт получение данных...'}
    </div>
  );
};

export default Preloader;
