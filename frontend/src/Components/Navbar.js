import React from 'react';
import './Navbar.css';
import logo from '../Images/logo_white.png';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Navbar() {
  const navigate = useNavigate();

  function Logout(){
    let token = JSON.parse(Cookies.get("user")).token;

    axios.post("http://localhost:5000/Logout?uId="+token)
    .then(response => (alert(response.data)))
    .then(() => {
      Cookies.remove("user");
      navigate("/login")
    })
  }

  if (Cookies.get("user") == undefined) {
    return (
      <div id='nav'>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="assetto-auto-logo" className="brand-logo" />
            </Link>
            <span className="navbar-text">
              Megbízható autók, megbízható forrásból
            </span>
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
  else {
    return (
      <div id='nav'>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="assetto-auto-logo" className="brand-logo" />
            </Link>
            <span className="navbar-text">
              Megbízható autók, megbízható forrásból
            </span>
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
                  <Link className="nav-link" to="/profil">Profilom</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" onClick={Logout}>Kilépés</Link>
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
}
