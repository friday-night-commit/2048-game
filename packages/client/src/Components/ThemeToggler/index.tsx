import React, { useCallback, useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../../Utils/ThemeProvider';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getThemeByName, updateUserTheme } from '../../store/slices/Theme';
import { useCSRFToken } from '../../hooks/useCSRFToken';

const ThemeToggler = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const dispatch = useAppDispatch();
  const user = useAppSelector(store => store.userSlice.user);
  const token = useCSRFToken();
  const isDark = theme === 'dark';

  const settingTheme = (color: string) => useCallback(
    function() {
      dispatch(getThemeByName(color)).then(data => {
        // @ts-ignore
        const themeId = data.payload.id;
        if (themeId && user) {
          const userId = user.id;
          const data = {
            themeId,
            userId
          };
          dispatch(updateUserTheme({ data, token })).then(() => {
              setTheme(color);
            }
          );
        }
      });
    }, [color]
  );

  return (
    <div className='toggle-button'>
      {(isDark
          ? (<FaSun onClick={settingTheme('light')} />)
          : (<FaMoon onClick={settingTheme('dark')} />)
      )}
    </div>
  );
};

export default ThemeToggler;
