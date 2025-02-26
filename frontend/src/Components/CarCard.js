import React from 'react'
import './CarCard.css'
import logo from '../Images/logo.png'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { Link } from 'react-router-dom'
import { faHorseHead, faGasPump, faCalendarWeek, faRoad, faChargingStation, faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function CarCard(props) {
  return (
    <div className='car-card'>
        <div className='car-card-img col-4'>
            <Link to={`/hirdetes/${props.id}`}><img src={logo} alt={props.brand + ' ' + props.type_name} /></Link>
        </div>
        <div className='car-card-text col-8'>
            <div className="title d-flex justify-content-between">
                <h3>{props.brand} {props.type_name}</h3>
                <h2>{props.price} Ft</h2>
            </div>
            <p className='props'>
            <a data-tooltip-id="props-details" data-tooltip-content="Üzemanyag típusa">
            {props.fuel_type == "elektromos" || props.fuel_type == "hidrogén (üzemanyagcellás)"?<FontAwesomeIcon icon={faChargingStation} />:<FontAwesomeIcon icon={faGasPump} />}&nbsp;{props.fuel_type}&nbsp;
            </a>-
            <a data-tooltip-id="props-details" data-tooltip-content="Évjárat">
            &nbsp;<FontAwesomeIcon icon={faCalendarWeek} />&nbsp;{props.year}&nbsp;
            </a>-
            <a data-tooltip-id="props-details" data-tooltip-content="Motor térfogat">
            &nbsp;<FontAwesomeIcon icon={faGaugeHigh} />&nbsp;{props.ccm} cm³&nbsp;
            </a>-
            <a data-tooltip-id="props-details" data-tooltip-content="Teljesítmény (lóerő)">
            &nbsp;<FontAwesomeIcon icon={faHorseHead} />&nbsp;{props.horsepower} LE&nbsp;
            </a>- 
            <a data-tooltip-id="props-details" data-tooltip-content="Kilométeróra állása">
            &nbsp;<FontAwesomeIcon icon={faRoad} />&nbsp;{props.odometer} Km&nbsp;
            </a>
            </p>
            <Tooltip id="props-details"/>
            <p>{props.description}</p>
        </div>
    </div>
  )
}
