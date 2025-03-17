import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faTriangleExclamation, faCircleExclamation, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Modals.css';

export default function InformationModal({ title, text, theme, show, onClose }) {
    let modalIcon = faTriangleExclamation
    let modalBgColor = "#0096D6"
  
    switch (theme) {
      case "information":
        modalIcon = faCircleInfo
        modalBgColor = "#0096D6"
        break
      case "error":
        modalIcon = faCircleExclamation
        modalBgColor = "#bb0000"
        break
      default:
        break
    }
  
    return (
      <Modal show={show} onHide={onClose} dialogClassName={theme} backdrop="static" keyboard={false}>
        {title == "" ? null : <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>}
        <Modal.Body>
          <div className="row">
            <div className="col-8 my-auto">
              <p style={{ fontSize: "1.2em"}}>{text}</p>
            </div>
            <div className="col-4 text-center">
              <FontAwesomeIcon icon={modalIcon} size="2xl" style={{ fontSize: "5em" }} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onClose} style={{ fontSize: "1.2em"}}>
            Rendben
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  