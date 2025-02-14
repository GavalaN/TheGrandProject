import React from 'react'
import './LoginReg.css'
import { Link } from 'react-router-dom'

export default function Login() {
  

  function ShowPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  return (
  <div className='content'>
    <form id="login-form">
      <h3>Bejelentkezés</h3>
      <div className="mb-3">
        <label>Felhasználónév</label>
        <input type="text" className="form-control input" placeholder="Felhasználónév begépelése"/>
      </div>
      <div className="mb-3">
        <label>Jelszó</label>
        <input type="password" id="password" className="form-control input" placeholder="Jelszó begépelése"/>
      </div>
      <div className="mb-3">
        <div className="show-password">
          <input type="checkbox" className="custom-control-input" id="show-password-button" onClick={ShowPassword}/>
          <label className="custom-control-label" htmlFor="show-password-button">
            Jelszó megjelenítése
          </label>
        </div>
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Bejelentkezés
        </button>
      </div>
      <p className="forgot-password text-right">
        <Link to="/login">Elfelejtett jelszó</Link>
      </p>
    </form>
  </div>
  )
}
