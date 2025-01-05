import React from 'react'
import './Navbar.css'

export default function Navbar() {
  return (
    <div id='nav'>
        <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="#">logo</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
            <li className="nav-item">
            <a className="nav-link" href="#">Belépés</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#">Regisztráció</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#">Hasznos tudnivalók</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#"><button className='btn'><i class="bi bi-plus-lg"></i>Hirdetésfeladás</button></a>
            </li>
        </ul>
        </div>
    </nav>
  </div>
  )
}
