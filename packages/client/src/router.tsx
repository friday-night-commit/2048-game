import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import MainPage from './pages/Main'
import Auth from './pages/Auth'
import NoMatch from './pages/NoMatch'
import Profile from './pages/Profile'
import { ROUTES } from './models/enums'

export default createBrowserRouter(
  createRoutesFromElements([
    <Route path={ROUTES.mainPage} element={<MainPage />} />,
    <Route path={ROUTES.authPage} element={<Auth />}></Route>,
    <Route path={ROUTES.profilePage} element={<Profile />}></Route>,
    <Route path='*' element={<NoMatch />}></Route>
  ])
)
