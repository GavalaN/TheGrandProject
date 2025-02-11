import React from 'react'
import './CarCard.css'
import logo from '../Images/logo.png'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

export default function CarCard(props) {
  return (
    <div className='car-card'>
        <div className='car-card-img col-4'>
            <img src={logo} alt={props.brand + ' ' + props.type_name} />
        </div>
        <div className='car-card-text col-8'>
            <div className="title d-flex justify-content-between">
                <h3>{props.brand} {props.type_name}</h3>
                <h2>{props.price} Ft</h2>
            </div>
            <p className='props'>
            <a data-tooltip-id="props-details" data-tooltip-content="Üzemanyag típusa">
                {props.fuel_type}&nbsp;
            </a>-
            <a data-tooltip-id="props-details" data-tooltip-content="Évjárat">
                <span title="Évjárat">&nbsp;{props.year}&nbsp;</span>
            </a>-
            <a data-tooltip-id="props-details" data-tooltip-content="Motor térfogat">
                &nbsp;{props.ccm} cm³&nbsp;
            </a>-
            <a data-tooltip-id="props-details" data-tooltip-content="Teljesítmény (lóerő)">
                &nbsp;{props.horsepower} LE&nbsp;
            </a>- 
            <a data-tooltip-id="props-details" data-tooltip-content="Kilométeróra állása">
                &nbsp;{props.odometer} Km&nbsp;
            </a>
            </p>
            <Tooltip id="props-details"/>
            <p>{props.description}</p>
        </div>
    </div>
  )
}
