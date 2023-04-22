import Auth from './pages/Auth'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

export enum routes {
  mainPage = "/",
  authPage = "/auth",
  registrationPage = "/registration"
}

export default createBrowserRouter(
  createRoutesFromElements([
    <Route path={routes.mainPage} element="" />,
    <Route path={routes.authPage} element={<Auth />}></Route>,
  ])
)
