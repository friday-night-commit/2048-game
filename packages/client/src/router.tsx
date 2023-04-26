import Auth from './pages/Auth'
import {
  createBrowserRouter
} from 'react-router-dom'

export enum routes {
  mainPage = "/",
  authPage = "/auth",
  registerPage = "/register"
}

export default createBrowserRouter(
  [
    {path:routes.mainPage, element: ""},
    {path:routes.authPage, element: <Auth />},
    {path:routes.registerPage, element: ""},
  ]
)
