import React, { useEffect } from 'react'
import { useState } from 'react'
import Cookies from 'js-cookie'
import './Profile.css'
import NewPassword from './NewPassword'
import axios from 'axios'
import CarCard from '../Components/CarCard'

export default function Profile() {
    const [userdata, setUserData] = useState(JSON.parse(Cookies.get("user")))
    const [ads, setAds] = useState([])
    const [isSRPActive, setIsSRPActive] = useState(false);
    const [isSAActive, setIsSAActive] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/Users/GetUserListings?userid="+1)
        .then(response => (setAds(response.data)))
        .then(console.log(ads))
    }, [])

    function ShowAds(e) {
        e.preventDefault();
        setIsSAActive((prevState) => !prevState);
    }

    function ShowResetPassword(e) {
        e.preventDefault();
        setIsSRPActive((prevState) => !prevState);
    }


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
          {ads.map(car => {
            return <CarCard id={car.id} brand={car.brand} type_name={car.type_name} fuel_type={car.fuel_type} year={car.year} ccm={car.ccm} horsepower={car.hp} odometer={car.kmClock} price={car.price} description={car.description}/>
          })}
        </div>
    </div>
    
  )
}
