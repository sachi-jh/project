import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChooseDateTime from './components/ChooseDateTime'
import './App.css'

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ChooseDateTime />} />
        </Routes>
      </Router>
      <div>
      <h1 >Vite + React</h1>
      </div>
    </>
  )
}

export default App
