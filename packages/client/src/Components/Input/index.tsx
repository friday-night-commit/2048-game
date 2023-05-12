import { FC, InputHTMLAttributes } from 'react';

type TOwnProps = {
  id?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  label?: string;
  name: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

type TProps = FC<TOwnProps>;

const Input: TProps = ({
  id,
  required,
  placeholder,
  type,
  value,
  onChange,
  name,
  label,
  className,
}: TOwnProps) => {
  return (
    <label className='form__label'>
      {label && <span className='block mb-1'>{label}</span>}
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
