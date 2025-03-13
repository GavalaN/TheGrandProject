import React, { useEffect, useState } from 'react'
import './CarCard.css'
import logo from '../Images/logo.png'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { faHorseHead, faGasPump, faCalendarWeek, faRoad, faChargingStation, faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function CarCardDetailed() {
    const [carDetailed, setCarDetailed] = useState([])
    const params = useParams()
    useEffect(() => {
        axios.get('http://localhost:5000/Hirdetes/GetHirdetesById?id='+params.id)
        .then(response => {console.log(response.data); setCarDetailed(response.data)})
    }, [])
  return (
    <div className="car-card-detailed">
        <h2>{carDetailed.brand} {carDetailed.type_Name}</h2>
        <div className="row">
            <div className="col-8">
                <div className="car-card-img">
                    <img src={"https://cdn.myshoptet.com/usr/www.bawodeal.cz/user/documents/upload/Bawodeal%20garage/bmw-e36-coupe-325i-141kw-od-radka-1-min.png"} alt={carDetailed.brand + " " + carDetailed.type_Name} />
                </div>
                {/* <p>//</p>
                <p>//</p> */}
                <p>//fénykép irányítás</p>
                {/* <p>//</p>
                <p>//</p> */}
            </div>
            <div className="col-4">
                <h1>{carDetailed.price} Ft</h1>
                {/* <p className='carDetailed'>
                <a data-tooltip-id="carDetailed-details" data-tooltip-content="Üzemanyag típusa">
                {carDetailed.fuel_Type == "elektromos" || carDetailed.fuel_Type == "hidrogén (üzemanyagcellás)"?<FontAwesomeIcon icon={faChargingStation} />:<FontAwesomeIcon icon={faGasPump} />}&nbsp;{carDetailed.fuel_Type}&nbsp;
                </a>-
                <a data-tooltip-id="carDetailed-details" data-tooltip-content="Évjárat">
                &nbsp;<FontAwesomeIcon icon={faCalendarWeek} />&nbsp;{carDetailed.year}&nbsp;
                </a>-
                <a data-tooltip-id="carDetailed-details" data-tooltip-content="Motor térfogat">
                &nbsp;<FontAwesomeIcon icon={faGaugeHigh} />&nbsp;{carDetailed.ccm} cm³&nbsp;
                </a>-
                <a data-tooltip-id="carDetailed-details" data-tooltip-content="Teljesítmény (lóerő)">
                &nbsp;<FontAwesomeIcon icon={faHorseHead} />&nbsp;{carDetailed.hp} LE&nbsp;
                </a>- 
                <a data-tooltip-id="carDetailed-details" data-tooltip-content="Kilométeróra állása">
                &nbsp;<FontAwesomeIcon icon={faRoad} />&nbsp;{carDetailed.kmClock} Km&nbsp;
                </a>
                </p>
                <Tooltip id="carDetailed-details"/> */}
                <div className="car-card-text">
                    <h3>Általános adatok</h3>
                    <hr className="my-1"/>
                        <p>Márka: {carDetailed.brand}</p>
                        <p>Típus: {carDetailed.type_Name}</p>
                        <p>Üzemanyag típusa: {carDetailed.fuel_Type}</p>
                        <p>Évjárat: {carDetailed.year}</p>
                    <h3>Jármű adatai</h3>
                    <hr className="my-1"/>
                        <p>Kivitel: {carDetailed.bodyType}</p>
                        <div className="color-display">
                            <p>Szín: {carDetailed.color}</p>
                            <div id="colorShape" style={{ backgroundColor: carDetailed.hexcode }}></div>
                        </div>                        
                        <p>Kilométeróra állás: {carDetailed.kmClock} km</p>
                        <p>Súly: {carDetailed.kWeight} kg</p>
                    <h3>Műszaki adatok</h3>
                    <hr className="my-1"/>
                        <p>Váltó típusa: {carDetailed.transType}</p>
                        <p>Hajtás: {carDetailed.drive}</p>
                        <p>Henger elrendezés: {carDetailed.engineType}</p>
                        <p>Hengerek száma: {carDetailed.numofCylinders} db</p>
                        <p>Motor térfogata: {carDetailed.ccm} cm³</p>
                        <p>Teljesítmény: {carDetailed.hp} LE</p>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="car-card-text col-12 mx-auto">
                <h3 className="mt-2">Leírás</h3>
                <hr className="my-1"/>
                <p>{carDetailed.description}</p>

                <h3 className="mt-2">Hírdető adatai</h3>
                <hr className="my-1"/>
                <div class="row">
                    <div class="col-12">
                        <p>Hírdető neve: {carDetailed.username}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <p>Telefon száma: {carDetailed.phoneNum}</p>
                    </div>
                    <div class="col-8">
                        <a href={`tel:${carDetailed.phoneNum}`} className="btn">Vevő felhívása</a>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <p>Email címe: {carDetailed.email}</p>
                    </div>
                    <div class="col-8">
                        <a href={`mailto:${carDetailed.email}`} className="btn">E-mail küldése a vevőnek</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
