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

export default createBrowserRouter(
  createRoutesFromElements([
    <Route path={routes.mainPage} element={<MainPage />} />,
    <Route path={routes.authPage} element={<AuthPage />} />,
    <Route path={routes.gamePage} element={<GamePage />} />,
    <Route path='*' element={<NoMatch />} />
  ])
)
