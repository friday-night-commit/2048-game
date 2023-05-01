import { RouterProvider } from 'react-router-dom'
import router from './router'
import Canvas from './Components/Game/Canvas/Canvas'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Canvas width={300} height={300} />
    </>
  )
}

export default App
