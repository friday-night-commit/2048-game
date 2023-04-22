import { createBrowserRouter } from 'react-router-dom'

import Auth from './pages/Auth'
import NoMatch from './pages/NoMatch'

export enum routes {
  mainPage = '/',
  authPage = '/auth',
  registerPage = '/register'
}

export default createBrowserRouter(
  [
    {path: routes.mainPage, element: ''},
    {path: routes.authPage, element: <Auth />},
    { path: '*', element: <NoMatch /> }
  ]
)
