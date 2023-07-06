import React, { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../../Utils/ThemeProvider';

const ThemeToggler = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const isDark = theme === 'dark';

  return (
    <div className='toggle-button'>
      {isDark ? (
        <FaSun onClick={() => setTheme('light')} />
      ) : (
        <FaMoon onClick={() => setTheme('dark')} />
      )}
    </div>
  );
};

export default ThemeToggler;
