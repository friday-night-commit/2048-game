import { RouterProvider } from 'react-router-dom'
import router from './router'
import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <>
      <h1 className="App ui red header">
        Вот тут будет жить ваше приложение :)
      </h1>

      <RouterProvider router={router} />
    </>
  )
}

export default App
