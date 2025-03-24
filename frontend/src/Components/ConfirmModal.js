import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Modals.css';

export default function ConfirmModal({ title, text, show, onClose, onAccept, onReject }) {

    const handleAccept = () => {
        if (onAccept) {
          onAccept()
        }
        onClose()
      }
    
      // Handle reject action
      const handleReject = () => {
        if (onReject) {
          onReject()
        }
        onClose()
      }
    
    return (
      <Modal show={show} onHide={onClose} dialogClassName={"error"} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-8">
              <p style={{ fontSize: "1.2em"}}>{text}</p>
            </div>
            <div className="col-4 text-center">
              <FontAwesomeIcon icon={faCircleQuestion} size="2xl" style={{ fontSize: "5em" }} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleReject}>Nem</Button>
            <Button onClick={handleAccept}>Igen</Button>
        </Modal.Footer>
      </Modal>
    )
}
