import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../Pages/LoginReg.css';

export default function WarningModal() {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="figyelmeztetes">
        <Modal.Header>
          <Modal.Title>Figyelmeztetés!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div class="row">
                <div class="col-8">A weboldalon megtalálhatók fiktív, vagyis kitalált adatok! Az oldalon található adatok egyezése a valósággal a véletlen műve!</div>
                <div className="col-4 text-center"><FontAwesomeIcon icon={faTriangleExclamation} size="2xl" style={{fontSize: "5em"}}/></div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" style={{backgroundColor: "white", color: "#bb0000"}} onClick={handleClose}>
            Megértettem!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
