import React, { useEffect, useState } from 'react';
import NewAdForm from '../Components/NewAdForm';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import InformationModal from '../Components/InformationModal';

export default function NewAd() {
  const navigate = useNavigate();
  const user = Cookies.get("user");

  const [modalInfo, setModalInfo] = useState({
      show: false,
      title: "",
      text: "",
      theme: "information",
  })
  
  // Add a handler to close the modal
  const handleCloseModal = () => {
    setModalInfo({
      ...modalInfo,
      show: false,
    })

    if (user === undefined) {
      navigate("/login")
    }
  }

  useEffect(() => {
    if (user === undefined) {
      setModalInfo({
        show: true,
        title: "Hirdetésfeladáshoz kérlek jelentkezz be!",
        text: "A hirdetés feladásához bejelentkezés szükséges.",
        theme: "error",
      })
    }
  }, [])

  if (user !== undefined){
    return (
      <div className="content">
        <NewAdForm/>
      </div>
    )
  }
  else {
    return (
    <InformationModal
      show={modalInfo.show}
      title={modalInfo.title}
      text={modalInfo.text}
      theme={modalInfo.theme}
      onClose={handleCloseModal}
    />
    )
  }
}
