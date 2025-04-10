import { useEffect, useRef } from "react"
import { useState } from "react"
import ReactImageUploading from "react-images-uploading"
import { faCloudArrowUp, faWrench, faHammer, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Tooltip } from "react-tooltip"
import BeatLoader from "react-spinners/BeatLoader"
import Cookies from "js-cookie"
import InformationModal from "../Components/InformationModal"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function NewAdPictures() {
  const [images, setImages] = useState([])
  const maxNumber = 6
  const carId = Cookies.get("carId")
  const navigate = useNavigate()
  const user = Cookies.get("user")
  const base_url = process.env.REACT_APP_BASE_URL
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadingIndex, setUploadingIndex] = useState(-1) // Track which image is uploading by index
  const [deletingIndex, setDeletingIndex] = useState(-1) // Track which image is being deleted
  const [updatingIndex, setUpdatingIndex] = useState(-1) // Track which image is being updated
  const [imageToUpdateIndex, setImageToUpdateIndex] = useState(-1) // Track which image is selected for update
  const [isLoading, setIsLoading] = useState(true) // Track if we're loading existing images
  const [isModify, setIsModify] = useState(false) // Track if we're in modify mode
  const [isUploading, setIsUploading] = useState(true) // Track if we're uploading images

  // Create a ref for the hidden file input
  const fileInputRef = useRef(null)

  const [modalInfo, setModalInfo] = useState({
    show: false,
    title: "",
    text: "",
    theme: "information",
  })

  // Function to fetch existing images for the car
  const fetchExistingImages = async () => {
    if (!carId) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    try {
      // Get the list of image filenames for this car
      const response = await axios.get(`${base_url}/Picture/bycar/${carId}`)

      if (response.data && Array.isArray(response.data)) {
        const fileNames = response.data
        if (fileNames.length > 0) {
          setIsModify(true);
        }
        // Create an array to hold all the image promises
        const imagePromises = fileNames.map(async (fileName) => {
          try {
            // Create a URL for the image
            const imageUrl = `${base_url}/Picture/download/${fileName}`

            // Create an image object with the URL and serverFilename
            return {
              data_url: imageUrl,
              serverFilename: fileName,
              isExisting: true, // Flag to indicate this is an existing image
            }
          } catch (error) {
            console.error(`Error loading image ${fileName}:`, error)
            return null
          }
        })

        // Wait for all images to be processed
        const loadedImages = await Promise.all(imagePromises)

        // Filter out any null values (failed loads)
        const validImages = loadedImages.filter((img) => img !== null)

        // Set the images in state
        setImages(validImages)
      }
    } catch (error) {
      if (isModify == true) {
        console.error("Error fetching existing images:", error)
        setModalInfo({
          show: true,
          title: "Hiba",
          text: "Nem sikerült betölteni a meglévő képeket: " + ("nincs még feltöltve kép" || error.message),
          theme: "error",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

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

          console.log(`filename: ${Filename}`)

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

          // Store the response data in the image object
          if (response.data) {
            // Store the bodyType as the filename for later use with delete
            if (response.data.bodyType) {
              imageList[indexToUpload].serverFilename = response.data.bodyType
            }
            // Store the entire response data for reference
            imageList[indexToUpload].responseData = response.data
            setImages([...imageList])
          }

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

  // Function to handle file selection for update
  const handleFileSelected = async (e) => {
    if (imageToUpdateIndex === -1 || !e.target.files || !e.target.files[0]) {
      return
    }

    const file = e.target.files[0]
    const index = imageToUpdateIndex
    const imageToUpdate = images[index]

    // Reset the index after getting the file
    setImageToUpdateIndex(-1)

    // Set the updating index to show loading state
    setUpdatingIndex(index)

    try {
      const formData = new FormData()

      // Append the selected file to the form data
      formData.append("file", file)

      // Make PUT request to your API with the file and filename
      const response = await axios.put(
        `${base_url}/Picture/Update?filename=${imageToUpdate.serverFilename}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadProgress(percentCompleted)
          },
        },
      )

      console.log("Update success:", response.data)

      // Update the image in the state with the new file
      const updatedImages = [...images]

      // Create a new data URL for the updated image
      const reader = new FileReader()
      reader.onload = () => {
        updatedImages[index] = {
          ...updatedImages[index],
          data_url: reader.result,
          file: file,
          isExisting: true,
        }
        setImages(updatedImages)
      }
      reader.readAsDataURL(file)

      // Show success modal
      setModalInfo({
        show: true,
        title: "Sikeres módosítás",
        text: response.data || `A(z) ${imageToUpdate.serverFilename} nevű kép sikeresen módosítva lett.`,
        theme: "information",
      })
    } catch (error) {
      console.error("Update failed:", error)

      // Show error modal
      setModalInfo({
        show: true,
        title: "Hiba történt a módosítás során",
        text: error.response?.data || error.message || "Ismeretlen hiba történt",
        theme: "error",
      })
    } finally {
      setUpdatingIndex(-1) // Reset updating index when done
      setUploadProgress(0)
    }
  }

  // Function to trigger file selection for update
  const handleUpdateImage = (index) => {
    const imageToUpdate = images[index]

    // If the image doesn't have a serverFilename, it hasn't been uploaded to the server yet
    if (!imageToUpdate.serverFilename) {
      // Show error modal
      setModalInfo({
        show: true,
        title: "Hiba",
        text: "A kép még nem lett feltöltve a szerverre, nem lehet módosítani.",
        theme: "error",
      })
      return
    }

    // Set the index of the image to update
    setImageToUpdateIndex(index)

    // Trigger the file input click
    fileInputRef.current.click()
  }

  // Function to show delete response modal
  const showDeleteResponseModal = (success, filename, errorMessage = null) => {
    if (success) {
      setModalInfo({
        show: true,
        title: "Sikeres törlés",
        text: `A(z) ${filename} nevű kép sikeresen törölve lett.`,
        theme: "information",
      })
    } else {
      setModalInfo({
        show: true,
        title: "Hiba történt a törlés során",
        text: errorMessage || `A(z) ${filename} nevű kép törlése sikertelen volt.`,
        theme: "error",
      })
    }
  }

  // New function to handle deleting an attachment
  const handleDeleteAttachment = async (index) => {
    const imageToDelete = images[index]

    // If the image doesn't have a serverFilename, it hasn't been uploaded to the server yet
    if (!imageToDelete.serverFilename) {
      // Just remove it from the local state
      const newImages = [...images]
      newImages.splice(index, 1)
      setImages(newImages)
      return
    }

    // Set the deleting index to show loading state
    setDeletingIndex(index)

    try {
      // Make DELETE request to your API with the correct endpoint format
      // Using the bodyType field from the response as the filename
      const response = await axios.delete(`${base_url}/Picture/${imageToDelete.serverFilename}`)

      // Remove the image from the state after successful deletion
      const newImages = [...images]
      newImages.splice(index, 1)
      setImages(newImages)

      // Show success modal
      showDeleteResponseModal(true, imageToDelete.serverFilename)
    } catch (error) {
      console.error("Delete failed:", error)
      setUploadError(error.response?.data || error.message)

      // Show error modal
      showDeleteResponseModal(
        false,
        imageToDelete.serverFilename,
        error.response?.data?.message || error.message || "Ismeretlen hiba történt",
      )
    } finally {
      setDeletingIndex(-1) // Reset deleting index when done
    }
  }

  const handleCloseModal = () => {
    setModalInfo({
      ...modalInfo,
      show: false,
    })

    if (user === undefined) {
      navigate("/login")
    }

    if (isUploading === false) {
      navigate("/profil")
      Cookies.remove("carId")
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
      setIsLoading(false)
    } else {
      // Fetch existing images when the component mounts
      fetchExistingImages()
    }
  }, [])

  const handleUpload = async () => {
    setModalInfo({
      show: true,
      title: "Sikeres képfeltöltés!",
      text: "Most elviszünk Borsodba.",
      theme: "information",
    })
    setIsUploading(false);
  }


  if (user !== undefined) {
    return (
      <div id="uploadphoto">
        <h1>{isModify ? "Képek módosítása" : "Képek feltöltése"}</h1>
        <div id="uploadphoto-form">
          {/* Hidden file input for image updates */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileSelected}
            accept="image/jpeg,image/png,image/gif,image/jpg"
          />

          {isLoading ? (
            <div
              className="loading-container"
              style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}
            >
              <BeatLoader color="#0096D6" />
              <span className="ml-3">Képek betöltése...</span>
            </div>
          ) : (
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
                        ) : updatingIndex === index ? (
                          <div
                            className="loader-container"
                            style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}
                          >
                            <BeatLoader color="#FFA500" />
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
                              <img
                                src={image["data_url"] || "/placeholder.svg"}
                                alt=""
                                width="100"
                                onError={(e) => {
                                  if (image.isExisting) {
                                    e.target.src = `${image.data_url}?t=${new Date().getTime()}`
                                  }
                                }}
                              />
                            </a>
                            <div className="upload-image-buttons">
                              {/* Update button */}
                              {image.serverFilename && (
                                <button
                                  className="btn btn-primary"
                                  onClick={() => handleUpdateImage(index)}
                                  disabled={updatingIndex === index}
                                  data-tooltip-id="props-details"
                                  data-tooltip-content="Módosít"
                                >
                                  <FontAwesomeIcon icon={faWrench} />
                                </button>
                              )}

                              {/* Upload/Update button for images not yet uploaded */}
                              {!image.serverFilename && (
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    setUploadingIndex(index)
                                    onImageUpdate(index)
                                  }}
                                  data-tooltip-id="props-details"
                                  data-tooltip-content="Feltölt"
                                >
                                  <FontAwesomeIcon icon={faWrench} />
                                </button>
                              )}

                              {/* Delete button with loading state */}
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteAttachment(index)}
                                disabled={deletingIndex === index || updatingIndex === index}
                                data-tooltip-id="props-details"
                                data-tooltip-content="Törlés"
                              >
                                {deletingIndex === index ? (
                                  <FontAwesomeIcon icon={faSpinner} spin />
                                ) : (
                                  <FontAwesomeIcon icon={faHammer} />
                                )}
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
          )}

          <button type="submit" className="btn lower" onClick={handleUpload}>
            {isModify ? "Mentés" : "Feltöltés"}
          </button>
        </div>
        <Tooltip id="props-details" />

        {/* Information Modal for showing messages */}
        <InformationModal
          show={modalInfo.show}
          title={modalInfo.title}
          text={modalInfo.text}
          theme={modalInfo.theme}
          onClose={handleCloseModal}
        />
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

