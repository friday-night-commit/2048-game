import { RouterProvider } from 'react-router-dom'
import router from './router'
import Canvas from './Components/Game/Canvas/Canvas'
import { drawGrid } from './utils/draw'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Canvas draw={drawGrid} width={300} height={300} />
    </>
  )
}

export default App
