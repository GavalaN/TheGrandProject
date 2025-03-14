import React, { useEffect, useState } from 'react'
import { faCookie, faCookieBite } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cookies from 'js-cookie';
import './SiteCookies.css'
import { Tooltip } from 'react-tooltip';
import { Modal, Button } from 'react-bootstrap';
import '../Pages/LoginReg.css'; 

export default function SiteCookies() {
    const [accepted, setAccepted] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const cookie = Cookies.get("accepted-cookies");

        if (cookie === undefined) {
            setShowModal(true);
            document.getElementById("cookies-content").style.visibility = "hidden";
        } else {
            setAccepted(cookie === "true");
        }
    }, []);

    const handleAccept = () => {
        Cookies.set("accepted-cookies", true);
        setAccepted(true);
        setShowModal(false);
        document.getElementById("cookies-content").style.visibility = "visible";
    };

    const handleReject = () => {
        Cookies.set("accepted-cookies", false);
        setAccepted(false);
        setShowModal(false);
        document.getElementById("cookies-content").style.visibility = "visible";
    };

    return (
        <div id="cookies-content">
            <div id="site-cookies" className="btn">
                <a
                    data-tooltip-id='sitecookies-tooltip'
                    data-tooltip-content='Süti beállítások'
                    onClick={() => setShowModal(true)}
                >
                    {accepted ?
                        <FontAwesomeIcon icon={faCookieBite} /> :
                        <FontAwesomeIcon icon={faCookie} />}
                </a>
                <Tooltip id='sitecookies-tooltip' />
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="site-cookies" backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title>Süti elfogadása</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Weboldalunk sütiket használ a felhasználói élmény javítása érdekében. Elfogadod?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleReject}>Nem</Button>
                    <Button onClick={handleAccept}>Igen</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
