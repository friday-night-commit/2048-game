import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import routes from './routes'

import MainPage from './pages/Main'
import AuthPage from './pages/Auth'
import GamePage from './pages/Game'
import NoMatch from './pages/NoMatch'
import ProfilePage from './pages/Profile'

export default createBrowserRouter(
  createRoutesFromElements([
    <Route path={routes.mainPage} element={<MainPage />} />,
    <Route path={routes.authPage} element={<AuthPage />} />,
    <Route path={routes.gamePage} element={<GamePage />} />,
    <Route path={routes.profilePage} element={<ProfilePage />} />,
    <Route path='*' element={<NoMatch />} />
  ])
)
