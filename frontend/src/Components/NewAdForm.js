import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './NewAdForm.css';

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
      <form>
        <div className="form-group">
          <label htmlFor="brand">Márka</label>
          <Select
            id="brand"
            options={brandOptions}
            value={selectedBrand}
            onChange={setSelectedBrand}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="type_name">Típus</label>
          <input type="text" className="form-control" id="type_name" />
        </div>
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="fuel_type">Üzemanyag típusa</label>
          <input type="text" className="form-control" id="fuel_type" />
        </div>
        <div className="form-group">
          <label htmlFor="year">Évjárat</label>
          <input type="text" className="form-control" id="year" />
        </div>
        <div className="form-group">
          <label htmlFor="ccm">Motor térfogata</label>
          <input type="text" className="form-control" id="ccm" />
        </div>
        <div className="form-group">
          <label htmlFor="horsepower">Teljesítmény (lóerő)</label>
          <input type="text" className="form-control" id="horsepower" />
        </div>
        <div className="form-group">
          <label htmlFor="odometer">Kilométeróra állása</label>
          <input type="text" className="form-control" id="odometer" />
        </div>
        <div className="form-group">
          <label htmlFor="price">Ár</label>
          <input type="text" className="form-control" id="price" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Leírás</label>
          <textarea className="form-control" id="description" rows="3"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Hirdetés feladása</button>
      </form>
    </div>
  );
}
