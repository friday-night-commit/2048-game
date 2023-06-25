import React, { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../../Utils/ThemeProvider';

const ThemeToggler = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  console.log(theme)
  // if (typeof window !== 'undefined' && window.localStorage && theme === undefined) {
  //   theme = window.localStorage.getItem('color-theme');
  // }
  const isDark = theme === 'dark';
  console.log(isDark)

  return (
    <div className='toggle-button'>
      {(isDark
        ? (<FaSun onClick={() => setTheme('light')}/>)
        : (<FaMoon onClick={() => setTheme('dark')} />)
      )}
    </div>
  );
};

export default ThemeToggler;
