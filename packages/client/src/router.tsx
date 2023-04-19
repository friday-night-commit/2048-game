import Auth from './pages/Auth'
import App from './App'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

export default createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />} />,
    <Route path="/auth" element={<Auth />}></Route>,
  ])
)
