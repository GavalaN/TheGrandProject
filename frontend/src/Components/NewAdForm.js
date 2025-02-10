import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import TomSelect from 'tom-select';
import './NewAdForm.css';
import './Search.css'

export default function NewAdForm() {
    const [brands, setBrands] = useState([])
    const [selectedBrand, setSelectedBrand] = useState(null);
    useEffect(() => {
    axios.get('http://localhost:5000/Brand/BrandGet')
        .then(res => {
            console.log(res.data)
            setBrands(res.data)
        })
    }, [])

    const brandOptions = brands.map((brand) => ({
        value: brand.name,
        label: brand.name,
    }));

  return (
    <div>
      <h1>Új hirdetés feladása</h1>
      <form id="newad-form">
        <div className="row">
          <div className="form-group col-3">
            <label htmlFor="brand">Márka</label>
            <Select
              id="brand"
              options={brandOptions}
              value={selectedBrand}
              onChange={setSelectedBrand}
              className="form-control"
            />
          </div>
          <div className="form-group col-3">
            <label htmlFor="type_name">Típus</label>
            <input type="text" className="form-control" id="type_name" />
          </div>
          <div className="form-group col-3">
            <label htmlFor="body_type">Kivitel</label><br />
            <select id="body_type" name="body_type" className="form-select w-100">
              <option value="all">Összes</option>
              <option value="hatchback">Ferdehátú</option>
              <option value="station_wagon">Kombi</option>
              <option value="sedan">Szedán</option>
              <option value="coupe">Kupé</option>
              <option value="convertible">Kabrió</option>
              <option value="suv">SUV</option>
              <option value="pickup">Pickup</option>
              <option value="van">Van</option>
            </select>
          </div>
          <div className="form-group col-3">
            <label htmlFor="fuel_type">Üzemanyag típusa</label>
            <select id='fuel' name='fuel' className='form-select'>
              <option value='0'>Összes</option>
              <option value='1'>Benzin</option>
              <option value='2'>Dízel</option>
              <option value='3'>Elektromos</option>
              <option value='4'>Hibrid</option>
            </select>
          </div>
          <div className="form-group col-3">
            <label htmlFor="year">Évjárat</label>
            <input type="text" className="form-control" id="year" />
          </div>
          <div className="form-group col-3">
            <label htmlFor='color'>Szín</label><br/>
            <input type="text" className="form-control" id="color" />
          </div>
          <div className="form-group col-3">
            <label htmlFor="ccm">Motor térfogata</label>
            <input type="text" className="form-control" id="ccm" />
          </div>
          <div className="form-group col-3">
            <label htmlFor="horsepower">Teljesítmény (lóerő)</label>
            <input type="text" className="form-control" id="horsepower" />
          </div>
          <div className="form-group col-3">
            <label htmlFor="odometer">Kilométeróra állása</label>
            <input type="text" className="form-control" id="odometer" />
          </div>
          <div className="form-group col-3">
            <label htmlFor="price">Ár</label>
            <input type="text" className="form-control" id="price" />
          </div>
          <div className="form-group col-12">
            <label htmlFor="description">Leírás</label>
            <textarea className="form-control" id="description" rows="3"></textarea>
          </div>
        </div>
        <button type="submit" className="btn btn-danger">Hirdetés feladása</button>
      </form>
    </div>
  );
}
