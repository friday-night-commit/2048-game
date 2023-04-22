import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import Auth from './pages/Auth'
import NoMatch from './pages/NoMatch'

export enum routes {
  mainPage = '/',
  authPage = '/auth',
  registerPage = '/register'
}

export default createBrowserRouter(
  createRoutesFromElements([
    <Route path={routes.mainPage} element='' />,
    <Route path={routes.authPage} element={<Auth />}></Route>,
    <Route path='*' element={<NoMatch />}></Route>
  ])
)
