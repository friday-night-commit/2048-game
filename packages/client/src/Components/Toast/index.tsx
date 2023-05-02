import { FC } from 'react';

type TOwnProps = {
  text: string;
};

const Toast: FC<TOwnProps> = ({ text }) => {
  return (
    <div
      id="toast-warning"
      className="flex items-center w-full max-w-xs p-4 space-x-2 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800 mb-2"
      role="alert">
      <svg
        aria-hidden="true"
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path
          className="fill-red-500"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"></path>
      </svg>
      <div className="pl-4 text-sm font-normal">{text}</div>
    </div>
  );
};

export default Toast;
