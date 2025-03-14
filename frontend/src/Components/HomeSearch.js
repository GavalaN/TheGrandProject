import React, { useEffect, useState } from 'react';
import './Search.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TomSelect from 'tom-select';
import 'tom-select/dist/css/tom-select.css'
import Cookies from 'js-cookie';

function yearRange(){
    let years = [];
    const currentYear = new Date().getFullYear();
    for(let i = 1885; i <= currentYear; i++){
        years.push(i);
    }
    return years.reverse();
}

const HomeSearch = React.memo(() => {
    const base_url = process.env.REACT_APP_BASE_URL;
    const [isActive, setIsActive] = useState(false);
    const [brands, setBrands] = useState([]);
    const [types, setTypes] = useState([]);
    const [colors, setColors] = useState([])
    const [selectedBrand, setSelectedBrand] = useState(0);
    const [selectedType, setSelectedType] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedBody, setSelectedBody] = useState(null);
    const [selectedFuel, setSelectedFuel] = useState(null);
    const [selectedEngine, setSelectedEngine] = useState(null);
    const [selectedDriveTrain, setselectedDriveTrain] = useState(null);
    const [selectedGearbox, setSelectedGearbox] = useState(null);
    const years = yearRange();
    const [brandSelection, setBrandSelection] = useState([]);
    const [typeSelection, setTypeSelection] = useState([]);
    const [colorSelection, setColorSelection] = useState([]);
    const navigate = useNavigate();
    const gigaSearch = Cookies.get("gigasearch") === undefined? undefined : JSON.parse(Cookies.get("gigasearch"))

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
      
      
    // Install input filters.
    const handleInputChange = () => {
        //Ár ellenörzés
        setInputFilter(document.getElementById("price_from"), function(value) {
            return /^\d*$/.test(value); }, "Ide csak egész számot adhatsz meg!");
        setInputFilter(document.getElementById("price_to"), function(value) {
            return /^\d*$/.test(value); }, "Ide csak egész számot adhatsz meg!");

        //Km ellenörzés
        setInputFilter(document.getElementById("odometer_from"), function(value) {
            return /^\d*$/.test(value); }, "Ide csak egész számot adhatsz meg!");
        setInputFilter(document.getElementById("odometer_to"), function(value) {
            return /^\d*$/.test(value); }, "Ide csak egész számot adhatsz meg!");

        //Ccm ellenörzés
        setInputFilter(document.getElementById("ccm_from"), function(value) {
            return /^\d*$/.test(value); }, "Ide csak egész számot adhatsz meg!");
        setInputFilter(document.getElementById("ccm_to"), function(value) {
            return /^\d*$/.test(value); }, "Ide csak egész számot adhatsz meg!");

        //LE ellenörzés
        setInputFilter(document.getElementById("horsepower_from"), function(value) {
            return /^\d*$/.test(value); }, "Ide csak egész számot adhatsz meg!");
        setInputFilter(document.getElementById("horsepower_to"), function(value) {
            return /^\d*$/.test(value); }, "Ide csak egész számot adhatsz meg!");
        
        //Kg ellenörzés
        setInputFilter(document.getElementById("kerb_wheight_from"), function(value) {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 3500); }, "0kg és 3500Kg között adhatsz meg értéket!");
        setInputFilter(document.getElementById("kerb_wheight_to"), function(value) {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 3500); }, "0kg és 3500Kg között adhatsz meg értéket!");
    
    }
    
    useEffect(() => {
        const body_typeSelect = new TomSelect("#body_type", {
          create: false,
          controlInput: null,
          maxOptions: false,
          plugins: ["no_backspace_delete"],
          render: {
              no_results: function(){
                  return '<div class="no-results">Nincs találat</div>';
              }
          }
          
        })
    
        if (gigaSearch !== undefined && gigaSearch.bodyType !== null) {
          body_typeSelect.setValue(gigaSearch.bodyType)
        } else {
          body_typeSelect.setValue("0")
        }
    
        const fuelSelect = new TomSelect("#fuel", {
          create: false,
          controlInput: null,
          maxOptions: false,
          plugins: ["no_backspace_delete"],
          render: {
              no_results: function(){
                  return '<div class="no-results">Nincs találat</div>';
              }
          }
        })
        if (gigaSearch !== undefined && gigaSearch.fuelType !== null) {
          fuelSelect.setValue(gigaSearch.fuelType)
        } else {
          fuelSelect.setValue("0")
        }
    
        const year_fromSelect = new TomSelect("#year_from", {
          create: false,
          controlInput: null,
          maxOptions: false,
          plugins: ["no_backspace_delete"],
          render: {
              no_results: function(){
                  return '<div class="no-results">Nincs találat</div>';
              }
          }
        })
        if (gigaSearch !== undefined && gigaSearch.yearMin !== null) {
          year_fromSelect.setValue(gigaSearch.yearMin)
        } else {
          year_fromSelect.setValue("0")
        }
    
        const year_toSelect = new TomSelect("#year_to", {
          create: false,
          controlInput: null,
          maxOptions: false,
          plugins: ["no_backspace_delete"],
          render: {
              no_results: function(){
                  return '<div class="no-results">Nincs találat</div>';
              }
          }
        })
        if (gigaSearch !== undefined && gigaSearch.yearMax !== null) {
          year_toSelect.setValue(gigaSearch.yearMax)
        } else {
          year_toSelect.setValue("0")
        }
    
        const number_of_cylinderSelect = new TomSelect("#number_of_cylinder", {
          create: false,
          controlInput: null,
          maxOptions: false,
          plugins: ["no_backspace_delete"],
          render: {
              no_results: function(){
                  return '<div class="no-results">Nincs találat</div>';
              }
          }
        })
        if (gigaSearch !== undefined && gigaSearch.numOfCyl !== null) {
          number_of_cylinderSelect.setValue(gigaSearch.numOfCyl)
        } else {
          number_of_cylinderSelect.setValue("0")
        }
    
        const motor_typeSelect = new TomSelect("#motor_type", {
          create: false,
          controlInput: null,
          maxOptions: false,
          plugins: ["no_backspace_delete"],
          render: {
              no_results: function(){
                  return '<div class="no-results">Nincs találat</div>';
              }
          }
        })
        if (gigaSearch !== undefined && gigaSearch.engineType !== null) {
          motor_typeSelect.setValue(gigaSearch.engineType)
        } else {
          motor_typeSelect.setValue("0")
        }
    
        const drive_trainSelect = new TomSelect("#drive_train", {
          create: false,
          controlInput: null,
          maxOptions: false,
          plugins: ["no_backspace_delete"],
          render: {
              no_results: function(){
                  return '<div class="no-results">Nincs találat</div>';
              }
          }
        })
        if (gigaSearch !== undefined && gigaSearch.drive !== null) {
          drive_trainSelect.setValue(gigaSearch.drive)
        } else {
          drive_trainSelect.setValue("0")
        }
    
        const gearboxSelect = new TomSelect("#gearbox", {
          create: false,
          controlInput: null,
          maxOptions: false,
          plugins: ["no_backspace_delete"],
          render: {
              no_results: function(){
                  return '<div class="no-results">Nincs találat</div>';
              }
          }
        })
        if (gigaSearch !== undefined && gigaSearch.transType !== null) {
          gearboxSelect.setValue(gigaSearch.transType)
        } else {
          gearboxSelect.setValue("0")
        }
    
        // document.getElementById("price_from").value = gigaSearch.priceMin == 0 ? null : gigaSearch.priceMin
        // document.getElementById("price_to").value = gigaSearch.priceMax == 0 ? null : gigaSearch.priceMax
        // document.getElementById("odometer_from").value = gigaSearch.kmClockMin == 0 ? null : gigaSearch.kmClockMin
        // document.getElementById("odometer_to").value = gigaSearch.kmClockMax == 0 ? null : gigaSearch.kmClockMax
        // document.getElementById("ccm_from").value = gigaSearch.ccMin == 0 ? null : gigaSearch.ccMin
        // document.getElementById("ccm_to").value = gigaSearch.ccMax == 0 ? null : gigaSearch.ccMax
        // document.getElementById("horsepower_from").value = gigaSearch.hpMin == 0 ? null : gigaSearch.hpMin
        // document.getElementById("horsepower_to").value = gigaSearch.hpMax == 0 ? null : gigaSearch.hpMax
        // document.getElementById("kerb_wheight_from").value = gigaSearch.kWeightMin == 0 ? null : gigaSearch.kWeightMin
        // document.getElementById("kerb_wheight_to").value = gigaSearch.kWeightMax == 0 ? null : gigaSearch.kWeightMax
    
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
    
          if (year_fromSelect && year_fromSelect.destroy) {
            try {
              year_fromSelect.destroy()
            } catch (e) {
              console.warn("Error destroying year_fromSelect:", e)
            }
          }
    
          if (year_toSelect && year_toSelect.destroy) {
            try {
              year_toSelect.destroy()
            } catch (e) {
              console.warn("Error destroying year_toSelect:", e)
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
      }, [])

    // useEffect(() => {
    // axios.get(base_url+'/Brand/BrandGet')
    //     .then(res => {
    //         console.log(res.data)
    //         setBrands(res.data)
    //     })
    // }, [])
    
    // new TomSelect("#brand",{
    //     create: false,
    //     sortField: {
    //         field: "text",
    //         direction: "asc",
    //         allowEmptyOption: true,
    //     }
        
    // })

    //Brand
    useEffect(() => {
        axios.get(`${base_url}/Brand/BrandGet`)
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
                maxOptions: false,
                options: brandSelection,
                sortField: {
                    field: "text",
                    direction: "asc",
                    allowEmptyOption: true,
                },
                render: {
                    no_results: function( data, escape ){
                        return '<div class="no-results">Nincs találat</div>';
                    }
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
            document.getElementById("type").setAttribute("disabled","")
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
            // console.log("üres")
        }
        // console.log(typeSelection)
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
            render: {
                no_results: function(){
                    return '<div class="no-results">Nincs találat</div>';
                }
            }
        });

        return () => {
            typeSelect.destroy();// Komponens unmountolásakor töröljük
        };
    }, [typeSelection]);

    //Color
    useEffect(() => {
        axios.get(base_url+'/Color/GetColor')
            .then(res => {
                // console.log(res.data)
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
                },
                render: {
                    no_results: function(){
                        return '<div class="no-results">Nincs találat</div>';
                    }
                }
            })
        }
    }, [colorSelection])


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

    const handleBodyChange = (event) => {
        if(event.target.value == "0"){
            setSelectedBody(null);
        }
        setSelectedBody(event.target.value)
    };

    const handleFuelChange = (event) => {
        if(event.target.value == "0"){
            setSelectedFuel(null);
        }
        setSelectedFuel(event.target.value)
    };

    const handleEngineChange = (event) => {
        if(event.target.value == "0"){
            setSelectedEngine(null);
            console.log(selectedEngine)
        }
        setSelectedEngine(event.target.value)
    };

    const handleDriveTrainChange = (event) => {
        if(event.target.value == "0"){
            setselectedDriveTrain(null);
        }
        setselectedDriveTrain(event.target.value)
    };

    const handleGearboxChange = (event) => {
        if(event.target.value == "0"){
            setSelectedGearbox(null);
        }
        setSelectedGearbox(event.target.value)
    };

    const handleClick = (e) => {
        e.preventDefault();
        setIsActive((prevState) => !prevState);
    };

        // Helper function to safely convert to number
    const safeNumber = (value, defaultValue = 0) => {
        // Check if value exists and is not empty string
        if (value === undefined || value === null || value === "") {
        return defaultValue
        }
        const num = Number(value)
        // Return default if NaN, otherwise return the number
        return isNaN(num) ? "defaultValue" : num
    }

    function GigaSearch(e){
        e.preventDefault();
        let gigaSearch = {
            "id": 0,
            "brandId": Number(selectedBrand),
            "typeId": safeNumber(selectedType),
            "bodyType": selectedBody == "" || selectedBody == "0"? null : selectedBody,
            "fuelType": selectedFuel == "" || selectedFuel == "0"? null : selectedFuel,
            "yearMin": Number(document.getElementById("year_from").value),
            "yearMax": Number(document.getElementById("year_to").value),
            "priceMin": Number(document.getElementById("price_from").value),
            "priceMax": Number(document.getElementById("price_to").value),
            "kmClockMin": Number(document.getElementById("odometer_from").value),
            "kmClockMax": Number(document.getElementById("odometer_to").value),
            "colorId": Number(selectedColor),
            "ccMin": Number(document.getElementById("ccm_from").value),
            "ccMax": Number(document.getElementById("ccm_to").value),
            "hpMin": Number(document.getElementById("horsepower_from").value),
            "hpMax": Number(document.getElementById("horsepower_to").value),
            "numOfCyl": Number(document.getElementById("number_of_cylinder").value),
            "engineType": selectedEngine == "" || selectedEngine == "0"? null : selectedEngine,
            "drive": selectedDriveTrain == "" || selectedDriveTrain == "0"? null : selectedDriveTrain,
            "transType": selectedGearbox == "" || selectedGearbox == "0"? null : selectedGearbox,
            "kWeightMin": Number(document.getElementById("kerb_wheight_from").value),
            "kWeightMax": Number(document.getElementById("kerb_wheight_to").value)
        }
        console.log(gigaSearch)
        axios.post("http://localhost:5000/Search/GigaSearch",gigaSearch)
        .then(response => (console.log(response.data)))
        Cookies.set("gigasearch",JSON.stringify(gigaSearch));
        navigate("/search");
    }
   
    return (
        <div id="home-search">
            <form id="home-search-form">
                {/* {console.log(years)} */}
                <div className="row d-flex justify-content-between">
                    <div className="col-auto brand-slct">
                        <label htmlFor="brand">Márka</label><br/>
                        <select id="brand" name="brand" className="form-select" data-placeholder="Mindegy" autoComplete="off" onChange={handleBrandChange}>
                            {/* <option value="0">Összes</option>
                            <option value="BMW">BMW</option>
                            {brands.map((brand) => (
                            <option value={brand.name}>{brand.name}</option>
                            ))} */}
                        </select>
                        {/* <input
                            list="brandOptions"
                            id="brand2"
                            name="manufacturer"
                            value={selectedBrand}
                            onChange={handleBrandChange}
                            className="lg-input"
                        />
                        <datalist id="brandOptions">
                            {brands.map((brand, index) => (
                            <option key={index} value={brand.name} />
                            ))}
                        </datalist> */}
                    </div>
                    <div className="col-auto type-slct">
                        <label htmlFor="type">Típus</label><br/>
                        <select id="type" name="type" className="form-select" data-placeholder="Mindegy" autoComplete="off" onChange={handleTypeChange}>
                        </select>
                        {/* <input
                            list="brandOptions"
                            id="type"
                            name="type"
                            value={selectedBrand}
                            onChange={handleBrandChange}
                            className="lg-input"
                        />
                        <datalist id="brandOptions">
                            {brands.map((brand, index) => (
                            <option key={index} value={brand.name} />
                            ))}
                        </datalist> */}
                    </div>
                    <div className="col-auto">
                            <label htmlFor="body_type">Kivitel</label><br/>
                            <select id="body_type" name="body_type" className="form-select w-120" onChange={handleBodyChange}>
                                <option value="0">Összes</option>
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
                    <div className="col-auto">
                        <label htmlFor="fuel">Üzemanyag</label><br/>
                        <select id="fuel" name="fuel" className="form-select" onChange={handleFuelChange}>
                            <option value="0">Összes</option>
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
                    <div className="col-auto">
                        <label htmlFor="year_from">Évjárat</label><br/>
                        <div className="input-groups">
                            <select id="year_from" name="year_from" className="form-select f-s-sm form-select-f">
                                <option value="0">-tól</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <select id="year_to" name="year_to" className="form-select f-s-sm">
                                <option value="0">-ig</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="price_from">Vételár</label><br/>
                        <div className="input-groups">
                            <div className="input-group input-group-f">
                                <input id="price_from" name="price_from" className="sm-input2" placeholder="-tól" onChange={handleInputChange} />
                                <div className="input-group-append">
                                    <span className="">Ft</span>
                                </div>
                            </div>
                            <div className="input-group">
                                <input id="price_to" name="price_to" className="sm-input2" placeholder="-ig" onChange={handleInputChange} />
                                <div className="input-group-append">
                                    <span className="">Ft</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className={isActive ? "" : "collapse-form"}> */}
                        <div className={`col-auto ${isActive ? "" : "collapse-form"}`}>
                            <label htmlFor="odometer_from">Kilóméteróra állás</label><br/>
                            <div className="input-groups">
                                <div className="input-group input-group-f">
                                    <input id="odometer_from" name="odometer_from" className="sm-input3" placeholder="-tól" min={0} max={9999999}  onChange={handleInputChange}/>
                                    <div className="input-group-append">
                                        <span className="">km</span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input id="odometer_to" name="odometer_to" className="sm-input3" placeholder="-ig" min={0} max={9999999}  onChange={handleInputChange}/>
                                    <div className="input-group-append">
                                        <span className="">km</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`col-auto ${isActive ? "" : "collapse-form"}`}>
                            <label htmlFor="color">Szín</label><br/>
                            <select id="color" name="color" className="form-select" data-placeholder="Mindegy" autoComplete="off" onChange={handleColorChange}>
                        </select>
                        </div>
                        <div className={`col-auto ${isActive ? "" : "collapse-form"}`}>
                            <label htmlFor="ccm_from">Hengerűrtartalom</label><br/>
                            <div className="input-groups">
                                <div className="input-group input-group-f">
                                    <input id="ccm_from" name="ccm_from" className="sm-input" placeholder="-tól" onChange={handleInputChange}/>
                                    <div className="input-group-append">
                                        <span className="">cm³</span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input id="ccm_to" name="ccm_to" className="sm-input" placeholder="-ig" onChange={handleInputChange}/>
                                    <div className="input-group-append">
                                        <span className="">cm³</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`col-auto ${isActive ? "" : "collapse-form"}`}>
                            <label htmlFor="horsepower">Teljesítmény</label><br/>
                            <div className="input-groups">
                                <div className="input-group input-group-f">
                                    <input id="horsepower_from" name="horsepower_from" className="sm-input" placeholder="-tól" onChange={handleInputChange}/>
                                    <div className="input-group-append">
                                        <span className="">LE</span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input id="horsepower_to" name="horsepower_to" className="sm-input" placeholder="-ig" onChange={handleInputChange}/>
                                    <div className="input-group-append">
                                        <span className="">LE</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`col-auto ${isActive ? "" : "collapse-form"}`}>
                            <label htmlFor="number_of_cylinder">Hengerek száma</label><br/>
                            <select id="number_of_cylinder" name="number_of_cylinder" className="form-select w-120">
                                <option value="0">Összes</option>
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
                        <div className={`col-auto ${isActive ? "" : "collapse-form"}`}>
                            <label htmlFor="motor_type">Motor elrendezés</label><br/>
                            <select id="motor_type" name="motor_type" className="form-select f-s-m" onChange={handleEngineChange}>
                                <option value="0">Összes</option>
                                <option value="Soros">Soros</option>
                                <option value="V">V</option>
                                <option value="Boxer">Boxer</option>
                                <option value="W">W</option>
                                <option value="Rotary">Rotary</option>
                            </select>
                        </div>
                        <div className={`col-auto ${isActive ? "" : "collapse-form"}`}>
                            <label htmlFor="drive_train">Hajtás</label><br/>
                            <select id="drive_train" name="drive_train" className="form-select f-s-m" onChange={handleDriveTrainChange}>
                                <option value="0">Összes</option>
                                <option value="FWD">FWD</option>
                                <option value="RWD">RWD</option>
                                <option value="AWD">AWD</option>
                                <option value="4WD">4WD</option>
                            </select>
                        </div>
                        <div className={`col-auto ${isActive ? "" : "collapse-form"}`}>
                            <label htmlFor="gearbox">Váltó típusa</label><br/>
                            <select id="gearbox" name="gearbox" className="form-select" onChange={handleGearboxChange}>
                                <option value="0">Összes</option>
                                <option value="Manuális">Manuális</option>
                                <option value="Félautomata">Félautomata</option>
                                <option value="Automata">Automata</option>
                                <option value="Triptronic">Triptronic</option>
                                <option value="CVT">CVT</option>
                                <option value="DCT">DCT</option>
                            </select>
                        </div>
                        <div className={`col-auto ${isActive ? "" : "collapse-form"}`}>
                            <label htmlFor="kerb_wheight_from">Súly</label><br/>
                            <div className="input-groups">
                                <div className="input-group input-group-f">
                                    <input id="kerb_wheight_from" name="kerb_wheight_from" className="sm-input" placeholder="-tól" onChange={handleInputChange}/>
                                    <div className="input-group-append">
                                        <span className="">kg</span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input id="kerb_wheight_to" name="kerb_wheight_to" className="sm-input" placeholder="-ig" onChange={handleInputChange}/>
                                    <div className="input-group-append">
                                        <span className="">kg</span>
                                    </div>
                                </div>
                            </div>
                        {/* </div> */}
                    </div>
                </div>
                <div id="home-search-lower" className="row">
                    <div className="col-9">
                        <p onClick={handleClick}>Részletes keresés
                            <i className={isActive ? "bi bi-chevron-up" : "bi bi-chevron-down"}></i>
                        </p>
                    </div>
                    <div className="col-3">
                        <button className="btn" onClick={GigaSearch}>Keresés</button>
                    </div>
                </div>
            </form>
        </div>
    );
});

export default HomeSearch;
