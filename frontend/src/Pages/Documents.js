import React from 'react'
import adasveteli from '../Documents/Gepjarmu_adas-veteli_szerzodesminta.pdf'
import { Link } from 'react-router-dom'

export default function Documents() {
  return (
    <div className="etc">
        <h2 className="text-center">Dokumentumtár</h2>
        <h4>Adásvételi szerződés</h4>
        <p>Az adásvételi szerződés mintát megtekintheti és letöltheti <Link to={adasveteli} target='_blank'>Itt</Link>.</p>
        <hr/>
    </div>
  )
}
