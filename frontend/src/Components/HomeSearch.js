import React from 'react'
import './HomeSearch.css'

export default function HomeSearch() {
  return (
    <div id='home-search'>
        <form id='home-search-form' className=''>
            <div className='row d-flex'>
              <div className='col-auto'>
                <label for='manufacturer' className=''>Márka</label><br/>
                <input id='manufacturer' name='manufacturer' className='lg-input'></input>
              </div>
              <div class="col-auto">
                <label for='type' className=''>Típus</label><br/>
                <input id='type' name='type' className='lg-input'></input>
              </div>
              <div class="col-auto">
                <label for='fuel' className=''>Üzemanyag</label><br/>
                <input id='fuel' name='fuel' className='lg-input'></input>
              </div>
              <div class="col-auto">
                <label for='yearfrom' className=''>Évjárat</label><br/>
                <input id='yearfrom' className='sm-input-f' placeholder='-tól'></input>
                <input id='yearto' className='sm-input' placeholder='-ig'></input>
              </div>
              <div class="col-auto">
                <label for='pricefrom' className=''>Vételár</label><br/>
                <input id='pricefrom' className='sm-input-f' placeholder='-tól'></input>
                <input id='priceto' className='sm-input' placeholder='-ig'></input>
              </div>
            </div>
            <div id='home-search-lower' className='row'>
              <div className='col-6'>
                <p>Részletes keresés v</p>
                <button className='btn'>Keresés</button>
              </div>
            </div>
        </form>
    </div>
  )
}
