import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import TomSelect from 'tom-select';
import './NewAdForm.css';
import './Search.css'

function yearRange(){
  let years = [];
  const currentYear = new Date().getFullYear();
  for(let i = 1885; i <= currentYear; i++){
      years.push(i);
  }
  return years.reverse();
}

export default function NewAdForm() {
  //const [isActive, setIsActive] = useState(false);
  const  years = yearRange();
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(undefined);
  const [selectedType, setSelectedType] = useState(undefined);
  const [brandSelection, setBrandSelection] = useState([])
  const [typeSelection, setTypeSelection] = useState([])

  function setInputFilter(textbox, inputFilter, errMsg) {
      ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function(event) {
        textbox.addEventListener(event, function(e) {
          if (inputFilter(this.value)) {
            // Accepted value
            if (["keydown","mousedown","focusout"].indexOf(e.type) >= 0){
              this.classList.remove("input-error");
              this.setCustomValidity("");
            }
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty("oldValue")) {
            // Rejected value - restore the previous one
            this.classList.add("input-error");
            this.setCustomValidity(errMsg);
            this.reportValidity();
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
          } else {
            // Rejected value - nothing to restore
            this.value = "";
          }
        });
      });
  }

  const handleInputChange = () => {
      //Ár ellenörzés
      setInputFilter(document.getElementById("price"), function(value) {
          return /^\d*$/.test(value); }, "Ide csak egész számot adhatsz meg!");

      //Km ellenörzés
      setInputFilter(document.getElementById("odometer"), function(value) {
          return /^\d*$/.test(value); }, "Ide csak egész számot adhatsz meg!");

      //Ccm ellenörzés
      setInputFilter(document.getElementById("ccm"), function(value) {
          return /^\d*$/.test(value); }, "Ide csak egész számot adhatsz meg!");

      //LE ellenörzés
      setInputFilter(document.getElementById("horsepower"), function(value) {
          return /^\d*$/.test(value); }, "Ide csak egész számot adhatsz meg!");
      
      //Kg ellenörzés
      setInputFilter(document.getElementById("kerb_wheight"), function(value) {
          return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 3500); }, "0kg és 3500Kg között adhatsz meg értéket!");
  

  
  }


  
  //Brand
  useEffect(() => {
      axios.get('http://localhost:5000/Brand/BrandGet')
          .then(res => {
              console.log(res.data)
              setBrands(res.data)
          })
      }, [])

  useEffect(() => {
      if (brands.length > 0) {
          const selection = brands.map((brand) => ({
              value: brand.id,
              text: brand.name,
          }));
          setBrandSelection(selection);
      }
  }, [brands])

  useEffect(() => {
      if(brandSelection.length > 0){
          new TomSelect("#brand",{
              create: false,
              options: brandSelection,
              sortField: {
                  field: "text",
                  direction: "asc",
                  allowEmptyOption: true,
              }
          })
      }
  }, [brandSelection])

  useEffect(() => {
      if (selectedBrand === "" || selectedBrand === undefined) {
          setSelectedType(undefined); // Alapértelmezett érték beállítása
          document.getElementById("type").setAttribute("disabled",false)
      }
      else{
          document.getElementById("type").removeAttribute("disabled",true)
      }
  }, [selectedBrand]);
  
  //Type
  useEffect(() => {
      if(selectedBrand != undefined && selectedBrand != ""){
          axios.get('http://localhost:5000/Brand/GetTypeByBrand?id='+selectedBrand)
          .then(res => {
              console.log(res.data)
              setTypes(res.data)
          })
      }
      else {
          const allType = 
          [{
              value: 0,
              text: "Mindegy"
          }]
          console.log(allType)
          setTypes(allType)
          console.log(types)
      }
      }, [selectedBrand])

  useEffect(() => {
      if (types.length > 0) {
          const selection = types.map((type) => ({
              value: type.id,
              text: type.typeName,
          }));
          setTypeSelection(selection);
      }
      if (selectedBrand == ""){
          setTypeSelection([])
          console.log("üres")
      }
      console.log(typeSelection)
      // else{
      //     const allType = 
      //     [{
      //         value: 0,
      //         text: "Mindegy"
      //     }]
      //     console.log(allType)
      //     setTypeSelection(allType)
      //     console.log(typeSelection)
      // }
  }, [types])

  useEffect(() => {
      const selectElement = document.querySelector("#type");

      if (!selectElement) return;

      if (selectElement.tomselect) {
          selectElement.tomselect.destroy(); // Korábbi példány törlése
      }

      const typeSelect = new TomSelect(selectElement, {
          create: false,
          options: typeSelection,
          sortField: { 
              field: "text", 
              direction: "asc" 
          },
          allowEmptyOption: true,
      });

      return () => {
          typeSelect.destroy();// Komponens unmountolásakor töröljük
      };
  }, [typeSelection]);

  //HandleChanges
  const handleBrandChange = (event) => {
      setSelectedBrand(event.target.value);
    };

    const handleTypeChange = (event) => {
      setSelectedType(event.target.value);
    };

  // const handleClick = (e) => {
  //     e.preventDefault();
  //     setIsActive((prevState) => !prevState);
  // };
  return (
    <div>
      <h1>Új hirdetés feladása</h1>
      <form id="newad-form">
        <div className="row">
          <div className="form-group col-3">
            <label htmlFor="brand">Márka</label>
            <select id="brand" name="brand" className="form-select" data-placeholder="Mindegy" autoComplete="off" onChange={handleBrandChange}/>
          </div>
          <div className="form-group col-3">
            <label htmlFor="type_name">Típus</label>
            <select id="type" name="type" className="form-select" data-placeholder="Mindegy" autoComplete="off" onChange={handleTypeChange}/>
          </div>
          <div className="form-group col-3">
            <label htmlFor="body_type">Kivitel</label><br />
            <select id="body_type" name="body_type" className="form-select w-100">
              <option value="all">Összes</option>
              <option value="ferdehátú">ferdehátú</option>
              <option value="kombi">kombi</option>
              <option value="szedán">szedán</option>
              <option value="kupé">kupé</option>
              <option value="egyterű">egyterű</option>
              <option value="SUV">SUV</option>
              <option value="terepjáró">terepjáró</option>
              <option value="pickup">pickup</option>
              <option value="kabrió">kabrió</option>
              <option value="kisbusz">kisbusz</option>
              <option value="egyéb">egyéb</option>
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
            {/* <input className="form-control" id="year"/> */}
            <select id="year" name="year" className="form-control">
                <option value="0">évjárat</option>
                {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
          </div>
          <div className="form-group col-3">
            <label htmlFor='color'>Szín</label><br/>
            <input type="text" className="form-control" id="color" />
          </div>
          <div className="form-group col-3">
            <label htmlFor="ccm">Motor térfogata</label>
            <input className="form-control" id="ccm" onChange={handleInputChange}/>
          </div>
          <div className="form-group col-3">
            <label htmlFor="horsepower">Teljesítmény (lóerő)</label>
            <input className="form-control" id="horsepower" onChange={handleInputChange}/>
          </div>
          <div className="form-group col-3">
            <label htmlFor="odometer">Kilométeróra állása</label>
            <input className="form-control" id="odometer" onChange={handleInputChange}/>
          </div>
          <div className="form-group col-3">
            <label htmlFor="price">Súly</label>
            <input className="form-control" id="kerb_wheight" onChange={handleInputChange}/>
          </div>
          <div className="form-group col-3">
            <label htmlFor="price">Ár</label>
            <input className="form-control" id="price" onChange={handleInputChange}/>
          </div>
          <div className="form-group col-12">
            <label htmlFor="description">Leírás</label>
            <textarea className="form-control" id="description" rows="5"></textarea>
          </div>
        </div>
        <button type="submit" className="btn btn-danger">Hirdetés feladása</button>
      </form>
    </div>
  );
}
