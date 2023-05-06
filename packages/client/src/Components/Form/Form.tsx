import { FC, FormEvent } from 'react';

type TOwnProps = {
  className: string
  handlerSubmit: (e: FormEvent<HTMLFormElement>) => void
  children?: JSX.Element | JSX.Element[]
};

type TProps = FC<TOwnProps>;

const Form: TProps = props => {
  const { children, handlerSubmit, className } = props;
  return (
    <form className={className} onSubmit={handlerSubmit}>{children}</form>
  );
};

export default Form;
