import { useEffect } from "react"
import { useState } from "react"
import ReactImageUploading from "react-images-uploading"
import { faCloudArrowUp, faWrench, faHammer } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Tooltip } from "react-tooltip"
import BeatLoader from "react-spinners/BeatLoader"
import Cookies from "js-cookie"
import InformationModal from "./InformationModal"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function NewAdPictures() {
  const [images, setImages] = useState([])
  const maxNumber = 6
  const carId = 4;
  const navigate = useNavigate()
  const user = Cookies.get("user")
  const base_url = process.env.REACT_APP_BASE_URL
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadingIndex, setUploadingIndex] = useState(-1) // Track which image is uploading by index

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
    setUploadError(null)
    setUploadSuccess(false)
  }

  const onChange = async (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex)
    setImages(imageList)

    // If there's an update index, it means we're updating a specific image
    if (addUpdateIndex !== undefined && addUpdateIndex.length > 0) {
      // Set the uploading index to the first updated image
      const indexToUpload = addUpdateIndex[0]
      setUploadingIndex(indexToUpload)

      // Simulate upload with 1 second timeout
      setTimeout(async () => {
        try {
          const formData = new FormData()

          // Get the file and its original name
          const file = imageList[indexToUpload].file
          const Filename = file.name

          // Append the file with the custom filename
          formData.append("file", file, Filename)

          console.log(`Uploading file with custom name: ${Filename}`)

          
          const response = await axios.post(base_url + `/Picture/Upload?carId=${carId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              setUploadProgress(percentCompleted)
            },
          })

          console.log("Upload success:", response.data)
          setUploadSuccess(true)
        } catch (error) {
          console.error("Upload failed:", error)
          setUploadError(error.response?.data || error.message)
        } finally {
          setUploadProgress(0)
          setUploadingIndex(-1) // Reset uploading index when done
        }
      }, 1000) // 1 second timeout
    }
  }

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

  const handleUpload = async () => {
    navigate("/profil")
    // if (!selectedFile) return

    // // Set upload progress to show loader
    // setUploadProgress(50)

    // // For the manual upload button, we're not tracking a specific image index
    // // This is for uploading a file selected via the file input

    // // Simulate upload with 1 second timeout
    // setTimeout(async () => {
    //   try {
    //     const formData = new FormData()

    //     // Get the original filename
    //     const originalFilename = selectedFile.name

    //     // Create a custom filename with "manual" prefix since this isn't from the image list
    //     const customFilename = `manual_${originalFilename}`

    //     // Append the file with the custom filename
    //     formData.append("file", selectedFile, customFilename)

    //     console.log(`Uploading file with custom name: ${customFilename}`)

    //     const carId = 1
    //     const response = await axios.post(base_url + `/Picture/Upload?carId=${carId}`, formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //       onUploadProgress: (progressEvent) => {
    //         const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    //         setUploadProgress(percentCompleted)
    //       },
    //     })

    //     console.log("Upload success:", response.data)
    //     setUploadSuccess(true)
    //   } catch (error) {
    //     console.error("Upload failed:", error)
    //     setUploadError(error.response?.data || error.message)
    //   } finally {
    //     setUploadProgress(0)
    //   }
    // }, 1000) // 1 second timeout
  }

  if (user !== undefined) {
    return (
      <div id="uploadphoto">
        <input type="file" id="fileupload" onChange={handleFileChange} />
        <h1>Képek feltöltése</h1>
        <div id="uploadphoto-form">
          <ReactImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
            {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
              // write your building UI
              <div className="upload-image-wrapper">
                <a
                  className="upload-image-dropzone"
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <div className="upload-image-dropzone-text">
                    <FontAwesomeIcon icon={faCloudArrowUp} size="2xl" />
                    <br />
                    Húzd ide a képet vagy kattints erre az elemre!
                  </div>
                </a>
                <div className="row">
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item col-4">
                      {uploadingIndex === index ? (
                        <div
                          className="loader-container"
                          style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}
                        >
                          <BeatLoader color="#0096D6" />
                        </div>
                      ) : (
                        <>
                          <a
                            href={image["data_url"]}
                            target="_blank"
                            data-tooltip-id="props-details"
                            data-tooltip-content="Kép megtekintése"
                            rel="noreferrer"
                          >
                            <img src={image["data_url"] || "/placeholder.svg"} alt="" width="100" />
                          </a>
                          <div className="upload-image-buttons">
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                setUploadingIndex(index) // Set this image as uploading before calling update
                                onImageUpdate(index)
                              }}
                              data-tooltip-id="props-details"
                              data-tooltip-content="Módosít"
                            >
                              <FontAwesomeIcon icon={faWrench} />
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => onImageRemove(index)}
                              data-tooltip-id="props-details"
                              data-tooltip-content="Törlés"
                            >
                              <FontAwesomeIcon icon={faHammer} />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ReactImageUploading>
          <button type="submit" className="btn lower" onClick={handleUpload}>
            Feltöltés
          </button>
        </div>
        <Tooltip id="props-details" />
      </div>
    )
  } else {
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

