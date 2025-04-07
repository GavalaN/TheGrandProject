import React, { useState } from 'react';
import './LoginReg.css';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useNavigate, useParams } from 'react-router-dom';
import InformationModal from '../Components/InformationModal';

export default function NewPassword() {
  const base_url = process.env.REACT_APP_BASE_URL;
  const params = useParams();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    show: false,
    title: "",
    text: "",
    theme: "information",
  })

  // Function to handle the modal close event
  const handleCloseModal = () => {
    setModalInfo({
      ...modalInfo,
      show: false,
    })

    // Navigate to the login page if the theme is "information"
    if (modalInfo.theme === "information") {
      navigate("/login")
    }
  }

  // Function to handle the login event
  async function Login(e) {
      e.preventDefault();
  
      const password = document.getElementById("password").value;
      const password_again = document.getElementById("password-again").value;
      const username = null;
  
      if (password === password_again) {
        try {
          // Salt lekérése a szervertől
          const saltResponse = await axios.get(base_url+'/Registry/GenerateSalt');
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
          const loginResponse = await axios.post(base_url+`/Registry/PasswordModify?email=${params.email}&token=${params.token}&newPassword=${hashedPassword}&SALT=${salt}`);
          console.log("Sikeres módosítás: ", loginResponse.data);
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
      else {
        setModalInfo({
          show: true,
          title: "Hiba",
          text: "A jelszavak nem egyeznek!",
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
        <h3>Új jelszó</h3>
        <div className="mb-3">
          <label>Jelszó</label>
          <input type={isPasswordVisible ? 'text' : 'password'} id="password" className="form-control input" placeholder="Jelszó begépelése"/>
        </div>
        <div className="mb-3">
          <label>Jelszó ismét</label>
          <input type={isPasswordVisible ? 'text' : 'password'} id="password-again" className="form-control input" placeholder="Jelszó begépelése ismét"/>
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
