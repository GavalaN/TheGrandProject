import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Modals.css';

export default function WarningModal({ onClose }) {

  return (
    <Modal show={true} onHide={onClose} dialogClassName="error" backdrop="static" keyboard={false} >
      <Modal.Header>
        <Modal.Title>Figyelmeztetés!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-8">
            A weboldalon megtalálhatók fiktív, vagyis kitalált adatok! Az oldalon található adatok egyezése a valósággal a véletlen műve!
          </div>
          <div className="col-4 text-center">
            <FontAwesomeIcon icon={faTriangleExclamation} size="2xl" style={{ fontSize: '5em' }} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" style={{ backgroundColor: 'white', color: '#bb0000' }} onClick={onClose}>
          Megértettem!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
