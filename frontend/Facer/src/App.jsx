import { useState } from 'react'
import FaceAuth from './pages/FaceAuth'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'

import './App.css'

function App() {
  return(

    <div>

      <BrowserRouter>

      <Routes>

        <Route index element = {<Login/>}></Route>
        <Route path="/home" element = {<Login/>}></Route>
        <Route path="/face" element = {<FaceAuth/>}></Route>

      </Routes>
      
      
      
      </BrowserRouter>
      
      




    </div>

  )
}

export default App
