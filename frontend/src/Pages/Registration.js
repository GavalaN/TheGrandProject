import React, { useEffect, useState } from 'react';
import './LoginReg.css';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import InformationModal from '../Components/InformationModal';

export default function Registration() {
  const base_url = process.env.REACT_APP_BASE_URL
  const navigate = useNavigate()
  const user = Cookies.get("user")
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Add state for the modal
  const [modalInfo, setModalInfo] = useState({
    show: false,
    title: "",
    text: "",
    theme: "information",
  })

  useEffect(() => {
    if (user !== undefined) {
      navigate("/profil")
    }
  }, []) // Empty dependency array so it only runs once

  // Add a handler to close the modal
  const handleCloseModal = () => {
    setModalInfo({
      ...modalInfo,
      show: false,
    })

    // Only navigate after closing if it was a success modal
    if (modalInfo.theme === "information") {
      navigate("/login")
    }
  }

  async function Reg(e) {
    // Megakadályozzuk, hogy a form automatikusan elküldődjön
    e.preventDefault()

    // Aszinkron módon hash-eljük a jelszót
    try {
      const salt = await axios.get(base_url + "/Registry/GenerateSalt")
      const hashedPassword = await bcrypt.hash(document.getElementById("password").value, salt.data) // Jelszó titkosítása aszinkron

      const user = {
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
      }

      const response = await axios.post(base_url + "/Registry/Registry", user)
      console.log(response)

      // Show success modal instead of alert
      setModalInfo({
        show: true,
        title: "Sikeres regisztráció",
        text: response.data,
        theme: "information",
      })

      // Don't navigate here - we'll navigate after modal is closed
      console.log(user) // Kiírja a felhasználói adatokat a konzolra
    } catch (error) {
      console.log(error)

      // Show error modal instead of alert
      setModalInfo({
        show: true,
        title: "Regisztrációs hiba",
        text: error.response?.data || "Ismeretlen hiba történt a regisztráció során.",
        theme: "error",
      })
    }
  }

  function ShowPassword() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <div className="content">
      <form id="registration-form" onSubmit={Reg}>
        <h3>Regisztráció</h3>
        <div className="mb-3">
          <label>Felhasználónév</label>
          <input type="text" id="username" className="form-control input" placeholder="pl.: mintajozsef123" />
        </div>
        <div className="mb-3">
          <label>Email cím</label>
          <input type="email" id="email" className="form-control input" placeholder="pl.: mintajozsef@gmail.com" />
        </div>
        <div className="mb-3">
          <label>Telefonszám</label>
          <input type="text" id="phoneNum" className="form-control input" placeholder="pl.: +36 20 123 4567" />
        </div>
        <div className="mb-3">
          <label>Jelszó</label>
          <input type={isPasswordVisible ? 'text' : 'password'} id="password" className="form-control input" placeholder="pl.: Minta123." />
          <div className="show-password">
            <input type="checkbox" className="custom-control-input" id="show-password-button" onClick={ShowPassword} />
            <label className="custom-control-label" htmlFor="show-password-button">
              Jelszó megjelenítése
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-danger">
            Regisztráció
          </button>
        </div>
        <p className="forgot-password text-right">
          Van már fiókod? <Link to="/login">Itt tudsz belépni</Link>
        </p>
      </form>

      {/* Render the modal component */}
      <InformationModal
        show={modalInfo.show}
        title={modalInfo.title}
        text={modalInfo.text}
        theme={modalInfo.theme}
        onClose={handleCloseModal}
      />
    </div>
  )
}