import React, { useState } from 'react';
import './LoginReg.css';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  const navigate = useNavigate()

  async function Reg(e) {
    // Megakadályozzuk, hogy a form automatikusan elküldődjön
    e.preventDefault();

    // Aszinkron módon hash-eljük a jelszót
    const salt = await axios.get('http://localhost:5000/Registry/GenerateSalt')
    const hashedPassword = await bcrypt.hash(document.getElementById("password").value, salt.data); // Jelszó titkosítása aszinkron

    let user = {
      id: 0,
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      phoneNum: document.getElementById("phoneNum").value,
      hash: hashedPassword,
      created: null,
      isAdmin: null,
      salt: salt.data,
      isActive: null,
      resetPasswordToken: null,
      resetPasswordTokenExpiry: null,
    };

    try {
      const response = await axios.post('http://localhost:5000/Registry/Registry', user);
      console.log(response);
      alert(response.data);
      navigate("/login")
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }

    console.log(user); // Kiírja a felhasználói adatokat a konzolra
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
      <form id="registration-form" onSubmit={Reg}>
        <h3>Regisztráció</h3>
        <div className="mb-3">
          <label>Felhasználónév</label>
          <input type="text" id="username" className="form-control input" placeholder="pl.: mintajozsef123"/>
        </div>
        <div className="mb-3">
          <label>Email cím</label>
          <input type="email" id="email" className="form-control input" placeholder="pl.: mintajozsef@gmail.com"/>
        </div>
        <div className="mb-3">
          <label>Telefonszám</label>
          <input type="text" id="phoneNum" className="form-control input" placeholder="pl.: +36 20 123 4567"/>
        </div>
        <div className="mb-3">
          <label>Jelszó</label>
          <input type="password" id="password" className="form-control input" placeholder="pl.: Minta123."/>
          <div className="show-password">
            <input type="checkbox" className="custom-control-input" id="show-password-button" onClick={ShowPassword}/>
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
  );
}
