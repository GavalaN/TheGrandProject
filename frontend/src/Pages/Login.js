import React from 'react'
import './LoginReg.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default function Login() {
  async function Login(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        // Salt lekérése a szervertől
        const saltResponse = await axios.post('http://localhost:5000/Login/GetSalt/' + username);
        const salt = saltResponse.data; 
        console.log("Salt:", salt);

        // Jelszó hash-elése
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("Hashed Password:", hashedPassword);

        // Login adatok összeállítása
        const login = {
            loginName: username,
            tmpHash: hashedPassword
        };

        // Login kérés küldése
        const loginResponse = await axios.post('http://localhost:5000/Login', login);
        console.log("Login Response:", loginResponse.data);
        
    } catch (error) {
        console.error("Hiba történt:", error);
        alert("Bejelentkezési hiba: " + (error.response?.data || error.message));
    }
}


  function ShowPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  return (
  <div className="content">
    <form id="login-form">
      <h3>Bejelentkezés</h3>
      <div className="mb-3">
        <label>Felhasználónév</label>
        <input type="text" id="username" className="form-control input" placeholder="Felhasználónév begépelése"/>
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
        <button type="submit" className="btn btn-primary" onClick={Login}>
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
