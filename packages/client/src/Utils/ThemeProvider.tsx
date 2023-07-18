import React, { FC, useEffect, useState } from 'react';
import { RootTypeStore } from '../main';
import { INITIAL_THEME } from '../Components/ThemeToggler/theme.interfaces';

const getInitialTheme = (store: RootTypeStore): string => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const themeFromDB = store.getState().userSlice.user?.theme;
    if (themeFromDB) {
      return themeFromDB;
    }

    const storedPrefs = window.localStorage.getItem('color-theme');
    if (storedPrefs) {
      return storedPrefs;
    }
  }

  return INITIAL_THEME;
};

type TOwnProps = {
  theme: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setTheme: React.Dispatch<React.SetStateAction<string>> | (() => {});
};

type ThemeProviderProps = {
  children: JSX.Element | JSX.Element[];
  store: RootTypeStore;
};

const defaultValue: TOwnProps = {
  theme: INITIAL_THEME,
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
