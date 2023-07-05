import React, { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../../Utils/ThemeProvider';
// import { useAppDispatch, useAppSelector } from '../../hooks/redux'
// import { getThemeByName, updateThemeForUser, updateUserTheme } from '../../store/slices/Theme'

const ThemeToggler = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  // const dispatch = useAppDispatch();
  // const user = useAppSelector(store => store.userSlice.user);
  // dispatch(updateThemeForUser(theme));
  // const themeFromDb = dispatch(getThemeByName(theme));
  // // @ts-ignore
  // dispatch(updateUserTheme({ userId: user.id, themeId: themeFromDb.id } ));

  const isDark = theme === 'dark';

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
