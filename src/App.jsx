import { useState } from 'react'
import {  Route, Routes } from 'react-router-dom'
import './App.css'
import Changebox from './pages/Changebox'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>


     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/changebox' element={<Changebox/>}></Route>
      <Route path='/document' element={<Document/>}></Route>
     </Routes>
    </>
  )
}

export default App