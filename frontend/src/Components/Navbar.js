import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../Images/logo_white.png';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import InformationModal from './InformationModal';

export default function Navbar() {
  const base_url = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const user = Cookies.get("user") === undefined? undefined : JSON.parse(Cookies.get("user"))

  const [modalInfo, setModalInfo] = useState({
      show: false,
      title: "",
      text: "",
      theme: "information",
    })

  // Add a handler to close the modal
  const handleCloseModal = () => {
    setModalInfo({
      ...modalInfo,
      show: false,
    })
  }
  
  function Logout(){
    if (user !== undefined){
      axios.post(base_url+'/Logout?token='+user.token)
      .then(response => (setModalInfo({
        show: true,
        title: "",
        text: response.data,
        theme: "information",
      })))
      .then(() => {
        Cookies.remove("user");
        navigate("/login")
      })
    }
    
  }

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
                {Cookies.get("user") == undefined? <Link className="nav-link" to="/login">Belépés</Link> : <Link className="nav-link" to="/profil">Profilom</Link>}
              </li>
              <li className="nav-item">
                {Cookies.get("user") == undefined? <Link className="nav-link" to="/regisztracio">Regisztráció</Link> : <Link className="nav-link" onClick={Logout}>Kilépés</Link>}
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/hasznos-tudnivalok">Hasznos Tudnivalók</Link>
              </li> */}
              <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Hasznos Tudnivalók
              </a>
              <ul class="dropdown-menu">
                <li><Link className="dropdown-item" to="/regisztracios-adokalkulator">Regisztrációs adókalkulátor</Link></li>
                <li><hr class="dropdown-divider"/></li>
                <li><Link className="dropdown-item" to="/gepjarmu-atiras">Gépjármű átírás</Link></li>
                <li><hr class="dropdown-divider"/></li>
                <li><Link className="dropdown-item" to="/dokumentumtar">Dokumentumtár</Link></li>
              </ul>
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
      <InformationModal
        show={modalInfo.show}
        title={modalInfo.title}
        text={modalInfo.text}
        theme={modalInfo.theme}
        onClose={handleCloseModal}
      />
    </div>
  );
}
