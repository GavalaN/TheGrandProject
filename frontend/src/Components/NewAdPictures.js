import React, { useEffect } from 'react'
import { useState } from 'react';
import ReactImageUploading from 'react-images-uploading';
import { faCloudArrowUp, faWrench, faHammer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'react-tooltip';
import MoonLoader from 'react-spinners/MoonLoader';
import Cookies from 'js-cookie';
import InformationModal from './InformationModal';
import { useNavigate } from 'react-router-dom';

export default function NewAdPictures() {
    const [images, setImages] = useState([]);
    const maxNumber = 6;
    const navigate = useNavigate();
    const user = Cookies.get("user");

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

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
  
      if (user === undefined) {
        navigate("/login")
      }
    }

    useEffect(() => {
        if (user === undefined) {
          setModalInfo({
            show: true,
            title: "Képfeltöltéshez kérlek jelentkezz be!",
            text: "A kép feltöltéséhez bejelentkezés szükséges.",
            theme: "error",
          })
        }
      }, [])
    

  if (user !== undefined){
    return (
      <div id="uploadphoto">
        <h1>Képek feltöltése</h1>
        <div id="uploadphoto-form">
        <ReactImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload-image-wrapper">
              <a className="upload-image-dropzone"
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
              <div className="upload-image-dropzone-text">
                <FontAwesomeIcon icon={faCloudArrowUp} size="2xl"/>
                <br/>Húzd ide a képet vagy kattints erre az elemre!
              </div>
              </a>
              <div class="row">
              {imageList.map((image, index) => (
                // <MoonLoader speedMultiplier={0.5}>
                <div key={index} className="image-item col-4">
                  <a href={image['data_url']} target='_blank' data-tooltip-id="props-details" data-tooltip-content="Kép megtekintése">
                  <img src={image['data_url']} alt="" width="100" />
                  </a>
                  <div className="upload-image-buttons">
                    <button className="btn btn-primary" onClick={() => onImageUpdate(index)} data-tooltip-id="props-details" data-tooltip-content="Módosít"><FontAwesomeIcon icon={faWrench} /></button>
                    <button className="btn btn-danger" onClick={() => onImageRemove(index)} data-tooltip-id="props-details" data-tooltip-content="Törlés"><FontAwesomeIcon icon={faHammer} /></button>
                  </div>
                </div>
                // </MoonLoader>
              ))}
              </div>
            </div>
          )}
          

        </ReactImageUploading>
        <button type="submit" className="btn lower">Feltöltés</button>
        </div>
        <Tooltip id="props-details" />
      </div>
    )
  }
  else {
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
}
