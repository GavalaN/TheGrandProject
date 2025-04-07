import React, { useEffect, useState } from 'react'
import './LoginReg.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';
import InformationModal from '../Components/InformationModal';

export default function Login() {
  const base_url = process.env.REACT_APP_BASE_URL
  const navigate = useNavigate()
  const user = Cookies.get("user")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    show: false,
    title: "",
    text: "",
    theme: "information",
  })

  useEffect(() => {
    // Only check for existing user on initial load
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
      navigate("/profil")
    }
  }

  async function Log(e) {
    e.preventDefault()

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    try {
      // Get salt from the server
      const saltResponse = await axios.post(base_url + "/Login/GetSalt/" + username)
      const salt = saltResponse.data
      console.log("Salt:", salt)

      // Hash the password with the salt
      const hashedPassword = await bcrypt.hash(password, salt)
      console.log("Hashed Password:", hashedPassword)

      // Login object
      const login = {
        loginName: username,
        tmpHash: hashedPassword,
      }

      // Login request
      const loginResponse = await axios.post(base_url + "/Login", login)
      console.log("Login Response:", loginResponse.data)

      const date = new Date()
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
      Cookies.set("user", JSON.stringify(loginResponse.data), { expires: date })
      console.log(JSON.parse(Cookies.get("user")))

      setModalInfo({
        show: true,
        title: "",
        text: "Sikeres bejelentkezés! Üdv",
        theme: "information",
      })

    } catch (error) {
      console.error("Hiba történt:", error)
      setModalInfo({
        show: true,
        title: "Bejelentkezési hiba",
        text: "Helytelen jelszó!",
        theme: "error",
      })
    }
  }

  // Function to toggle password visibility
  function ShowPassword() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <div className="content">
      <form id="login-form">
        <h3>Bejelentkezés</h3>
        <div className="mb-3">
          <label>Felhasználónév</label>
          <input type="text" id="username" className="form-control input" placeholder="Felhasználónév begépelése" />
        </div>
        <div className="mb-3">
          <label>Jelszó</label>
          <input type={isPasswordVisible ? 'text' : 'password'} id="password" className="form-control input" placeholder="Jelszó begépelése" />
        </div>
        <div className="mb-3">
          <div className="show-password">
            <input type="checkbox" className="custom-control-input" id="show-password-button" onClick={ShowPassword} />
            <label className="custom-control-label" htmlFor="show-password-button">
              Jelszó megjelenítése
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" onClick={Log}>
            Bejelentkezés
          </button>
        </div>
        <p className="forgot-password text-right">
          <Link to="/elfelejtett-jelszo">Elfelejtett jelszó</Link>
        </p>
      </form>

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
