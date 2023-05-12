import { FC, FormEvent } from 'react';
import PropTypes from 'prop-types';

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

Form.propTypes = {
  children: PropTypes.any,
  handlerSubmit: PropTypes.any,
  className: PropTypes.any
};

export default Form;
