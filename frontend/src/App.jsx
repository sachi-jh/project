import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChooseDateTime from './components/ChooseDateTime'
import './App.css'
import ChooseAvailability from './components/ChooseAvailability'
import CreateEvent from './components/CreateEvent'

function App() {
  

  return (
    <>
      <Router>
        <Routes>
        <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/" element={<ChooseDateTime />} />
          <Route path="/chooseAvailability" element={<ChooseAvailability />} />
        </Routes>
      </Router>
      <div>
      </div>
    </>
  )
}

export default App
