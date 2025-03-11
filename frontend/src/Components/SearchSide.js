import React, { useState, useEffect } from 'react';
import './Search.css';
import './SearchSide.css';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
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
// "id": 0,
// "brandId": 0,
// "typeId": 0,
// "bodyType": null,
// "fuelType": null,
// "yearMin": 0,
// "yearMax": 0,
// "priceMin": 0,
// "priceMax": 0,
// "kmClockMin": 0,
// "kmClockMax": 0,
// "colorId": 0,
// "ccMin": 0,
// "ccMax": 0,
// "hpMin": 0,
// "hpMax": 0,
// "numOfCyl": 0,
// "engineType": null,
// "drive": null,
// "transType": null,
// "kWeightMin": 0,
// "kWeightMax": 0

const SearchSide = React.memo((props) => {
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
        const body_typeSelect = new TomSelect("#body_type",{
            create: false,
            controlInput: null,
            maxOptions: false
        });
        if (gigaSearch !== undefined) {
            body_typeSelect.setValue(gigaSearch.bodyType)
        }

        const fuelSelect = new TomSelect("#fuel",{
            create: false,
            controlInput: null,
            maxOptions: false
        });
        if (gigaSearch !== undefined) {
            fuelSelect.setValue(gigaSearch.fuelType)
        }

        const year_fromSelect = new TomSelect("#year_from",{
            create: false,
            controlInput: null,
            maxOptions: false
        });
        if (gigaSearch !== undefined) {
            year_fromSelect.setValue(gigaSearch.yearMin)
        }

        const year_toSelect = new TomSelect("#year_to",{
            create: false,
            controlInput: null,
            maxOptions: false
        });
        if (gigaSearch !== undefined) {
            year_toSelect.setValue(gigaSearch.yearMax)
        }

        const number_of_cylinderSelect = new TomSelect("#number_of_cylinder",{
            create: false,
            controlInput: null,
            maxOptions: false
        });
        if (gigaSearch !== undefined) {
            number_of_cylinderSelect.setValue(gigaSearch.numOfCyl)
        }

        const motor_typeSelect = new TomSelect("#motor_type",{
            create: false,
            controlInput: null,
            maxOptions: false
        });
        if (gigaSearch !== undefined) {
            motor_typeSelect.setValue(gigaSearch.engineType)
        }

        const drive_trainSelect = new TomSelect("#drive_train",{
            create: false,
            controlInput: null,
            maxOptions: false
        });
        if (gigaSearch !== undefined) {
            drive_trainSelect.setValue(gigaSearch.drive)
        }
        
        const gearboxSelect = new TomSelect("#gearbox",{
            create: false,
            controlInput: null,
            maxOptions: false
        });
        if (gigaSearch !== undefined) {
            gearboxSelect.setValue(gigaSearch.transType)
        }
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
            const brandSelect = new TomSelect("#brand",{
                create: false,
                options: brandSelection,
                sortField: {
                    field: "text",
                    direction: "asc",
                    allowEmptyOption: true,
                }
            })
            if (gigaSearch !== undefined) {
                brandSelect.setValue(gigaSearch.brandId)
            }
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
        });
        if (gigaSearch !== undefined) {
            typeSelect.setValue(gigaSearch.typeId)
        }

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
            const colorSelect = new TomSelect("#color",{
                create: false,
                options: colorSelection,
                sortField: {
                    field: "text",
                    direction: "asc",
                    allowEmptyOption: true,
                }
            })
            if (gigaSearch !== undefined) {
                colorSelect.setValue(gigaSearch.colorId)
            }
        }
    }, [colorSelection])

    useEffect(() => {
        if(selectedType == NaN){
            setSelectedType("0");
            console.log("first")
        }
    }, [selectedBrand])
    

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

    useEffect(() => {
        if (Cookies.get("gigasearch") == undefined) {
            axios.get(base_url+'/CarDTO/GetAll')
            .then(response => (props.contentChange(response.data)));
        }
        else {
            const gigaSearch = JSON.parse(Cookies.get("gigasearch"));
            axios.post(base_url+'/Search/GigaSearch',gigaSearch)
            .then(response => (props.contentChange(response.data)));
            setSelectedBrand(gigaSearch.brandId);
            document.getElementById("brand").value = selectedBrand;
        }
    }, [])
    
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
        const gigaSearch = {
            "id": 0,
            "brandId": Number(selectedBrand),
            "typeId": safeNumber(selectedType),
            "bodyType": selectedBody,
            "fuelType": selectedFuel,
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
            "engineType": selectedEngine,
            "drive": selectedDriveTrain,
            "transType": selectedGearbox,
            "kWeightMin": Number(document.getElementById("kerb_wheight_from").value),
            "kWeightMax": Number(document.getElementById("kerb_wheight_to").value)
        }
        console.log(gigaSearch)
        axios.post(base_url+'/Search/GigaSearch',gigaSearch)
        .then(response => {
            console.log(response.data);
            if(response.data.length == 0) {
                alert("Nincs ilyen specifikájú autó!");
                
            }
            else {
                props.contentChange(response.data);
                Cookies.set("gigasearch",JSON.stringify(gigaSearch));
            }
            
        })
    }

    return (
        <div id='side-search'>
            <a data-tooltip-id='search-tooltip' data-tooltip-content='Keresés' id='side-search-button' className={isActive ? 'form-expanded' : 'form-collapsed'} onClick={handleClick}>
                <i className="bi bi-search"></i>
            </a>
            <Tooltip id='search-tooltip'/>
            <form id='side-search-form' className={isActive ? 'collapsed' : 'expanded'}>
                {/* {console.log(years)} */}
                <div className='row d-flex justify-content-between'>
                    <button id='side-search-closing' className='btn ms-auto' onClick={handleClick}><i className="bi bi-x-square"></i></button>
                    <div className='col-12'>
                        <label htmlFor='manufacturer'>Márka</label><br/>
                        <select id="brand" name="brand" className="form-select" data-placeholder="Mindegy" autoComplete="off" onChange={handleBrandChange}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor='type'>Típus</label><br/>
                        <select id="type" name="type" className="form-select" data-placeholder="Mindegy" autoComplete="off" onChange={handleTypeChange}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor='fuel'>Üzemanyag</label><br/>
                        <select id='fuel' name='fuel' className='form-select w-100'  onChange={handleFuelChange}>
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
                    <div className="col-12">
                        <label htmlFor='year_from'>Évjárat</label><br/>
                        <div className="input-groups">
                            <select id='year_from' className='form-select form-select-f'>
                                <option value='0'>-tól</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <select id='year_to' className='form-select'>
                                <option value='0'>-ig</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-12">
                        <label htmlFor='price_from'>Vételár</label><br/>
                        <div className="input-groups">
                            <div className="input-group input-group-f">
                                <input id='price_from' name='price_from' className='sm-input2' placeholder='-tól' onChange={handleInputChange} />
                                <div className="input-group-append">
                                    <span className="">Ft</span>
                                </div>
                            </div>
                            <div className="input-group">
                                <input id='price_to' name='price_to' className='sm-input2' placeholder='-ig' onChange={handleInputChange} />
                                <div className="input-group-append">
                                    <span className="">Ft</span>
                                </div>
                            </div>
                        </div>
                    </div>


                        <div className='col-12'>
                            <label htmlFor='odometer_from'>Kilóméteróra állás</label><br/>
                            <div className="input-groups">
                                <div className="input-group input-group-f">
                                    <input id='odometer_from' name='odometer_from' className='sm-input' placeholder='-tól' min={0} max={9999999} onChange={handleInputChange} />
                                    <div className="input-group-append">
                                        <span className="">km</span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input id='odometer_to' name='odometer_to' className='sm-input' placeholder='-ig' min={0} max={9999999} onChange={handleInputChange} />
                                    <div className="input-group-append">
                                        <span className="">km</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <label htmlFor='body_type'>Kivitel</label><br/>
                            <select id='body_type' name='body_type' className='form-select w-100' onChange={handleBodyChange}>
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
                        <div className="col-12">
                            <label htmlFor='color'>Szín</label><br/>
                            <select id="color" name="color" className="form-select" data-placeholder="Összes" autoComplete="off" onChange={handleColorChange}/>
                        </div>
                        <div className="col-12">
                            <label htmlFor='ccm_from'>Hengerűrtartalom</label><br/>
                            <div className="input-groups">
                                <div className="input-group input-group-f">
                                    <input id='ccm_from' name='ccm_from' className='sm-input' placeholder='-tól' min={0} max={9999} onChange={handleInputChange} />
                                    <div className="input-group-append">
                                        <span className="">cm³</span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input id='ccm_to' name='ccm_to' className='sm-input' placeholder='-ig' min={0} max={9999} onChange={handleInputChange} />
                                    <div className="input-group-append">
                                        <span className="">cm³</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <label htmlFor='horsepower'>Teljesítmény</label><br/>
                            <div className="input-groups">
                                <div className="input-group input-group-f">
                                    <input id='horsepower_from' name='horsepower_from' className='sm-input3' placeholder='-tól' min={0} max={9999} onChange={handleInputChange} />
                                    <div className="input-group-append">
                                        <span className="">LE</span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input id='horsepower_to' name='horsepower_to' className='sm-input3' placeholder='-ig' min={0} max={9999} onChange={handleInputChange} />
                                    <div className="input-group-append">
                                        <span className="">LE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <label htmlFor='number_of_cylinder'>Hengerek száma</label><br/>
                            <select id='number_of_cylinder' className='form-select'>
                                <option value='0'>Összes</option>
                                <option value='1'>1 db</option>
                                <option value='2'>2 db</option>
                                <option value='3'>3 db</option>
                                <option value='4'>4 db</option>
                                <option value='5'>5 db</option>
                                <option value='6'>6 db</option>
                                <option value='8'>8 db</option>
                                <option value='10'>10 db</option>
                                <option value='12'>12 db</option>
                                <option value='16'>16 db</option>
                                <option value="-1">elektromos</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label htmlFor='motor_type'>Motor elrendezés</label><br/>
                            <select id='motor_type' className='form-select f-s-m' onChange={handleEngineChange}>
                                <option value='0'>Összes</option>
                                <option value="Soros">Soros</option>
                                <option value="V">V</option>
                                <option value="Boxer">Boxer</option>
                                <option value="W">W</option>
                                <option value="Rotary">Rotary</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label htmlFor='drive_train'>Hajtás</label><br/>
                            <select id='drive_train' className='form-select f-s-m form-select-f' onChange={handleDriveTrainChange}>
                                <option value='0'>Összes</option>
                                <option value='FWD'>FWD</option>
                                <option value='RWD'>RWD</option>
                                <option value='AWD'>AWD</option>
                                <option value='4WD'>4WD</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label htmlFor='gearbox' className=''>Váltó típusa</label><br/>
                            <select id='gearbox' className='form-select' onChange={handleGearboxChange}>
                                <option value='0'>Összes</option>
                                <option value="Manuális">Manuális</option>
                                <option value="Félautomata">Félautomata</option>
                                <option value="Automata">Automata</option>
                                <option value="Triptronic">Triptronic</option>
                                <option value="CVT">CVT</option>
                                <option value="DCT">DCT</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label htmlFor='kerb_wheight_from'>Súly</label><br/>
                            <div className="input-groups">
                                <div className="input-group input-group-f">
                                    <input id='kerb_wheight_from' name='kerb_wheight_from' className='sm-input3' placeholder='-tól' min={0} max={3500} onChange={handleInputChange} />
                                    <div className="input-group-append">
                                        <span className="">kg</span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input id='kerb_wheight_to' name='kerb_wheight_to' className='sm-input3' placeholder='-ig' min={0} max={3500} onChange={handleInputChange} />
                                    <div className="input-group-append">
                                        <span className="">kg</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                
                <div id='side-search-lower' className=''>
                    <button className="btn" onClick={GigaSearch}>Keresés</button>
                </div>
            </form>
        </div>
    );
});

export default SearchSide;
