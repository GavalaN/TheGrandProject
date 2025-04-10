import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import TomSelect from "tom-select"
import "./NewAdForm.css"
import "./Search.css"
import Cookies from "js-cookie"
import InformationModal from "../Components/InformationModal"

function yearRange() {
  const years = []
  const currentYear = new Date().getFullYear()
  for (let i = 1885; i <= currentYear; i++) {
    years.push(i)
  }
  return years.reverse()
}

export default function NewAd() {
  const base_url = process.env.REACT_APP_BASE_URL;
  const user = Cookies.get("user") == undefined? undefined : JSON.parse(Cookies.get("user"));
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
  const params = useParams();
  const location = useLocation();
  const isModify = location.pathname.includes("modositas") ? true : false;
  const [carModify, setCarModify] = useState(undefined);

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

    // Check if the user is logged in
    if (user === undefined) {
      navigate("/login")
    }

    // Only navigate after closing if it was a success modal
    if (modalInfo.theme === "information") {
      navigate("/kepfeltoltes")
    }
  }

  useEffect(() => {
    if (user === undefined) {
      setModalInfo({
        show: true,
        title: "Hirdetésfeladáshoz kérlek jelentkezz be!",
        text: "A hirdetés feladásához bejelentkezés szükséges.",
        theme: "error",
      })
    }
  }, [])

  function setInputFilter(textbox, inputFilter, errMsg) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach((event) => {
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
      //Check price
      setInputFilter(document.getElementById("price"), (value) => /^\d*$/.test(value), "Ide csak egész számot adhatsz meg!");

      //Check odometer
      setInputFilter(document.getElementById("odometer"), (value) => /^\d*$/.test(value), "Ide csak egész számot adhatsz meg!");

      //Check ccm
      setInputFilter(document.getElementById("ccm"), (value) => /^\d*$/.test(value), "Ide csak egész számot adhatsz meg!");

      //Check horsepower
      setInputFilter(document.getElementById("horsepower"), (value) => /^\d*$/.test(value), "Ide csak egész számot adhatsz meg!");
      
      //Check kerb weight
      setInputFilter(document.getElementById("kerb_wheight"), (value) => /^\d*$/.test(value) && (value === "" || Number.parseInt(value) <= 3500), "0kg és 3500Kg között adhatsz meg értéket!");
  

  
  }

  //TomSelect init
  useEffect(() => {
    if (user !== undefined){
            const body_typeSelect = new TomSelect("#body_type",{
                create: false,
                controlInput: null,
                maxOptions: false,
                plugins: ["no_backspace_delete"],
            });
            const fuelSelect = new TomSelect("#fuel",{
              create: false,
              controlInput: null,
              maxOptions: false,
              plugins: ["no_backspace_delete"],
            });
            const yearSelect = new TomSelect("#year",{
              create: false,
              controlInput: null,
              maxOptions: false,
              plugins: ["no_backspace_delete"],
            });
            const number_of_cylinderSelect = new TomSelect("#number_of_cylinder",{
              create: false,
              controlInput: null,
              maxOptions: false,
              plugins: ["no_backspace_delete"],
            });
            const motor_typeSelect = new TomSelect("#motor_type",{
              create: false,
              controlInput: null,
              maxOptions: false,
              plugins: ["no_backspace_delete"],
            });
            const drive_trainSelect = new TomSelect("#drive_train",{
              create: false,
              controlInput: null,
              maxOptions: false,
              plugins: ["no_backspace_delete"],
            });
            const gearboxSelect = new TomSelect("#gearbox",{
              create: false,
              controlInput: null,
              maxOptions: false,
              plugins: ["no_backspace_delete"],
            });
            if (carModify != undefined) {
              body_typeSelect.setValue(carModify.bodyType);
              fuelSelect.setValue(carModify.fuelType);
              yearSelect.setValue(carModify.year);
              gearboxSelect.setValue(carModify.transType)
              drive_trainSelect.setValue(carModify.drive)
              motor_typeSelect.setValue(carModify.engineType)
              number_of_cylinderSelect.setValue(String(carModify.numOfCyl))
              console.log(number_of_cylinderSelect.value)

              document.getElementById("odometer").value = carModify.kmClock;
              document.getElementById("kerb_wheight").value = carModify.kWeight;
              document.getElementById("ccm").value = carModify.cc;
              document.getElementById("horsepower").value = carModify.horsepower;
              document.getElementById("price").value = carModify.price;
              document.getElementById("description").value = carModify.description;
            }
            
            // Return a cleanup function that safely destroys all TomSelect instances
          return () => {
            // Safely destroy all TomSelect instances with null checks
            if (body_typeSelect && body_typeSelect.destroy) {
              try {
                body_typeSelect.destroy()
              } catch (e) {
                console.warn("Error destroying body_typeSelect:", e)
              }
            }
      
            if (fuelSelect && fuelSelect.destroy) {
              try {
                fuelSelect.destroy()
              } catch (e) {
                console.warn("Error destroying fuelSelect:", e)
              }
            }
      
            if (yearSelect && yearSelect.destroy) {
              try {
                yearSelect.destroy()
              } catch (e) {
                console.warn("Error destroying year_fromSelect:", e)
              }
            }
      
            if (number_of_cylinderSelect && number_of_cylinderSelect.destroy) {
              try {
                number_of_cylinderSelect.destroy()
              } catch (e) {
                console.warn("Error destroying number_of_cylinderSelect:", e)
              }
            }
      
            if (motor_typeSelect && motor_typeSelect.destroy) {
              try {
                motor_typeSelect.destroy()
              } catch (e) {
                console.warn("Error destroying motor_typeSelect:", e)
              }
            }
      
            if (drive_trainSelect && drive_trainSelect.destroy) {
              try {
                drive_trainSelect.destroy()
              } catch (e) {
                console.warn("Error destroying drive_trainSelect:", e)
              }
            }
      
            if (gearboxSelect && gearboxSelect.destroy) {
              try {
                gearboxSelect.destroy()
              } catch (e) {
                console.warn("Error destroying gearboxSelect:", e)
              }
            }
          }
        }
      }, [carModify])
  
  //Brand
  useEffect(() => {
    if (user !== undefined){
      axios.get(base_url+'/Brand/BrandGet')
          .then(res => {
              console.log(res.data)
              setBrands(res.data)
          })
    }
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

  //Brand select init
  useEffect(() => {
    if(brandSelection.length > 0){
        // Check if there's an existing TomSelect instance and destroy it
        const brandElement = document.querySelector("#brand");
        if (brandElement && brandElement.tomselect) {
            brandElement.tomselect.destroy();
        }
        
        const brandSelect = new TomSelect("#brand",{
            create: false,
            options: brandSelection,
            sortField: {
                field: "text",
                direction: "asc",
                allowEmptyOption: true,
            },
            // Add an onChange handler to update the selectedBrand state
            onChange: (value) => {
                setSelectedBrand(value);
            }
        });
        
        // If we're in modify mode and have car data, set the brand value
        if (carModify !== undefined) {
            brandSelect.setValue(carModify.brandId);
            setSelectedBrand(carModify.brandId);
        }
        
        // Return cleanup function
        return () => {
            if (brandSelect && brandSelect.destroy) {
                try {
                    brandSelect.destroy();
                } catch (e) {
                    console.warn("Error destroying brandSelect:", e);
                }
            }
        };
    }
}, [brandSelection, carModify]);

  useEffect(() => {
    if (user !== undefined){
      if (selectedBrand === "" || selectedBrand === undefined) {
          setSelectedType(undefined); // Alapértelmezett érték beállítása
          document.getElementById("type").setAttribute("disabled","")
      }
      else{
          document.getElementById("type").removeAttribute("disabled","")
      }
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
  }, [types])

  //Type select init
  useEffect(() => {
    const selectElement = document.querySelector("#type");

    if (!selectElement) return;

    // Only proceed if we have type options to show
    if (typeSelection.length === 0 && !carModify) return;

    if (selectElement.tomselect) {
        selectElement.tomselect.destroy(); // TomSelect destroy
    }

    const typeSelect = new TomSelect(selectElement, {
        create: false,
        options: typeSelection,
        sortField: { 
            field: "text", 
            direction: "asc" 
        },
        allowEmptyOption: true,
        onChange: (value) => {
            setSelectedType(value);
        }
    });
    
    // If we're in modify mode and have car data, set the type value
    if (carModify !== undefined) {
        // Make sure we have the right types loaded before setting the value
        if (selectedBrand == carModify.brandId) {
            typeSelect.setValue(carModify.typeId);
            setSelectedType(carModify.typeId);
        }
    }

    return () => {
        if (typeSelect && typeSelect.destroy) {
            try {
                typeSelect.destroy();
            } catch (e) {
                console.warn("Error destroying typeSelect:", e);
            }
        }
    };
}, [typeSelection, carModify, selectedBrand]);

  //Color
  useEffect(() => {
    if (user !== undefined){
    axios.get(base_url+'/Color/GetColor')
        .then(res => {
            console.log(res.data)
            setColors(res.data)
        })
    }
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

  //Color select init
  useEffect(() => {
    if(colorSelection.length > 0){
        // Check if there's an existing TomSelect instance and destroy it
        const colorElement = document.querySelector("#color");
        if (colorElement && colorElement.tomselect) {
            colorElement.tomselect.destroy();
        }
        
        const colorSelect = new TomSelect("#color",{
            create: false,
            options: colorSelection,
            sortField: {
                field: "text",
                direction: "asc",
                allowEmptyOption: true,
            },
            onChange: (value) => {
                setSelectedColor(value);
            }
        });
        
        // If we're in modify mode and have car data, set the color value
        if (carModify !== undefined) {
            colorSelect.setValue(carModify.colorId);
            setSelectedColor(carModify.colorId);
        }
        
        // Return cleanup function
        return () => {
            if (colorSelect && colorSelect.destroy) {
                try {
                    colorSelect.destroy();
                } catch (e) {
                    console.warn("Error destroying colorSelect:", e);
                }
            }
        };
    }
}, [colorSelection, carModify]);
  
  //Fetch car data for modification
  useEffect(() => {
    if (isModify) {
      axios.get(base_url+'/Car/GetById?id='+params.id)
      .then(response => {console.log(response.data); setCarModify(response.data)})
      .then(() => {
        
      })   
    }
  }, [isModify, params.id])

  //POST
  function AdPOST(e){
    e.preventDefault();

    const body = 
    {
      id: 0,
      uploadDate: null,

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
      numOfCyl: document.getElementById("number_of_cylinder").value,
      cc: document.getElementById("ccm").value,
      horsepower: document.getElementById("horsepower").value,
      
      price: document.getElementById("price").value,
      description: document.getElementById("description").value,

      sellerId: user.uId,
      sold: null
    }
    console.log(body)
    
    axios.post(base_url+'/Car/Add?token='+user.token, body)
    .then(response => {console.log(response); Cookies.set("carId", JSON.stringify(response.data.id)); setModalInfo({
        show: true,
        title: "",
        text: response.data.description,
        theme: "information",
      })
    })
  }

  //PUT
  function AdPUT(e){
    e.preventDefault();

    const body = 
    {
      id: carModify.id,
      uploadDate: carModify.uploadDate,

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
      numOfCyl: document.getElementById("number_of_cylinder").value,
      cc: document.getElementById("ccm").value,
      horsepower: document.getElementById("horsepower").value,
      
      price: document.getElementById("price").value,
      description: document.getElementById("description").value,

      sellerId: user.uId,
      sold: null
    }
    console.log(body)
    
    axios.put(base_url+'/Car/Put?token='+user.token, body)
    .then(response => {console.log(response); Cookies.set("carId", JSON.stringify(carModify.id)); setModalInfo({
        show: true,
        title: "",
        text: response.data,
        theme: "information",
      })
    })
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

  // Add a new useEffect to ensure the type dropdown gets populated when carModify loads
  useEffect(() => {
    // If we're in modify mode and have car data, make sure we load the types for the brand
    if (carModify !== undefined && selectedBrand !== carModify.brandId) {
        setSelectedBrand(carModify.brandId);
    }
}, [carModify]);

  if (user !== undefined){
    return (
      <div className="content">
        { isModify? <h1>Hírdetés módosítása</h1> : <h1>Új hirdetés feladása</h1> }
        <form id="newad-form">
          <div className="row">
            <h4>Általános adatok</h4>
            <hr/>
            <div className="form-group col-3">
              <label htmlFor="brand">Márka</label>
              <select id="brand" name="brand" className="form-select tomselect-notloaded" data-placeholder="Válassz!" autoComplete="off" onChange={handleBrandChange}/>
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
              <select id="color" name="color" className="form-select tomselect-notloaded" data-placeholder="Válassz!" autoComplete="off" onChange={handleColorChange}/>
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
          { isModify? <button type="submit" className="btn" onClick={AdPUT}>Tovább a képek módosításához</button> : <button type="submit" className="btn" onClick={AdPOST}>Tovább a képek feltöltéséhez</button> }
        </form>
        <InformationModal
          show={modalInfo.show}
          title={modalInfo.title}
          text={modalInfo.text}
          theme={modalInfo.theme}
          onClose={handleCloseModal}
        />
      </div>
    )
  }
  else {
    return (
    <InformationModal
      show={modalInfo.show}
      title={modalInfo.title}
      text={modalInfo.text}
      theme={modalInfo.theme}
      onClose={handleCloseModal}
    />
    )
  }
}
