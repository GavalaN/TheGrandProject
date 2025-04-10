import React, { useEffect } from 'react'
import { useState } from 'react'
import Cookies from 'js-cookie'
import './Profile.css'
import NewPassword from './NewPassword'
import axios from 'axios'
import CarCard from '../Components/CarCard'
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InformationModal from '../Components/InformationModal'
import ConfirmModal from '../Components/ConfirmModal'

export default function Profile() {
    const base_url = process.env.REACT_APP_BASE_URL;
    const [userdata, setUserData] = useState(Cookies.get("user") === undefined? undefined : JSON.parse(Cookies.get("user")))
    const [ads, setAds] = useState([])
    const [isSRPActive, setIsSRPActive] = useState(false);
    const [isSAActive, setIsSAActive] = useState(false);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

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
        text: "Biztos meg szeretnéd változtatni a jelszavad?",
        theme: "error",
    })

    // Handler to close the confirm modal
    const closeConfirmModal = () => {
        setConfirmModal({
            ...confirmModal,
            show: false,
        })
    }

    // Add a handler to close the modal
    const handleCloseModal = () => {
        setModalInfo({
        ...modalInfo,
        show: false,
        })
    }
 
    // Fetch ads if user is logged in
    useEffect(() => {
        if (userdata !== undefined) {
            axios.get(base_url+'/Users/GetUserListings?userid='+userdata.uId)
            .then(response => (setAds(response.data)))
            .then(console.log(ads))
            .catch((error) => {console.log("Nincs megjeleníthető adat!")});
        }
        else {
            navigate("/login")
        }
    }, [])

    // Show ads for the user
    function ShowAds(e) {
        e.preventDefault();
        if (ads.length > 0) {
            setIsSAActive((prevState) => !prevState);
        }
        else {
            setModalInfo({
                show: true,
                title: "",
                text: "Nincs megjeleníthető hírdetés!",
                theme: "information",
            })
            handleOpen();
        }
    }
    
    // Handle reset password
    async function handleResetPassword() {
        try {
            const loginResponse = await axios.post(base_url+'/Registry/ForgotPassword?email='+userdata.email);
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

    // Show reset password form
    function ShowResetPassword(e) {
        e.preventDefault();
        setConfirmModal({
            ...confirmModal,
            show: true,
        })
        setIsSRPActive((prevState) => !prevState);
    }

    if (userdata === undefined) {

    }
    else {
        return (
            <div className="content">
                <div id="profile-details" className="content">
                    <div className="row text-start">
                        <div className="col-4">
                            <p>Neved:</p>
                            <p>Emailed:</p>
                            <p>Telefonszámod:</p>
                        </div>
                        <div className="col-8">
                            <p>{userdata.username}</p>
                            <p>{userdata.email}</p>
                            <p>{userdata.phoneNum}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <button className="btn" onClick={ShowAds}>Hirdetések megjelenítése</button>
                        </div>
                        <div className="col-6">
                            <button className="btn" onClick={ShowResetPassword}>Jelszó módosítása</button>
                        </div>
                    </div>
                    
                </div>
                <div className={`col-auto ${isSRPActive ? "open" : "close"}`}>
                    <ConfirmModal
                        show={confirmModal.show}
                        title={confirmModal.title}
                        text={confirmModal.text}
                        onClose={closeConfirmModal}
                        onAccept={handleResetPassword}
                        onReject={() => setConfirmModal({ ...confirmModal, show: false })}
                    />
                </div>
                <div className={`col-auto ${isSAActive ? "open" : "close"}`}>
                  {ads.length > 0? ads.map(car => {
                    return <CarCard id={car.id} brand={car.brand} type_name={car.type_name} fuel_type={car.fuel_type} year={car.year} ccm={car.ccm} horsepower={car.hp} odometer={car.kmClock} price={car.price} description={car.description}  pathname={car.pathname} is_owner={true} sold={car.sold}/>
                  }) : ""}
                </div>
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

  
}
