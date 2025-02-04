import React from 'react'
import SearchSide from '../Components/SearchSide'
import axios from 'axios'

axios.get('http://localhost:5000/CarDTO/GetAll')
  .then(res => {
    console.log(res)
  })

export default function SearchList() {
  return (
    <div className='content'>
      <h1>Találatok</h1>
      <SearchSide/>
    </div>
  )
}
