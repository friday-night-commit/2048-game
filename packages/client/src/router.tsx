import { createBrowserRouter } from 'react-router-dom'

import routes from './routes'

import MainPage from './pages/Main'
import AuthPage from './pages/Auth'
import NoMatch from './pages/NoMatch'

export default createBrowserRouter(
  [
    { path: routes.mainPage, element: <MainPage /> },
    { path: routes.authPage, element: <AuthPage /> },
    { path: '*', element: <NoMatch /> }
  ]
)
