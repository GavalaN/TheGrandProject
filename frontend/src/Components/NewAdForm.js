import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import TomSelect from 'tom-select';
import './NewAdForm.css';
import './Search.css'
import logo from '../Images/logo.png'
import Cookies from 'js-cookie';
import InformationModal from './InformationModal';

function yearRange(){
  let years = [];
  const currentYear = new Date().getFullYear();
  for(let i = 1885; i <= currentYear; i++){
      years.push(i);
  }
  return years.reverse();
}

export default function NewAdForm() {
  const base_url = process.env.REACT_APP_BASE_URL;
  const user = Cookies.get("user") == undefined? undefined : JSON.parse(Cookies.get("user"));
  //const [isActive, setIsActive] = useState(false);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [colors, setColors] = useState([])
  const [selectedBrand, setSelectedBrand] = useState(undefined);
  const [selectedType, setSelectedType] = useState(undefined);
  const [selectedColor, setSelectedColor] = useState(undefined);
  const years = yearRange();
  const [brandSelection, setBrandSelection] = useState([]);
  const [typeSelection, setTypeSelection] = useState([]);
  const [colorSelection, setColorSelection] = useState([]);
  const navigate = useNavigate();

  const [modalInfo, setModalInfo] = useState({
    show: false,
    title: "",
    text: "",
    theme: "information",
  })

  // Add a handler to close the modal
  const handleCloseModal = () => {
    setModalInfo({
      ...modalInfo,
      show: false,
    })
  }

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

  useEffect(() => {
          new TomSelect("#body_type",{
              create: false,
              controlInput: null,
              maxOptions: false,
              plugins: ["no_backspace_delete"],
          });
          new TomSelect("#fuel",{
            create: false,
            controlInput: null,
            maxOptions: false,
            plugins: ["no_backspace_delete"],
          });
          new TomSelect("#year",{
            create: false,
            controlInput: null,
            maxOptions: false,
            plugins: ["no_backspace_delete"],
          });
          new TomSelect("#number_of_cylinder",{
            create: false,
            controlInput: null,
            maxOptions: false,
            plugins: ["no_backspace_delete"],
          });
          new TomSelect("#motor_type",{
            create: false,
            controlInput: null,
            maxOptions: false,
            plugins: ["no_backspace_delete"],
          });
          new TomSelect("#drive_train",{
            create: false,
            controlInput: null,
            maxOptions: false,
            plugins: ["no_backspace_delete"],
          });
          new TomSelect("#gearbox",{
            create: false,
            controlInput: null,
            maxOptions: false,
            plugins: ["no_backspace_delete"],
          });
      }, [])
  
  //Brand
  useEffect(() => {
      axios.get(base_url+'/Brand/BrandGet')
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
          document.getElementById("type").setAttribute("disabled","")
      }
      else{
          document.getElementById("type").removeAttribute("disabled","")
      }
  }, [selectedBrand]);
  
  //Type
  useEffect(() => {
      if(selectedBrand != undefined && selectedBrand != ""){
          axios.get(base_url+'/Brand/GetTypeByBrand?id='+selectedBrand)
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

  //Color
  useEffect(() => {
    axios.get(base_url+'/Color/GetColor')
        .then(res => {
            console.log(res.data)
            setColors(res.data)
        })
    }, [])

  useEffect(() => {
      if (colors.length > 0) {
          const selection = colors.map((color) => ({
              value: color.id,
              text: color.name,
          }));
          setColorSelection(selection);
      }
  }, [colors])

  useEffect(() => {
      if(colorSelection.length > 0){
          new TomSelect("#color",{
              create: false,
              options: colorSelection,
              sortField: {
                  field: "text",
                  direction: "asc",
                  allowEmptyOption: true,
              }
          })
      }
  }, [colorSelection])

  function AdPOST(e){
    e.preventDefault();

    const body = 
    {
      id: 0,
      uploadDate: null,

      picId: 1,
      brandId: selectedBrand,
      typeId: selectedType,
      fuelType: document.getElementById("fuel").value,
      year: document.getElementById("year").value,
    
      bodyType: document.getElementById("body_type").value,
      colorId: selectedColor,
      kmClock: document.getElementById("odometer").value,
      kWeight: document.getElementById("kerb_wheight").value,
      
      
      transType: document.getElementById("gearbox").value,
      drive: document.getElementById("drive_train").value,
      engineType: document.getElementById("motor_type").value,
      numofCyl: document.getElementById("number_of_cylinder").value,
      cc: document.getElementById("ccm").value,
      horsepower: document.getElementById("horsepower").value,
      
      price: document.getElementById("price").value,
      description: document.getElementById("description").value,

      sellerId: user.id,
      
    }
    console.log(body)
    
    axios.post(base_url+'/Car/Add?token='+user.token, body)
    .then(response => {console.log(response); setModalInfo({
      show: true,
      title: response.data,
      text: "",
      theme: "information",
    }); navigate("/profil")})
  }

  //HandleChanges
  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
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
          <img src={logo} alt="placeholder"/>

          <h4>Általános adatok</h4>
          <hr/>
          <div className="form-group col-3">
            <label htmlFor="brand">Márka</label>
            <select id="brand" name="brand" className="form-select" data-placeholder="Válassz!" autoComplete="off" onChange={handleBrandChange}/>
          </div>
          <div className="form-group col-3">
            <label htmlFor="type_name">Típus</label>
            <select id="type" name="type" className="form-select" data-placeholder="Válassz!" autoComplete="off" onChange={handleTypeChange}/>
          </div>
          
          <div className="form-group col-3">
            <label htmlFor="fuel">Üzemanyag típusa</label>
            <select id='fuel' name='fuel' className='form-select'>
              <option value='0'>Válassz!</option>
              <option value="benzin">benzin</option>
              <option value="LPG + benzin">LPG + benzin</option>
              <option value="CNG + benzin">CNG + benzin</option>
              <option value="hibrid (benzin)">hibrid (benzin)</option>
              <option value="plug-in hibrid (benzin)">plug-in hibrid (benzin)</option>
              <option value="benzin + etanol">benzin + etanol</option>
              <option value="dízel">dízel</option>
              <option value="LPG + dízel">LPG + dízel</option>
              <option value="CNG + dízel">CNG + dízel</option>
              <option value="hibrid (dízel)">hibrid (dízel)</option>
              <option value="plug-in hibrid (dízel)">plug-in hibrid (dízel)</option>
              <option value="etanol">etanol</option>
              <option value="elektromos">elektromos</option>
              <option value="hidrogén (üzemanyagcellás)">hidrogén (üzemanyagcellás)</option>
            </select>
          </div>
          <div className="form-group col-3">
            <label htmlFor="year">Évjárat</label>
            <select id="year" name="year" className="form-select">
                <option value="0">Válassz!</option>
                {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
          </div>

          <h4>Jármű adatai</h4>
          <hr/>
          <div className="form-group col-3">
            <label htmlFor="body_type">Kivitel</label><br />
            <select id="body_type" name="body_type" className="form-select w-100">
              <option value="0">Válassz!</option>
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
            <label htmlFor='color'>Szín</label><br/>
            <select id="color" name="color" className="form-select" data-placeholder="Válassz!" autoComplete="off" onChange={handleColorChange}/>
          </div>
          <div className="form-group col-3">
            <label htmlFor="odometer">Kilométeróra állása</label>
            <div className="input-group">
              <input id="odometer" name="odometer" className="input" placeholder="-ig" onChange={handleInputChange}/>
              <div className="input-group-append">
                  <span className="">km</span>
              </div>
            </div>
          </div>
          <div className="form-group col-3">
            <label htmlFor="kerb_wheight">Súly</label>
            <div className="input-group">
              <input id='kerb_wheight' name='kerb_wheight' className='input' placeholder='-ig' onChange={handleInputChange} />
              <div className="input-group-append">
                  <span className="">kg</span>
              </div>
            </div>
          </div>

          <h4>Műszaki adatok</h4>
          <hr/>
          <div className="form-group col-3">
            <label htmlFor="gearbox">Váltó típusa</label><br/>
              <select id="gearbox" name="gearbox" className="form-select">
                  <option value="0">Válassz!</option>
                  <option value="Manuális">Manuális</option>
                  <option value="Félautomata">Félautomata</option>
                  <option value="Automata">Automata</option>
                  <option value="Triptronic">Triptronic</option>
                  <option value="CVT">CVT</option>
                  <option value="DCT">DCT</option>
              </select>
          </div>
          <div className="form-group col-3">
            <label htmlFor="drive_train">Hajtás</label><br/>
              <select id="drive_train" name="drive_train" className="form-select f-s-m">
                  <option value="0">Válassz!</option>
                  <option value="FWD">FWD</option>
                  <option value="RWD">RWD</option>
                  <option value="AWD">AWD</option>
                  <option value="4WD">4WD</option>
              </select>
          </div>
          <div className="form-group col-3">
            <label htmlFor="motor_type">Motor elrendezés</label><br/>
              <select id="motor_type" name="motor_type" className="form-select f-s-m">
                  <option value="0">Válassz!</option>
                  <option value="Soros">Soros</option>
                  <option value="V">V</option>
                  <option value="Boxer">Boxer</option>
                  <option value="W">W</option>
                  <option value="Rotary">Rotary</option>
              </select>
          </div>
          <div className="form-group col-3">
            <label htmlFor="number_of_cylinder">Hengerek száma</label><br/>
              <select id="number_of_cylinder" name="number_of_cylinder" className="form-select">
                  <option value="0">Válassz!</option>
                  <option value="1">1 db</option>
                  <option value="2">2 db</option>
                  <option value="3">3 db</option>
                  <option value="4">4 db</option>
                  <option value="5">5 db</option>
                  <option value="6">6 db</option>
                  <option value="8">8 db</option>
                  <option value="10">10 db</option>
                  <option value="12">12 db</option>
                  <option value="16">16 db</option>
                  <option value="-1">elektromos</option>
              </select>
          </div>
          <div className="form-group col-3">
            <label htmlFor="ccm">Motor térfogata</label>
            <div className="input-group">
              <input id='ccm' name='ccm' className='input' placeholder='-ig' onChange={handleInputChange} />
              <div className="input-group-append">
                  <span className="">cm³</span>
              </div>
            </div>
          </div>
          <div className="form-group col-3">
            <label htmlFor="horsepower">Teljesítmény (lóerő)</label>
            <div className="input-group">
              <input id='horsepower' name='horsepower' className='input' placeholder='-ig' onChange={handleInputChange} />
              <div className="input-group-append">
                  <span className="">LE</span>
              </div>
            </div>
          </div>

          <h4>Ár és leírás</h4>
          <hr/>
          <div className="form-group col-3">
            <label htmlFor="price">Ár</label>
            <div className="input-group">
                <input id="price" name="price" className="input" placeholder="-ig" onChange={handleInputChange} />
                <div className="input-group-append">
                    <span className="">Ft</span>
                </div>
            </div>
          </div>
          <div className="form-group col-12">
            <label htmlFor="description">Leírás</label>
            <textarea className="form-control" id="description" name="description" rows="5"></textarea>
          </div>
        </div>
        <button type="submit" className="btn btn-danger" onClick={AdPOST}>Hirdetés feladása</button>
      </form>
      <InformationModal
        show={modalInfo.show}
        title={modalInfo.title}
        text={modalInfo.text}
        theme={modalInfo.theme}
        onClose={handleCloseModal}
      />
    </div>
  );
}
