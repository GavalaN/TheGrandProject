import React, { useState } from 'react';
import './LoginReg.css';
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default function NewPassword() {
    async function Login(e) {
        e.preventDefault();
    
        const password = document.getElementById("password").value;
        const password_again = document.getElementById("password-again").value;
        const username = null;
    
        try {
            // Salt lekérése a szervertől
            const saltResponse = await axios.get('http://localhost:5000/Registry/GenerateSalt');
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
            const loginResponse = await axios.post('http://localhost:5000/Registry/PasswordModify', login);
            console.log("Login Response:", loginResponse.data);
            localStorage.setItem(loginResponse.data.token, loginResponse.data)
            
        } catch (error) {
            console.error("Hiba történt:", error);
            alert("Bejelentkezési hiba: " + (error.response?.data || error.message));
        }
    }
    
    
      function ShowPassword() {
        var x = document.getElementById("password");
        var y = document.getElementById("password-again");
        if (x.type === "password") {
          x.type = "text";
          y.type = "text";
        } else {
          x.type = "password";
          y.type = "password";
        }
      }
      return (
      <div className="content">
        <form id="login-form">
          <h3>Új jelszó</h3>
          <div className="mb-3">
            <label>Jelszó</label>
            <input type="password" id="password" className="form-control input" placeholder="Jelszó begépelése"/>
          </div>
          <div className="mb-3">
            <label>Jelszó ismét</label>
            <input type="password" id="password-again" className="form-control input" placeholder="Jelszó begépelése ismét"/>
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
              Küldés
            </button>
          </div>
        </form>
      </div>
  )
}
