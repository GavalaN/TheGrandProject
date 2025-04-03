import React, { useEffect, useState } from 'react'
import './CarCard.css'
import 'react-tooltip/dist/react-tooltip.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css';
import { BeatLoader } from 'react-spinners'

export default function CarCardDetailed() {
    const base_url = process.env.REACT_APP_BASE_URL;
    const [carDetailed, setCarDetailed] = useState([]);
    const params = useParams();
    const [imageUrls, setImageUrls] = useState([]);
    const [imageFileNames, setImageFileNames] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(base_url+'/Hirdetes/GetHirdetesById?id='+params.id)
        .then(response => {console.log(response.data); setCarDetailed(response.data)})
    }, [])

    useEffect(() => {
        axios.get(base_url+`/Picture/bycar/${params.id}`)
            .then(response => {
                console.log(response.data); 
                setImageFileNames(response.data);
            })
            .catch(error => console.error('Error fetching image names:', error));
    }, [carDetailed]);
    
    useEffect(() => {
        if (!imageFileNames || imageFileNames.length === 0) {
            setIsLoading(false);
            return;
        }
    
        setIsLoading(true);
        const fetchImages = async () => {
            try {
                const urls = await Promise.all(
                    imageFileNames.map(async (item) => {
                        const response = await axios.get(base_url+`/Picture/download/${item}`, { responseType: 'blob' });
                        return URL.createObjectURL(response.data);
                    })
                );
                setImageUrls(urls);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching images:', error);
                setIsLoading(false);
                // Optionally set some fallback images here
            }
        };
    
        fetchImages();
    }, [imageFileNames]);

  return (
    <div className="car-card-detailed">
        <h2>{carDetailed.brand} {carDetailed.type_Name}</h2>
        <div className="row">
            <div className="col-8">
                <div className="car-card-img">
                    {/* Main large image */}
                    <div className="main-image-container">
                        {isLoading ? (
                            <div className="loader-container">
                                <BeatLoader color="#0096D6" size={15} />
                                <p>Képek betöltése...</p>
                            </div>
                        ) : imageUrls.length > 0 ? (
                            <PhotoProvider
                                loop={false}
                                speed={() => 800}
                                easing={(type) => (type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}
                            >
                                {imageUrls.map((url, index) => (
                                    <PhotoView key={index} src={url}>
                                        {index === selectedImageIndex && (
                                            <img
                                                src={url || "/placeholder.svg"}
                                                alt={`Car ${index + 1}`}
                                                className="main-image"
                                            />
                                        )}
                                    </PhotoView>
                                ))}
                            </PhotoProvider>
                        ) : (
                            <div className="no-images-container">
                                <p>Nincsenek elérhető képek</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Thumbnails container */}
                    {!isLoading && imageUrls.length > 0 && (
                        <div className="thumbnails-row">
                            {imageUrls.map((url, index) => (
                                <div 
                                    key={index} 
                                    className={`thumbnail-container ${selectedImageIndex === index ? 'selected' : ''}`}
                                    onClick={() => setSelectedImageIndex(index)}
                                >
                                    <img
                                        src={url || "/placeholder.svg"}
                                        alt={`Car thumbnail ${index + 1}`}
                                        className="thumbnail"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {!isLoading && imageUrls.length > 0 && (
                    <p className="text-center">Kattintson a képre a nagyításhoz vagy válasszon a kisképek közül</p>
                )}
            </div>
            <div className="col-4">
                <h1>{carDetailed.price} Ft</h1>
                <div className="car-card-text">
                    <h3>Általános adatok</h3>
                    <hr className="my-1"/>
                        <p>Márka: {carDetailed.brand}</p>
                        <p>Típus: {carDetailed.type_Name}</p>
                        <p>Üzemanyag típusa: {carDetailed.fuel_Type}</p>
                        <p>Évjárat: {carDetailed.year}</p>
                    <h3>Jármű adatai</h3>
                    <hr className="my-1"/>
                        <p>Kivitel: {carDetailed.bodyType}</p>
                        <div className="color-display">
                            <p>Szín: {carDetailed.color}</p>
                            <div id="colorShape" style={{ backgroundColor: carDetailed.hexcode }}></div>
                        </div>                        
                        <p>Kilométeróra állás: {carDetailed.kmClock} km</p>
                        <p>Súly: {carDetailed.kWeight} kg</p>
                    <h3>Műszaki adatok</h3>
                    <hr className="my-1"/>
                        <p>Váltó típusa: {carDetailed.transType}</p>
                        <p>Hajtás: {carDetailed.drive}</p>
                        <p>Henger elrendezés: {carDetailed.engineType}</p>
                        <p>Hengerek száma: {carDetailed.numofCylinders} db</p>
                        <p>Motor térfogata: {carDetailed.ccm} cm³</p>
                        <p>Teljesítmény: {carDetailed.hp} LE</p>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="car-card-text col-12 mx-auto">
                <h3 className="mt-2">Leírás</h3>
                <hr className="my-1"/>
                <p>{carDetailed.description}</p>

                <h3 className="mt-2">Hírdető adatai</h3>
                <hr className="my-1"/>
                <div className="row">
                    <div className="col-12">
                        <p>Hírdető neve: {carDetailed.username}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <p>Telefon száma: {carDetailed.phoneNum}</p>
                    </div>
                    <div className="col-8">
                        <a href={`tel:${carDetailed.phoneNum}`} className="btn">Vevő felhívása</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <p>Email címe: {carDetailed.email}</p>
                    </div>
                    <div className="col-8">
                        <a href={`mailto:${carDetailed.email}`} className="btn">E-mail küldése a vevőnek</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
