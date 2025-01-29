import React from 'react'
import './Navbar.css'
import logo from '../logo_white.png'
import { Link } from 'react-router-dom'
import "bootstrap/js/src/collapse.js";

export default function Navbar() {
  return (
    <div id='nav'>
        <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand" to="/"><img src={logo} alt="" /></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
            <li className="nav-item">
            <Link className='nav-link' to="/login">Belépés</Link>
            </li>
            <li className="nav-item">
            <Link className='nav-link' to="/regisztracio">Regisztráció</Link>
            </li>
            <li className="nav-item">
            <Link className='nav-link' to="/hasznos-tudnivalok">Hasznos Tudnivalók</Link>
            </li>
            <li className="nav-item nav-link">
            <Link className="nav-link" to="/hirdetesfeladas"><button className='btn'><i className="bi bi-plus-lg"></i>Hirdetésfeladás</button></Link>
            </li>
        </ul>
        </div>
    </nav>
  </div>
  )
}
