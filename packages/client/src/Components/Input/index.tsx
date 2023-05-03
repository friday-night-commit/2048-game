import { FC } from 'react';

type TOwnProps = {
  id?: string;
  placeholder?: string;
  additionalClasses?: string;
  required?: boolean;
  label?: string;
  name: string;
  type?: string;
  error?: string;
};

type TProps = FC<TOwnProps>;

const Input: TProps = ({
  id,
  required,
  placeholder,
  type,
  name,
  label,
  additionalClasses,
}) => {
  return (
    <label className="form__label">
      {label && <span className="block mb-1">{label}</span>}
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${additionalClasses}`}
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
      />
    </label>
  );
};

export default Input;
