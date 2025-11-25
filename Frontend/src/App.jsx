import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Components/Auth/Signup'
import Login from './Components/Auth/Login'
import Home from './Components/Home/Home'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <h1>Welcome to medicoders</h1>
      <Home/>   
      </>
  )
}

export default App
