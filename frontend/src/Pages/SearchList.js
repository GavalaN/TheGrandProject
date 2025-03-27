import React, { use, useCallback, useEffect, useState } from 'react'
import SearchSide from '../Components/SearchSide'
import axios from 'axios'
import CarCard from '../Components/CarCard'
import './SearchList.css'
import ReactPaginate from 'react-paginate'

export default function SearchList() {
  const base_url = process.env.REACT_APP_BASE_URL;
  const [cars, setCars] = useState([])
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1)

  // useEffect(() => {
  //   axios.get(base_url+'/CarDTO/GetAll')
  //     .then(res => {
  //       console.log(res)
  //       setCars(res.data)
  //     })


  // }, [])

  function contentChange(data){
    setCars(data)
  }

  return (
   <div  className='content search-list'>
      <SearchSide contentChange = {contentChange}/>
      <div className="row">
        <div id='search-list'>
          {cars.map(car => {
            return <CarCard id={car.id} brand={car.brand} type_name={car.type_name} fuel_type={car.fuel_type} year={car.year} ccm={car.ccm} horsepower={car.hp} odometer={car.kmClock} price={car.price} description={car.description}/>
          })}
          <ReactPaginate
            containerClassName={"pagination d-flex justify-content-center"}
            breakLabel="..."
            nextLabel="előző >"
            onPageChange={contentChange}
            pageRangeDisplayed={pageSize}
            pageCount={page}
            previousLabel="< következő"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  )
}
