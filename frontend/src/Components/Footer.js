import React, { useEffect, useState } from 'react'
import './Footer.css'
import { Link, useLocation } from 'react-router-dom'

export default function Footer() {
  const [footerMargin, setFooterMargin] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const updateFooterMargin = () => {
      const contentHeight = document.querySelector(".content").offsetHeight;
      const footerHeight = document.getElementById("footer").scrollHeight;
      const navHeight = document.getElementById("nav").scrollHeight;
      const windowHeight = window.innerHeight;
      setFooterMargin(windowHeight - contentHeight - navHeight);
      console.log(footerMargin)
    };

    // Frissíti a margót az oldal betöltődésekor
    updateFooterMargin();

    // Eseményfigyelő az ablakméret változására
    window.addEventListener("resize", updateFooterMargin);

    // Tisztítás az eseményfigyelő eltávolításához
    return () => {
      window.removeEventListener("resize", updateFooterMargin);
    };
  }, [location.pathname]);
  return (
    <div className="wrapper">
    <div id="footer" style={{ marginTop: footerMargin }}>
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
          <div className="col">
            <p id="slogen">szlogen</p>
          </div>
        </div>
      </div>
      <div id="lower" className="bg-dark text-white">
        <p>weboldal_neve.hu © Minden jog fenntartva</p>
      </div>
    </div>
  </div>
  )
}
