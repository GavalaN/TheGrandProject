import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import InformationModal from '../Components/InformationModal';

export default function Activated() {
    const base_url = process.env.REACT_APP_BASE_URL;
    const params = useParams();
    const navigate = useNavigate();
    const [modalInfo, setModalInfo] = useState({
        show: false,
        title: "",
        text: "",
        theme: "information",
      })
    const handleCloseModal = () => {
        setModalInfo({
          ...modalInfo,
          show: false,
        })

        if (modalInfo.theme === "information") {
          navigate("/profil")
        }
      }
      useEffect(() => {
        axios.get(base_url+`/Registry/Activation?Username=${params.username}&email=${params.email}`)
        .then((response) => {
            setModalInfo({
                show: true,
                title: "",
                text: response.data,
                theme: "information",
              })
        })
      }, [])
      
  return (
    <InformationModal
        show={modalInfo.show}
        title={modalInfo.title}
        text={modalInfo.text}
        theme={modalInfo.theme}
        onClose={handleCloseModal}
    />
  )
}
