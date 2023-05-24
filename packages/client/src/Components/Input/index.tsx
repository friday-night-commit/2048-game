import React, { FC, useCallback, useState } from 'react';
import InputValidator, {
  ValidatorTypes,
} from '../../Utils/Validators/InputValidator';
import './index.scss';
import { Input as TWInput } from '@material-tailwind/react';

type InputProps = {
  placeholder?: string;
  required?: boolean;
  label?: string;
  name: string;
  type?: string;
  validationType: ValidatorTypes;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const Input: FC<InputProps> = ({
  required,
  placeholder,
  type,
  name,
  label,
  validationType,
  onChange,
}: InputProps) => {
  const [error, setError] = useState('');

  const handleChange = useCallback(function (
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!e) {
      return;
    }
    const target = e.target as HTMLInputElement;
    const validator = new InputValidator(target, validationType);
    validator.check();
    const error = validator.getError();
    setError(error);
    if (onChange) onChange(e);
  },
  []);

  return (
    <div className='default-input'>
      <TWInput
        className='px-5 py-2 outline-none'
        name={name}
        label={label}
        type={type}
        required={required}
        onBlur={e => handleChange(e)}
        placeholder={placeholder}
      />
      <span className='default-input__error' data-testid='error-element'>
        {error}
      </span>
    </div>
  );
};

export default Input;
