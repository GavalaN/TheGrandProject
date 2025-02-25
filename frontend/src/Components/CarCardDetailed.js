import React, { useEffect, useState } from 'react'
import './CarCard.css'
import logo from '../Images/logo.png'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function CarCardDetailed() {
    const [carDetailed, setCarDetailed] = useState([])
    const params = useParams()

    useEffect(() => {
        axios.get('http://localhost:5000/Hirdetes/GetHirdetesById?id='+params.id)
        .then(response => {console.log(response.data); setCarDetailed(response.data)})
    }, [])
  return (
    <div className='car-card'>
        <div className='car-card-img col-4'>
            <img src={logo} alt={carDetailed.brand + ' ' + carDetailed.type_name} />
        </div>
        <div className='car-card-text col-8'>
            <div className="title d-flex justify-content-between">
                <h3>{carDetailed.brand} {carDetailed.type_name}</h3>
                <h2>{carDetailed.price} Ft</h2>
            </div>
            <p className='carDetailed'>
            <a data-tooltip-id="carDetailed-details" data-tooltip-content="Üzemanyag típusa">
                {carDetailed.fuel_type}&nbsp;
            </a>-
            <a data-tooltip-id="carDetailed-details" data-tooltip-content="Évjárat">
                <span title="Évjárat">&nbsp;{carDetailed.year}&nbsp;</span>
            </a>-
            <a data-tooltip-id="carDetailed-details" data-tooltip-content="Motor térfogat">
                &nbsp;{carDetailed.ccm} cm³&nbsp;
            </a>-
            <a data-tooltip-id="carDetailed-details" data-tooltip-content="Teljesítmény (lóerő)">
                &nbsp;{carDetailed.horsepower} LE&nbsp;
            </a>- 
            <a data-tooltip-id="carDetailed-details" data-tooltip-content="Kilométeróra állása">
                &nbsp;{carDetailed.odometer} Km&nbsp;
            </a>
            </p>
            <Tooltip id="carDetailed-details"/>
            <p>{carDetailed.description}</p>
        </div>
    </div>
  )
}
