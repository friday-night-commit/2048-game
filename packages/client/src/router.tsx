import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import routes from './routes'

import MainPage from './pages/Main'
import Auth from './pages/Auth'
import NoMatch from './pages/NoMatch'

export default createBrowserRouter(
  createRoutesFromElements([
    <Route path={routes.mainPage} element={<MainPage />} />,
    <Route path={routes.authPage} element={<Auth />}></Route>,
    <Route path='*' element={<NoMatch />}></Route>
  ])
)
