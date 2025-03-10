import React, { useEffect, useState } from 'react'
import { faCookie, faCookieBite } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cookies from 'js-cookie';
import './SiteCookies.css'
import { Tooltip } from 'react-tooltip';

export default function SiteCookies() {
    const [accepted, setAccepted] = useState(false);

    useEffect(() => {
        if (Cookies.get("accepted-cookies") !== undefined) {
            setAccepted(false);
        }
    }, [])

    function AcceptCookies() {
        if (window.confirm("Elfogadod?")) {
            Cookies.set("accepted-cookies",true);
            setAccepted(true);
        }
        else {
            Cookies.set("accepted-cookies",false);
            setAccepted(false);
        }
        console.log(accepted)
    }

    return (
        <div id="site-cookies" className="btn">
            <a data-tooltip-id='sitecookies-tooltip' data-tooltip-content='Süti beállítások' onClick={AcceptCookies}>
                {Cookies.get("accepted-cookies") == undefined?<FontAwesomeIcon icon={faCookie} />:<FontAwesomeIcon icon={faCookieBite} />}
            </a>
            <Tooltip id='sitecookies-tooltip'/>
        </div>
    )
}
