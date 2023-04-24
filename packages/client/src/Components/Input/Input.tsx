import { FC } from 'react'

type TOwnProps = {
  id?: string;
  placeholder?: string;
  additionalClasses?: string;
  required?: boolean;
  name: string;
  type?: string;
  error?: string;
  accept?: string;
  disabled?: boolean;
  events?: Record<string, (e?: Event) => void>;
}

type TProps = FC<TOwnProps>


const Input: TProps = ({
                         id, required, placeholder,
                         type, name, additionalClasses,
                         accept,
                         disabled
                       }) => {
  return (
    <div>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${additionalClasses}`}
        id={id}
        name={name}
        disabled={disabled}
        type={type}
        required={required}
        placeholder={placeholder}
        accept={accept}
      />
    </div>
  )
}

export default Input
