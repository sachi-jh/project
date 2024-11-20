import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChooseDateTime from './components/ChooseDateTime'
import './App.css'
import ChooseAvailability from './components/ChooseAvailability'
import CreateEvent from './components/CreateEvent'
import ShowAvailability from './components/ShowAvailability'
import Navbar from './components/Navbar'

function App() {
  

  return (
    <>
    
      <Router>
      <Navbar />
        <div>
        

        <Routes>
          <Route path="/" element={<CreateEvent />} />
          <Route path="/chooseDateTime" element={<ChooseDateTime />} />
          <Route path="/chooseAvailability" element={<ChooseAvailability />} />
          <Route path="/showAvailability" element={<ShowAvailability />} />
        </Routes>
        </div>
      </Router>
      
    </>
  )
}

export default App
