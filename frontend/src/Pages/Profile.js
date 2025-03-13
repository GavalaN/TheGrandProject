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

    useEffect(() => {
            axios.get(base_url+'/Users/GetUserListings?userid='+userdata.uId)
            .then(response => (setAds(response.data)))
            .then(console.log(ads))
            .catch((error) => {console.log("Nincs megjeleníthető adat!")});
    }, [])

    function ShowAds(e) {
        e.preventDefault();
        setIsSAActive((prevState) => !prevState);
        handleOpen();
    }

    function ShowResetPassword(e) {
        e.preventDefault();
        setIsSRPActive((prevState) => !prevState);
    }

    if (userdata === undefined) {
        navigate("/login")
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
                        <NewPassword/>
                    </div>
                <div className={`col-auto ${isSAActive ? "open" : "close"}`}>
                  {ads.length > 0? ads.map(car => {
                    return <CarCard id={car.id} brand={car.brand} type_name={car.type_name} fuel_type={car.fuel_type} year={car.year} ccm={car.ccm} horsepower={car.hp} odometer={car.kmClock} price={car.price} description={car.description} is_owner={true}/>
                  }) : 
                    <Modal show={show} onHide={handleClose} dialogClassName="figyelmeztetes">
                        <Modal.Header>
                        <Modal.Title>Figyelmeztetés!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div class="row">
                                <div class="col-8">Nincs megjeleníthető hírdetés!</div>
                                <div className="col-4 text-center"><FontAwesomeIcon icon={faCircleInfo} size="2xl" style={{fontSize: "5em"}}/></div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="information" style={{backgroundColor: "white", color: ""}} onClick={handleClose}>
                            Oké
                        </Button>
                        </Modal.Footer>
                    </Modal>
                //   <h2 style={{color : "white"}}>Nincs megjeleníthető hírdetés</h2>
                  }
                </div>
            </div>
            
          )
    }

  
}
