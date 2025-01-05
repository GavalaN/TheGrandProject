import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div id='footer'>
        <div id='upper' className='text-white'>
            <div className='row'>
                <div className='col'>
                  <ul>
                      <li><Link to="/">Adatvédelmi Tájékoztatás</Link></li>
                      <li><Link to="/">Ászf</Link></li>
                      <li><Link to="/">Kapcsolat</Link></li>
                  </ul>
                </div>
                <div className='col'>
                  <p id='slogen'>szlogen</p>
                </div>
            </div>
            
        </div>
        <div id='lower' className='bg-dark text-white'>
             <p>weboldal_neve.hu © Minden jog fenntartva</p>
        </div>
    </div>
  )
}
