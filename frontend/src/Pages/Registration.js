import React, { Component } from 'react'
import './LoginReg.css'

export default function Registration() {
    return (
    <div className='content'>
      <form id="registration-form">
        <h3>Regisztráció</h3>
        <div className="mb-3">
          <label>Felhasználónév</label>
          <input type="text" className="form-control input" placeholder="pl.: mintajozsef123"/>
        </div>
        <div className="mb-3">
          <label>Email cím</label>
          <input type="email" className="form-control input" placeholder="pl.: mintajozsef@gmail.com"/>
        </div>
        <div className="mb-3">
          <label>Telefonszám</label>
          <input type="text" className="form-control input" placeholder="pl.: +36 20 123 4567"/>
        </div>
        <div className="mb-3">
          <label>Jelszó</label>
          <input type="password" className="form-control input" placeholder="pl.: Minta123."/>
          <div className="show-password">
          <input type="checkbox" className="custom-control-input" id="show-password-button"/>
          <label className="custom-control-label" htmlFor="show-password-button">
            Jelszó megjelenítése
          </label>
        </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-danger">Regisztráció</button>
        </div>
        <p className="forgot-password text-right">Van már fiókod? <a href="/login">Itt tudsz belépni</a></p>
      </form>
    </div>
  )
}