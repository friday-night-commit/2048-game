import { FC, FormEvent } from 'react';

type TOwnProps = {
  className?: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children?: JSX.Element | JSX.Element[];
};

type TProps = FC<TOwnProps>;

const Index: TProps = props => {
  const { children, handleSubmit, className } = props;

  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default Index;
