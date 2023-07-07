import React, { useCallback, useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../../Utils/ThemeProvider';
 import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getThemeByName, getUserTheme } from '../../store/slices/Theme';

const ThemeToggler = () => {
  const { theme, setTheme } = useContext(ThemeContext);

   const dispatch = useAppDispatch();
   const user = useAppSelector(store => store.userSlice.user);

  const settingTheme = useCallback(
    function () {
      dispatch(getThemeByName('dark')).then(data => {
        setTheme(data.payload.name);
      });
    },[]
  );
  const isDark = theme === 'dark';

  return (
    <div className='toggle-button'>
      {(isDark
        ? (<FaSun onClick={settingTheme}/>)
        : (<FaMoon onClick={settingTheme} />)
      )}
    </div>
  );
};

export default ThemeToggler;
