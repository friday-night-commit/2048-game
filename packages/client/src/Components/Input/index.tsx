import React, { FC, useCallback, useState } from 'react';
import InputValidator, {
  ValidatorTypes,
} from '../../Utils/Validators/InputValidator';
import './index.scss';

type TOwnProps = {
  placeholder?: string;
  required?: boolean;
  label?: string;
  name: string;
  type?: string;
  validationType: ValidatorTypes;
  error?: string;
};

type TProps = FC<TOwnProps>;

const Input: TProps = ({
  required,
  placeholder,
  type,
  name,
  label,
  validationType,
}) => {
  const [error, setError] = useState('');

  const handleError = useCallback(function (
    e: React.SyntheticEvent<HTMLInputElement>
  ) {
    // eslint-disable-next-line no-console
    console.log('handleError', e);
  },
  []);

  const handleChange = useCallback(function (
    e: React.FormEvent<HTMLInputElement>
  ) {
    if (!e) {
      return;
    }
    const target = e.target as HTMLInputElement;
    const validator = new InputValidator(target, validationType);
    validator.check();
    const error = validator.getError();
    setError(error);
  },
  []);

  return (
    <div className="initial-input">
      <label className="initial-input__label" htmlFor={name}>
        {label}
      </label>
      <div className="initial-input__block">
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          name={name}
          type={type}
          required={required}
          onBlur={el => handleChange(el)}
          onError={err => handleError(err)}
          placeholder={placeholder}
        />
      </div>
      <span className="initial-input__error">{error}</span>
    </div>
  );
};

export default Input;
