import React, { use, useCallback, useEffect, useState } from 'react'
import SearchSide from '../Components/SearchSide'
import axios from 'axios'
import CarCard from '../Components/CarCard'
import './SearchList.css'
import ReactPaginate from 'react-paginate'

export default function SearchList() {
  const base_url = process.env.REACT_APP_BASE_URL;
  const [cars, setCars] = useState([])
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  
  const handlePageClick = (event) => {
    const newOffset = (event.selected * pageSize) % cars.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  
  function contentChange(data){
    setCars(data)
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
            pageCount={cars.length/pageSize}
            previousLabel="< következő"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  )
}
