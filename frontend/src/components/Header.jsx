import React from 'react';  
import './Header.css';  
import logo from '../assets/logo.png';  

function Header() {  
  return (  
    <header className="app-header">  
      <img src={logo} alt="App Logo" className="app-logo" />  
      <h1 className="app-title">MeetSync</h1>  
    </header>  
  );  
}  

export default Header;