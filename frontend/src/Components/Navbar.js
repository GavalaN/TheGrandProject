import React from 'react';
import './Navbar.css';
import logo from '../logo_white.png';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div id='nav'>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
<<<<<<< HEAD
            <img src={logo} alt="assetto-auto-logo" className="brand-logo" />
=======
            <img src={logo} alt="assetto-auto-logo" />
>>>>>>> 3e6312538f4fd12e8a6295cf264bbc6fd1714f5c
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse mx-auto" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">Belépés</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/regisztracio">Regisztráció</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/hasznos-tudnivalok">Hasznos Tudnivalók</Link>
              </li>
              <li className="nav-item nav-link">
                <Link className="nav-link" to="/hirdetesfeladas">
                  <button className='btn'>
                    <i className="bi bi-plus-lg"></i>Hirdetésfeladás
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
