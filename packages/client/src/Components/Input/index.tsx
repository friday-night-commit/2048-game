import React, { FC, useCallback, useState } from 'react';
import InputValidator, {
  ValidatorTypes,
} from '../../Utils/Validators/InputValidator';
import './index.scss';
import { Input as TWInput } from '@material-tailwind/react';

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
}: TOwnProps) => {
  const [error, setError] = useState('');

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
    <div className='default-input__block'>
      <TWInput
        className='px-5 py-2 outline-none'
        name={name}
        label={label}
        type={type}
        required={required}
        onBlur={el => handleChange(el)}
        placeholder={placeholder}
      />
      <span className='default-input__error'>{error}</span>
    </div>
  );
};

export default Input;
