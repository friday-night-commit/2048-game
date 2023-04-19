import Auth from './pages/Auth'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

export default createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element="" />,
    <Route path="/auth" element={<Auth />}></Route>,
  ])
)
