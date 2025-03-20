import React from 'react'
import adasveteli from '../Documents/Gepjarmu_adas-veteli_szerzodesminta.pdf'
import kgfb from '../Documents/Kotelezo_gepjarmu_felelosegbiztositas.pdf'
import torzskonyv from '../Documents/Torzskonyv_forgalmi_engedely.pdf'
import { Link } from 'react-router-dom'

export default function Documents() {
  return (
    <div className="etc">
        <h2 className="text-center">Dokumentumtár</h2>
        <h4>Adásvételi szerződés</h4>
        <p>Az adásvételi szerződés mintát megtekintheti és letöltheti <Link to={adasveteli} target='_blank'>Itt</Link>.</p>
        <hr/>
        <h4>Kötelező gépjármű felelőségbiztosítás</h4>
        <p>A kötelező gépjármű felelőségbiztosítással kapcsolatos törvényt megtekintheti és letöltheti <Link to={kgfb} target='_blank'>Itt</Link>.</p>
        <hr/>
        <h4>Törzskönyv és forgalmi engedély</h4>
        <p>A Törzskönyvvel és forgalmi engedéllyel kapcsolatos törvényt megtekintheti és letöltheti <Link to={torzskonyv} target='_blank'>Itt</Link>.</p>
        <hr/>
    </div>
  )
}
