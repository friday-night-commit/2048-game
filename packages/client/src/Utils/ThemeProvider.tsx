import React, { FC, useEffect, useState } from 'react';

const getInitialTheme = (store): string => {
  if (typeof window !== 'undefined' && window.localStorage) {
    console.log(store.getState().userSlice.user)
    const storedPrefs = window.localStorage.getItem('color-theme');
    if (storedPrefs) {
      return storedPrefs;
    }
  }

  return 'light';
};

type TOwnProps = {
  theme: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setTheme: React.Dispatch<React.SetStateAction<string>> | (() => {});
};

type ThemeProviderProps = {
  children: JSX.Element | JSX.Element[];
  store: any;
};

const defaultValue: TOwnProps = {
  theme: 'light',
  setTheme: () => {},
};


export const ThemeContext = React.createContext(defaultValue);

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, store }) => {
    const [theme, setTheme] = useState(getInitialTheme(store));

    const rawSetTheme = (theme: string) => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(theme);

    localStorage.setItem('color-theme', theme);
  };

  useEffect(() => {
    rawSetTheme(theme);
  },[theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};