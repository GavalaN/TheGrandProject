import React, { useEffect, useState } from 'react'
import { faCookie, faCookieBite, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cookies from 'js-cookie';
import './SiteCookies.css'
import { Tooltip } from 'react-tooltip';
import { Modal, Button } from 'react-bootstrap';
import '../Pages/LoginReg.css'; 

export default function SiteCookies() {
    const [accepted, setAccepted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [clickCount, setClickCount] = useState(0); // Track the number of button clicks
    const [startTime, setStartTime] = useState(null); // Track the start time of clicks
    const [backgroundColorChanged, setBackgroundColorChanged] = useState(false); // Track if the background color is changed

    // Check if the cookie is set and show the modal if not
    useEffect(() => {
        const cookie = Cookies.get("accepted-cookies");

        if (cookie === undefined) {
            setShowModal(true);
            document.getElementById("cookies-content").style.visibility = "hidden";
        } else {
            setAccepted(cookie === "true");
        }
    }, []);

    // Function to change the body background color
    const changeBodyColor = () => {
        if (clickCount > 5 && backgroundColorChanged === false) { // If clicked more than 5 times and background color isn't changed
            document.getElementsByClassName("App")[0].style.backgroundColor = '#a2ad13';
            console.log("Magic!");
            setBackgroundColorChanged(true);
        } else if (clickCount > 5 && backgroundColorChanged === true) { // If clicked more than 5 times and background color is changed
            document.getElementsByClassName("App")[0].style.backgroundColor = ''; // Reset to default color
            setBackgroundColorChanged(false);
        }
    };

    // Handle the accept actions
    const handleAccept = () => {
        Cookies.set("accepted-cookies", true);
        setAccepted(true);
        setShowModal(false);
        document.getElementById("cookies-content").style.visibility = "visible";
    };

    // Handle the reject actions
    const handleReject = () => {
        Cookies.set("accepted-cookies", false);
        setAccepted(false);
        setShowModal(false);
        document.getElementById("cookies-content").style.visibility = "visible";
    };

    // General function to handle clicks and time logic
    const handleSiteCookiesClick = () => {
        const currentTime = new Date().getTime();

        // If this is the first click or within 1 second of previous clicks
        if (!startTime || currentTime - startTime > 1000) {
            // Reset the count and start time if more than 1 second has passed
            setClickCount(1);
            setStartTime(currentTime);
        } else {
            // Otherwise, increment the click count
            setClickCount(prevCount => prevCount + 1);
        }

        // Check if the user clicked more than 5 times within 1 second
        if (clickCount >= 5) { // If clicked more than 5 times
            changeBodyColor();
        }
    };

    return (
        <div id="cookies-content">
            <div id="site-cookies" className="btn" onClick={handleSiteCookiesClick}>
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
                    <Modal.Title>Sütik elfogadása</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-8">
                        <p>Weboldalunk sütiket használ a felhasználói élmény javítása érdekében. Elfogadod?</p>
                        </div>
                        <div className="col-4 text-center">
                        <FontAwesomeIcon icon={faTriangleExclamation} size="2xl" style={{ fontSize: '5em' }} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleReject}>Nem</Button>
                    <Button onClick={handleAccept}>Igen</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
