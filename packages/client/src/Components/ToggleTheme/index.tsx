import React, { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {

    const storedPrefs = window.localStorage.getItem('color-theme');
    if (storedPrefs) {
      return storedPrefs;
    }
  }

  return 'light';
};

const ToggleTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  if (typeof window !== 'undefined') {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(theme);

    localStorage.setItem('color-theme', theme);
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
