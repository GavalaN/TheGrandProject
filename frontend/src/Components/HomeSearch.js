import React from 'react'
import './HomeSearch.css'

export default function HomeSearch() {
  return (
    <div id='home-search'>
        <form id='home-search-form'>
            <div className='row'>
              <div className='col-2'>
                <label for='manufacturer' className='align-self-start'>Márka</label><br/>
                <input id='manufacturer' name='manufacturer' className='lg-input'></input>
              </div>
              <div class="col-2">
                <label for='type' className='align-self-start'>Típus</label><br/>
                <input id='type' name='type' className='lg-input'></input>
              </div>
              <div class="col-2">
                <label for='fuel' className='align-self-start'>Üzemanyag</label><br/>
                <input id='fuel' name='fuel' className='lg-input'></input>
              </div>
              <div class="col-2">
                <label for='yearfrom' className='align-self-start'>Évjárat</label><br/>
                <input id='yearfrom' className='sm-input-f'></input>
                <input id='yearto' className='sm-input'></input>
              </div>
              <div class="col-2">
                <label for='pricefrom' className='align-self-start'>Vételár</label><br/>
                <input id='pricefrom' className='sm-input-f'></input>
                <input id='priceto' className='sm-input'></input>
              </div>
            </div> 
        </form>  
    </div>
  )
}
