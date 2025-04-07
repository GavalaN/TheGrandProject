import React, { useEffect, useState } from 'react'
import './Footer.css'
import { Link, useLocation } from 'react-router-dom'

export default function Footer(isActive) {
  const [footerMargin, setFooterMargin] = useState(0);
  const location = useLocation();

  return (
    <div id="footer" >
      <div id="upper" className="text-white">
        <div className="row">
          <div className="col">
            <ul>
              <li>
                <Link to="/adatvedelmi-tajekoztatas">Adatvédelmi Tájékoztatás</Link>
              </li>
              <li><Link to="/aszf">Ászf</Link></li>
              <li><Link to="/kapcsolat">Kapcsolat</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div id="lower" className="bg-dark text-white">
        <p>© assettoauto.hu - 2025.</p>
      </div>
    </div>
  )
}
