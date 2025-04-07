import { useEffect, useState } from "react"
import "./CarCard.css"
import logo from "../Images/logo.png"
import "react-tooltip/dist/react-tooltip.css"
import { Tooltip } from "react-tooltip"
import { Link, useNavigate, useParams } from "react-router-dom"
import { faHorseHead, faGasPump, faCalendarWeek, faRoad, faChargingStation, faGaugeHigh } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import InformationModal from "./InformationModal"
import ConfirmModal from "./ConfirmModal"
import Cookies from "js-cookie"
import { BeatLoader } from "react-spinners"

export default function CarCard(props) {
  const base_url = process.env.REACT_APP_BASE_URL
  const navigate = useNavigate()
  const [user, setUser] = useState(Cookies.get("user") === undefined ? undefined : JSON.parse(Cookies.get("user")))
  const [imageFileName, setImageFileName] = useState(props.pathname)
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const [isSold, setIsSold] = useState(false)

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

  // State for confirm modal
  const [isSoldModal, setIsSoldModal] = useState({
    show: false,
    title: "Megerősítés",
    text:  "",
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

  // Handler to open the sold status modal
  const openIsSoldModal = () => {
    setIsSoldModal({
      ...isSoldModal,
      text: `Biztos megszeretnéd jelölni ${ isSold? "elérhetőként" : "eladottként" } ezt a hirdetést?`,
      show: true,
    })
  }

  // Handler to set the sold status
  const handleIsSold = () => {
    setIsSold((prevIsSold) => !prevIsSold);
  }

  // Handler to close the sold status modal
  const closeIsSoldModal = () => {
    setIsSoldModal({
      ...isSoldModal,
      show: false,
    })
  }

  // Handler to close the confirm modal
  const closeConfirmModal = () => {
    setConfirmModal({
      ...confirmModal,
      show: false,
    })

    // Navigate after a short delay to allow the user to see the success message
    setTimeout(() => {
      navigate("/profil")
    }, 1000)
  }

  // Handler for the delete action
  const handleDeleteCar = () => {
    axios.delete(base_url + "/Car/Delete?id=" + props.id + "&token=" + user.token)
      .then((response) => {
        setModalInfo({
          show: true,
          title: response.data,
          text: "A hirdetés sikeresen törölve.",
          theme: "information",
        })

        
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

  useEffect(() => {
    // Reset image state immediately when props change
    setImage(null)
    setIsLoading(true)

    // Create a flag to handle component unmounting
    let isMounted = true

    const fetchImages = async () => {
      try {
        if (props.pathname) {
          // Create a unique URL with a timestamp to prevent caching
          const imageUrl = `${base_url}/Picture/download/${props.pathname}?t=${new Date().getTime()}`
          const response = await axios.get(imageUrl, { responseType: "blob" })

          // Only update state if component is still mounted
          if (isMounted) {
            // Revoke any previous object URL before creating a new one
            if (image) {
              URL.revokeObjectURL(image)
            }
            const newImageUrl = URL.createObjectURL(response.data)
            setImage(newImageUrl)
            setIsLoading(false)
          }
        } else {
          if (isMounted) {
            setIsLoading(false)
          }
        }
      } catch (error) {
        console.error("Error fetching images:", error)
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    // Only fetch if we have a pathname
    if (props.pathname) {
      fetchImages()
    } else {
      setIsLoading(false)
    }

    // Cleanup function
    return () => {
      isMounted = false
      if (image) {
        URL.revokeObjectURL(image)
      }
    }
  }, [props.id, props.pathname])

  return (
    <div className="car-card">
      <div className="car-card-img col-4">
        {isLoading ? (
          <div className="">
            <BeatLoader color="#0096D6" size={15} />
          </div>
        ) : (
          <Link to={`/hirdetes/${props.id}`}>
            <img src={image || logo} alt={props.brand + " " + props.type_name} />
          </Link>
        )}
      </div>
      <div className={`car-card-text ${props.is_owner ? "col-6" : "col-8"}`}>
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
          <button className="btn btn-warning" onClick={openIsSoldModal}>
            {isSold ? "Eladva" : "Elérhető"}
          </button>
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
      {/* Confirm Modal for sold status */}
      <ConfirmModal
        show={isSoldModal.show}
        title={isSoldModal.title}
        text={isSoldModal.text}
        onClose={closeIsSoldModal}
        onAccept={handleIsSold}
        onReject={() => setIsSoldModal({ ...isSoldModal, show: false })}
      />
    </div>
  )
}

