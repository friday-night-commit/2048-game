import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import MainPage from './pages/Main'
import Auth from './pages/Auth'
import NoMatch from './pages/NoMatch'

export enum routes {
  mainPage = '/',
  authPage = '/auth',
  registerPage = '/register',
  profilePage = '/profile',
  liderboardPage = '/liderboard',
  forumPage = '/forum',
  gamePage = '/game'
}

export default createBrowserRouter(
  createRoutesFromElements([
    <Route path={routes.mainPage} element={<MainPage />} />,
    <Route path={routes.authPage} element={<Auth />}></Route>,
    <Route path='*' element={<NoMatch />}></Route>
  ])
)
