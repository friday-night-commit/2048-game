import { FC } from 'react';
import { Navbar as MaterialNavbar, Typography } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import './index.module.scss'
import { ROUTES } from '../../models/enums'

type TNavbarItemProps = {
  url: string
  title: string
}

const NavbarItem: FC<TNavbarItemProps> = ({ url, title }) => {
  return (
    <Typography
      as='li'
      variant='h6'
      className='p-1 font-normal'
    >
      <Link to={url} className='flex items-center'>
        {title}
      </Link>
    </Typography>
  )
}

const NAVBAR_ITEMS = [
  {
    url: ROUTES.profilePage,
    title: 'Мой профиль'
  }, {
    // url: routes.liderboardPage,
    url: '234',
    title: 'Рейтинг игроков'
  }, {
    // url: routes.forumPage,
    url: '345',
    title: 'Форум'
  }
]

export default function Navbar() {
  return (
    <MaterialNavbar className='navbar mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4'>
      <div className='container mx-auto flex items-center justify-between'>
        <Typography
          as={Link}
          to={ROUTES.mainPage}
          variant='h1'
          className='mr-4 cursor-pointer py-1.5 title'
        >
          2048
        </Typography>
        <div className='hidden lg:block'>
          <ul className='mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
            {NAVBAR_ITEMS.map(({ url, title }) => <NavbarItem key={url} url={url} title={title} />)}
          </ul>
        </div>
        <span className='score-container'>
          Максимум сегодня: 4096
        </span>
      </div>
    </MaterialNavbar>
  )
}
