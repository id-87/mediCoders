import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Components/Auth/Signup'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <h1>Welcome to medicoders</h1>
      <Signup/>    
      </>
  )
}

export default App
