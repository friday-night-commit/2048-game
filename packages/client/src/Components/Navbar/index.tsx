import { FC, useEffect, useCallback } from 'react';
import { Navbar as MaterialNavbar, Typography } from '@material-tailwind/react';
import { Link, NavLink } from 'react-router-dom';

import LeaderboardController from '../../Controllers/LeaderboardController';
import useAuth from '../../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import routes from '../../routes';
import { setMaxScore } from '../../store/slices/User';

import './index.scss';
import ThemeToggler from '../ThemeToggler';

type NavbarLinkProps = {
  url: string;
  title: string;
};

const NavbarItem: FC<NavbarLinkProps> = ({ url, title }) => {
  return (
    <Typography as='li' variant='h6' className='p-1 font-normal'>
      <NavLink
        to={url}
        className={({ isActive }) =>
          isActive ? 'flex items-center active' : 'flex items-center'
        }>
        {title}
      </NavLink>
    </Typography>
  );
};

const NAVBAR_ITEMS = [
  {
    url: `/${routes.profilePage}`,
    title: 'Мой профиль',
  },
  {
    url: `/${routes.leaderboardPage}`,
    title: 'Рейтинг игроков',
  },
  {
    url: `/${routes.forumPage}`,
    title: 'Форум',
  },
];

export default function Navbar() {
  const { user } = useAuth();
  const maxScore = useAppSelector(store => store.userSlice.maxScore);
  const dispatch = useAppDispatch();

  const getLeaderboard = useCallback(async () => {
    return await LeaderboardController.getData(0, 100);
  }, []);

  useEffect(() => {
    if (user && !maxScore) {
      getLeaderboard().then(data => {
        dispatch(
          setMaxScore(
            data.filter(({ userId }) => userId === user.id)[0]
              ?.score || 0
          )
        );
      });
    }
  }, []);

  return (
    <MaterialNavbar
      className='navbar mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 dark:bg-slate-900'
      id='navbar-item-menu'>
      <div className='container mx-auto flex items-center justify-between'>
        <Typography
          as={Link}
          to={`/${routes.mainPage}`}
          variant='h1'
          className='mr-4 cursor-pointer py-1.5 title'>
          2048
        </Typography>
        <div className='hidden lg:block'>
          <ul className='mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
            {NAVBAR_ITEMS.map(({ url, title }) => (
              <NavbarItem key={url} url={url} title={title} />
            ))}
          </ul>
        </div>
        { typeof window !== 'undefined' ?
          <ThemeToggler/>
          : null
        }
        <span className='score-container'>
          {`Ваш рекорд: ${maxScore}`}
        </span>
      </div>
    </MaterialNavbar>
  );
}
