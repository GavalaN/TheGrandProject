import React, { useEffect, useState } from 'react'
import './LoginReg.css'
import WarningModal from '../Components/WarningModal'
import { faEnvelope, faSquarePhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';

export default function Contact() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (!isModalOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location, isModalOpen]);

  const handleModalClose = () => setIsModalOpen(false);
  const handleModalOpen = () => setIsModalOpen(true);

  return (
    <div className="content">
       {isModalOpen && <WarningModal onClose={handleModalClose} />}
      <div id="contact" className="text-start">
        <h3 id="#" className="text-center">Kapcsolat</h3>

        <hr/>

        <h4>Cég adatai:</h4>
        <p>Cégnév: AssettoAuto Kft.</p>
        <p>Cím: 3525 Miskolc, Palóczy László utca 3.</p>
        <p>Telefonszám: +3620-1234567</p>
        <p>E-mail cím: teszt.elek0000000000@gmail.com</p>

        <hr/>

        <h4>Kérdése van?</h4>
        <p>Keressen fel minket az alábbi módokon:</p>
        <p><FontAwesomeIcon icon={faEnvelope} style={{color: "#0096D6"}}/> teszt.elek0000000000@gmail.com</p>
        <p><FontAwesomeIcon icon={faSquarePhone} style={{color: "#0096D6"}}/> +3620-1234567</p>
      </div>

      {/* Kapcsolati Űrlap

      Név
      E-mail cím
      Üzenet mező
      Opcionálisan: telefonszám, témakör kiválasztása
      Küldés gomb */}
  </div>
  )
}
