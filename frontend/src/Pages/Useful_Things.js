import React, { useEffect } from 'react'

import '../Components/Search.css'
import 'tom-select/dist/css/tom-select.css'
import { Link } from 'react-router-dom'
import adasveteli from '../Documents/Gepjarmu_adas-veteli_szerzodesminta.pdf'

export default function Useful_Things() {

  return (
    <div id="ut" className="content">
      <h2 className="text-center">Gépjárműadó kalkulátor</h2>
      <hr/>
      <h2 className="text-center">Dokumentumtár</h2>
      <h4>Adásvételi szerződés</h4>
      <p>Az adásvételi szerződés mintát megtekintheti és letöltheti <Link to={adasveteli} target='_blank'>Itt</Link>.</p>
      <hr/>
      <h4>Átírás</h4>
    </div>
  )
}
