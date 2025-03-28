import React, { useState } from 'react';
import './LoginReg.css';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import InformationModal from '../Components/InformationModal';
import { useNavigate } from 'react-router-dom';

export default function ForgottedPassword() {
  const base_url = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [modalInfo, setModalInfo] = useState({
    show: false,
    title: "",
    text: "",
    theme: "information",
  })

  const handleCloseModal = () => {
    setModalInfo({
      ...modalInfo,
      show: false,
    })

    if (modalInfo.theme === "information") {
      navigate("/login")
    }
  }

    async function Login(e) {
        e.preventDefault();
    
        const email = document.getElementById("email").value;
    
        try {
            const loginResponse = await axios.post(base_url+'/Registry/ForgotPassword?email='+email);
            console.log("Forgotted password:", loginResponse.data);
            setModalInfo({
              show: true,
              title: "",
              text: loginResponse.data,
              theme: "information",
            })
            
        } catch (error) {
            console.error("Hiba történt:", error);
            setModalInfo({
              show: true,
              title: "Hiba",
              text: error.response?.data || error.message,
              theme: "error",
            })
        }
      }
      return (
      <div className="content">
        <form id="login-form">
          <h3>Elfelejtett jelszó</h3>
          <div className="mb-3">
            <label>Email cím</label>
            <input type="text" id="email" className="form-control input" placeholder="Email cím begépelése"/>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" onClick={Login}>
              Küldés
            </button>
          </div>
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
