import React from 'react'
import { useState } from 'react';
import ReactImageUploading from 'react-images-uploading';
import { faCloudArrowUp, faWrench, faHammer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NewAdPictures() {
    const [images, setImages] = useState([]);
    const maxNumber = 6;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

  return (
    <div id="uploadpic">
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
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
                <FontAwesomeIcon icon={faCloudArrowUp} size="2xl"/>
                <br/>Húzd ide a képet vagy kattints erre az elemre!
            </button>
            &nbsp;
            <div class="row">
            {imageList.map((image, index) => (
              <div key={index} className="image-item col-4">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button className="btn btn-primary" onClick={() => onImageUpdate(index)}><FontAwesomeIcon icon={faWrench} /></button>
                  <button className="btn btn-danger" onClick={() => onImageRemove(index)}><FontAwesomeIcon icon={faHammer} /></button>
                </div>
              </div>
            ))}
            </div>
          </div>
        )}
      </ReactImageUploading>
    </div>
  )
}
