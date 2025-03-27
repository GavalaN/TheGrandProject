import React, { use, useCallback, useEffect, useState } from 'react'
import SearchSide from '../Components/SearchSide'
import axios from 'axios'
import CarCard from '../Components/CarCard'
import './SearchList.css'
import ReactPaginate from 'react-paginate'
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom'

export default function SearchList() {
  const base_url = process.env.REACT_APP_BASE_URL;
  const [cars, setCars] = useState([])
  const [dataCount, setDataCount] = useState(0)
  const [pageSize, setPageSize] = useState(3);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const params = useParams();
  const gigaSearch = Cookies.get("gigasearch") ? JSON.parse(Cookies.get("gigasearch")) 
      : {
          "id": 0,
          "brandId": 0,
          "typeId": 0,
          "bodyType": null,
          "fuelType": null,
          "yearMin": 0,
          "yearMax": 0,
          "priceMin": 0,
          "priceMax": 0,
          "kmClockMin": 0,
          "kmClockMax": 0,
          "colorId": 0,
          "ccMin": 0,
          "ccMax": 0,
          "hpMin": 0,
          "hpMax": 0,
          "numOfCyl": 0,
          "engineType": null,
          "drive": null,
          "transType": null,
          "kWeightMin": 0,
          "kWeightMax": 0
      };
  
  const handlePageClick = (event) => {
    const currentPage = event.selected + 1;
    console.log(`User requested page number ${currentPage}`);
    setPage(currentPage);
  };
  
  useEffect(() => {
    console.log("oldal: "+ (page))
    navigate(`/search/${page}`)
  }, [page])
  
  function contentChange(data){
    setCars(data)
    axios.post(base_url+'/Search/Gigasearch',gigaSearch)
    .then(response => {
        console.log(response.data.length);
        setDataCount(response.data.length);
    })
  }

  return (
   <div  className='content search-list'>
      <SearchSide contentChange = {contentChange} page = {page} pageSize = {pageSize}/>
      <div className="row">
        <div id='search-list'>
          {cars.map(car => {
            return <CarCard id={car.id} brand={car.brand} type_name={car.type_name} fuel_type={car.fuel_type} year={car.year} ccm={car.ccm} horsepower={car.hp} odometer={car.kmClock} price={car.price} description={car.description}/>
          })}
          <ReactPaginate
            containerClassName={"pagination d-flex justify-content-center"}
            breakLabel="..."
            nextLabel="előző >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={pageSize}
            pageCount={Math.ceil(dataCount/pageSize)}
            previousLabel="< következő"
            renderOnZeroPageCount={null}
            initialPage={params.page-1}
          />
        </div>
      </div>
    </div>
  )
}
