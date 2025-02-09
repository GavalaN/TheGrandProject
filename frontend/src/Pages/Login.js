import React from 'react'
import './LoginReg.css'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
  <div className='content'>
    <form id="login-form">
      <h3>Bejelentkezés</h3>
      <div className="mb-3">
        <label>Email cím</label>
        <input type="email" className="form-control input" placeholder="Email begépelése"/>
      </div>
      <div className="mb-3">
        <label>Jelszó</label>
        <input type="password" className="form-control input" placeholder="Jelszó begépelése"/>
      </div>
      <div className="mb-3">
        <div className="show-password">
          <input type="checkbox" className="custom-control-input" id="show-password-button"/>
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
