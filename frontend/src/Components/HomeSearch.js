import React, { useEffect, useState } from 'react';
import './Search.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TomSelect from 'tom-select';
import 'tom-select/dist/css/tom-select.css'

function yearRange(){
    let years = [];
    const currentYear = new Date().getFullYear();
    for(let i = 1885; i <= currentYear; i++){
        years.push(i);
    }
    return years.reverse();
}

const HomeSearch = React.memo(() => {
    const [isActive, setIsActive] = useState(false);
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
        new TomSelect("#body_type",{
            create: false,
            controlInput: null
        });
        new TomSelect("#fuel",{
            create: false,
            controlInput: null
        });
        new TomSelect("#year_from",{
            create: false,
            controlInput: null
        });
        new TomSelect("#year_to",{
            create: false,
            controlInput: null
        });
        new TomSelect("#number_of_cylinder",{
            create: false,
            controlInput: null
        });
        new TomSelect("#motor_type",{
            create: false,
            controlInput: null
        });
        new TomSelect("#drive_train",{
            create: false,
            controlInput: null
        });
        new TomSelect("#gearbox",{
            create: false,
            controlInput: null
        });
    }, [])

    // useEffect(() => {
    // axios.get('http://localhost:5000/Brand/BrandGet')
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

    //Body type
    useEffect(() => {
        axios.get('./')
            .then(res => {
                console.log(res.data)
                setColors(res.data)
            })
        }, [])

    //Color
    useEffect(() => {
        axios.get('http://localhost:5000/Color/GetColor')
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


    //HandleChanges
    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
      };

    const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    };

    const handleColorChange = (event) => {
        setSelectedType(event.target.value);
        };

    const handleClick = (e) => {
        e.preventDefault();
        setIsActive((prevState) => !prevState);
    };

    
   
    return (
        <div id="home-search">
            <form id="home-search-form">
                {console.log(years)}
                <div className="row d-flex justify-content-between">
                    <div className="col-auto">
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
                    <div className="col-auto">
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
                            <select id="body_type" name="body_type" className="form-select w-120">
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
                    <div className="col-auto">
                        <label htmlFor="fuel">Üzemanyag</label><br/>
                        <select id="fuel" name="fuel" className="form-select">
                            <option value="0">Összes</option>
                            <option value="1">benzin</option>
                            <option value="1">benzin</option>
                            <option value="1">benzin</option>
                            <option value="1">benzin</option>
                            <option value="1">benzin</option>
                            <option value="1">benzin</option>
                            <option value="1">benzin</option>
                            <option value="1">benzin</option>
                            <option value="1">benzin</option>
                            <option value="1">benzin</option>
                            <option value="1">benzin</option>
                            <option value="2">Dízel</option>
                            <option value="3">Elektromos</option>
                            <option value="4">Hibrid</option>
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
                                <option value="ev">elektromos</option>
                            </select>
                        </div>
                        <div className={`col-auto ${isActive ? "" : "collapse-form"}`}>
                            <label htmlFor="motor_type">Motor elrendezés</label><br/>
                            <select id="motor_type" name="motor_type" className="form-select f-s-m">
                                <option value="0">Összes</option>
                                <option value="1">Soros</option>
                                <option value="2">V</option>
                                <option value="3">Boxer</option>
                                <option value="4">W</option>
                                <option value="5">Rotary</option>
                            </select>
                        </div>
                        <div className={`col-auto ${isActive ? "" : "collapse-form"}`}>
                            <label htmlFor="drive_train">Hajtás</label><br/>
                            <select id="drive_train" name="drive_train" className="form-select f-s-m">
                                <option value="0">Összes</option>
                                <option value="1">FWD</option>
                                <option value="2">RWD</option>
                                <option value="3">AWD</option>
                                <option value="4">4WD</option>
                            </select>
                        </div>
                        <div className={`col-auto ${isActive ? "" : "collapse-form"}`}>
                            <label htmlFor="gearbox">Váltó típusa</label><br/>
                            <select id="gearbox" name="gearbox" className="form-select">
                                <option value="0">Összes</option>
                                <option value="1">Manuális</option>
                                <option value="2">Automata</option>
                                <option value="3">CVT</option>
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
                    <div className="col-6 ms-auto">
                        <p onClick={handleClick}>Részletes keresés
                            <i className={isActive ? "bi bi-caret-up" : "bi bi-caret-down"}></i>
                        </p>
                        <Link to="/search"><button className="btn">Keresés</button></Link>
                    </div>
                </div>
            </form>
        </div>
    );
});

export default HomeSearch;
