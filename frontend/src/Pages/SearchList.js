import React, { use, useCallback, useEffect, useState } from 'react'
import SearchSide from '../Components/SearchSide'
import axios from 'axios'
import CarCard from '../Components/CarCard'
import './SearchList.css'

export default function SearchList() {
  const [cars, setCars] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/CarDTO/GetAll')
      .then(res => {
        console.log(res)
        setCars(res.data)
      })


  }, [])

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
        </div>
      </div>
    </div>
  )
}
