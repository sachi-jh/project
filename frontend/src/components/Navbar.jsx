import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <div><nav className="navbar">
    <ul>
      <li>
        <Link to="/chooseDateTime">Join Event</Link>
      </li>
      <li>
        <Link to="/">Create Event</Link>
      </li>
    </ul>
  </nav>
  </div>
  )
}

export default Navbar;