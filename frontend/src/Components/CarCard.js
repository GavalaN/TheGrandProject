import React, { useState } from 'react'
import './CarCard.css'
import logo from '../Images/logo.png'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { Link, useNavigate } from 'react-router-dom'
import { faHorseHead, faGasPump, faCalendarWeek, faRoad, faChargingStation, faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import InformationModal from './InformationModal'
import ConfirmModal from './ConfirmModal'
import Cookies from 'js-cookie';

export default function CarCard(props) {
  const base_url = process.env.REACT_APP_BASE_URL
  const navigate = useNavigate()
  const [user, setUser] = useState(Cookies.get("user") === undefined? undefined : JSON.parse(Cookies.get("user")))

  // State for information modal
  const [modalInfo, setModalInfo] = useState({
    show: false,
    title: "",
    text: "",
    theme: "information",
  })

  // State for confirm modal
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    title: "Megerősítés",
    text: "Biztos ki szeretnéd törölni ezt a hirdetést?",
    theme: "error",
  })

  // Handler to close the information modal
  const handleCloseModal = () => {
    setModalInfo({
      ...modalInfo,
      show: false,
    })
  }

  // Handler to open the confirm modal
  const openConfirmModal = () => {
    setConfirmModal({
      ...confirmModal,
      show: true,
    })
  }

  // Handler to close the confirm modal
  const closeConfirmModal = () => {
    setConfirmModal({
      ...confirmModal,
      show: false,
    })
  }

  // Handler for the delete action
  const handleDeleteCar = () => {
    axios
      .get(base_url + "/Car/Delete?id="+props.id+"&token=" + user.token)
      .then((response) => {
        setModalInfo({
          show: true,
          title: response.data,
          text: "A hirdetés sikeresen törölve.",
          theme: "information",
        })

        // Navigate after a short delay to allow the user to see the success message
        setTimeout(() => {
          navigate("/profil")
        }, 1500)
      })
      .catch((error) => {
        setModalInfo({
          show: true,
          title: "Hiba történt",
          text: error.response?.data || "Nem sikerült törölni a hirdetést.",
          theme: "error",
        })
      })
  }

  return (
    <div className="car-card">
      <div className="car-card-img col-4">
        <Link to={`/hirdetes/${props.id}`}>
          <img src={logo || "/placeholder.svg"} alt={props.brand + " " + props.type_name} />
        </Link>
      </div>
      <div className={`car-card-text ${props.is_owner ? "col-6" : "collapse-formcol-8"}`}>
        <div className="title d-flex justify-content-between">
          <h3>
            {props.brand} {props.type_name}
          </h3>
          <h2>{props.price} Ft</h2>
        </div>
        <p className="props">
          <a data-tooltip-id="props-details" data-tooltip-content="Üzemanyag típusa">
            {props.fuel_type === "elektromos" || props.fuel_type === "hidrogén (üzemanyagcellás)" ? (
              <FontAwesomeIcon icon={faChargingStation} />
            ) : (
              <FontAwesomeIcon icon={faGasPump} />
            )}
            &nbsp;{props.fuel_type}&nbsp;
          </a>
          -
          <a data-tooltip-id="props-details" data-tooltip-content="Évjárat">
            &nbsp;
            <FontAwesomeIcon icon={faCalendarWeek} />
            &nbsp;{props.year}&nbsp;
          </a>
          -
          <a data-tooltip-id="props-details" data-tooltip-content="Motor térfogat">
            &nbsp;
            <FontAwesomeIcon icon={faGaugeHigh} />
            &nbsp;{props.ccm} cm³&nbsp;
          </a>
          -
          <a data-tooltip-id="props-details" data-tooltip-content="Teljesítmény (lóerő)">
            &nbsp;
            <FontAwesomeIcon icon={faHorseHead} />
            &nbsp;{props.horsepower} LE&nbsp;
          </a>
          -
          <a data-tooltip-id="props-details" data-tooltip-content="Kilométeróra állása">
            &nbsp;
            <FontAwesomeIcon icon={faRoad} />
            &nbsp;{props.odometer} Km&nbsp;
          </a>
        </p>
        <Tooltip id="props-details" />
        <p>{props.description}</p>
      </div>
      {props.is_owner ? (
        <div id="owner-things" className="col-2">
          <Link to={"/modositas/" + props.id} className="btn">
            Módosítás
          </Link>
          <button className="btn btn-danger" onClick={openConfirmModal}>
            Törlés
          </button>
        </div>
      ) : (
        ""
      )}

      {/* Information Modal for success/error messages */}
      <InformationModal
        show={modalInfo.show}
        title={modalInfo.title}
        text={modalInfo.text}
        theme={modalInfo.theme}
        onClose={handleCloseModal}
      />

      {/* Confirm Modal for delete confirmation */}
      <ConfirmModal
        show={confirmModal.show}
        title={confirmModal.title}
        text={confirmModal.text}
        onClose={closeConfirmModal}
        onAccept={handleDeleteCar}
        onReject={closeConfirmModal}
      />
    </div>
  )
}