import React, { useCallback, useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../../Utils/ThemeProvider';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getThemeByName, getUserTheme, updateUserTheme } from '../../store/slices/Theme'
import { getReactionsByPostId } from '../../store/slices/Reaction'
import { Reaction } from '../../pages/Forum/forum.interfaces'
import { Theme, ThemeUser } from './theme.interfaces'

const ThemeToggler = () => {
  const { theme, setTheme } = useContext(ThemeContext);

   const dispatch = useAppDispatch();
   const user = useAppSelector(store => store.userSlice.user);

  // dispatch(getReactionsByPostId(Number(topicId))).then(data => {
  //   const reactions = data.payload as Reaction[];
  //   if (reactions.length) {
  //     setReactions(reactions);
  //   }
  // });

  const settingTheme = (color: string) => useCallback(
    function () {
      dispatch(getThemeByName(color)).then(data => {
        const themeId = data.payload.id;
        const userId = user.id;
        if(themeId && user) {
          dispatch(updateUserTheme({ themeId, userId } as ThemeUser)). then(()=>
            {
              setTheme(color);
            }
          );
        }
      });
    },[]
  );

  const isDark = theme === 'dark';

  return (
    <div className='toggle-button'>
      {(isDark
        ? (<FaSun onClick={settingTheme('light')}/>)
        : (<FaMoon onClick={settingTheme('dark')} />)
      )}
    </div>
  );
};

export default ThemeToggler;
