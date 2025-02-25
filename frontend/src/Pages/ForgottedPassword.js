import React, { useState } from 'react';
import './LoginReg.css';
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default function ForgottedPassword() {
    async function Login(e) {
        e.preventDefault();
    
        const email = document.getElementById("email").value;
    
        try {
            const setEmail = {
                email: email,

            };
    
            // Login kérés küldése
            const loginResponse = await axios.post('http://localhost:5000/Regitsry', {setEmail});
            console.log("Login Response:", loginResponse.data);
            localStorage.setItem(loginResponse.data.token, loginResponse.data)
            
        } catch (error) {
            console.error("Hiba történt:", error);
            alert("Bejelentkezési hiba: " + (error.response?.data || error.message));
        }
      }
      return (
      <div className="content">
        <form id="login-form">
          <h3>Elfelejtett jelszó</h3>
          <div className="mb-3">
            <label>Email cím</label>
            <input type="text" id="username" className="form-control input" placeholder="Email cím begépelése"/>
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
