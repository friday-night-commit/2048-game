import React, { FC, useEffect, useState } from 'react';

const getInitialTheme = (): string => {
  if (typeof window !== 'undefined' && window.localStorage) {
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

const initialTheme: string = getInitialTheme();

type ThemeProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const defaultValue: TOwnProps = {
  theme: initialTheme,
  setTheme: () => {},
};

export const ThemeContext = React.createContext(defaultValue);

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  const rawSetTheme = (theme: string) => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(theme);

    localStorage.setItem('color-theme', theme);
  };

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
