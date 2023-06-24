import React, { useState,useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../../Utils/ThemeContext';

const ToggleTheme = () => {
  const [theme, setTheme] = useState(useContext(ThemeContext));

  if (typeof window !== 'undefined') {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(theme);
  }
  return (
    <div className='toggle-button'>
      {(theme === 'dark'
        ? (<FaSun onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}/>)
        : (<FaMoon onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />)
      )}
    </div>
  );
};

export default ToggleTheme;
