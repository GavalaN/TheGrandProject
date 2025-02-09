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
    const [brands, setBrands] = useState([])
    const [selectedBrand, setSelectedBrand] = useState(null);
    const  years = yearRange();

    useEffect(() => {
    axios.get('http://localhost:5000/Brand/BrandGet')
        .then(res => {
            console.log(res.data)
            setBrands(res.data)
        })
        .then(() => {
            new TomSelect("#brand",{
                create: false,
                sortField: {
                    field: "text",
                    direction: "asc",
                    allowEmptyOption: true,
                }
                
            })
        })
    }, [])

    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
      };

    const handleClick = (e) => {
        e.preventDefault();
        setIsActive((prevState) => !prevState);
    };

    
   
    return (
        // <div id='home-search'>
            <form id='home-search-form'>
                {console.log(years)}
                <div className='row d-flex justify-content-between'>
                    <div className='col-auto'>
                        <label htmlFor='manufacturer'>Márka</label><br/>
                        <select id="brand" className='form-select' data-placeholder="Mindegy" autoComplete="off">
                            <option value=""></option>
                            <option value="BMW"></option>
                            {brands.map((brand) => (
                            <option value={brand.name}>{brand.name}</option>
                            ))}
                        </select>
                        {/* <input
                            list="brandOptions"
                            id="brand2"
                            name='manufacturer'
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
                        <label htmlFor='type'>Típus</label><br/>
                        <input
                            list="brandOptions"
                            id="type"
                            name="type"
                            value={selectedBrand}
                            onChange={handleBrandChange}
                            className="lg-input2"
                        />
                        <datalist id="brandOptions">
                            {brands.map((brand, index) => (
                            <option key={index} value={brand.name} />
                            ))}
                        </datalist>
                    </div>
                    <div className="col-auto">
                        <label htmlFor='fuel'>Üzemanyag</label><br/>
                        <select id='fuel' name='fuel' className='form-select'>
                            <option value='0'>Összes</option>
                            <option value='1'>Benzin</option>
                            <option value='2'>Dízel</option>
                            <option value='3'>Elektromos</option>
                            <option value='4'>Hibrid</option>
                        </select>
                    </div>
                    <div className="col-auto">
                        <label htmlFor='yearfrom'>Évjárat</label><br/>
                        <div className="input-groups">
                            <select id='yearfrom' className='form-select f-s-sm form-select-f'>
                                <option value='0'>-tól</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <select id='yearto' className='form-select f-s-sm'>
                                <option value='0'>-ig</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-auto">
                        <label htmlFor='price_from'>Vételár</label><br/>
                        <div className="input-groups">
                            <div className="input-group input-group-f">
                                <input id='price_from' name='price_from' className='sm-input2' placeholder='-tól' />
                                <div className="input-group-append">
                                    <span className="">Ft</span>
                                </div>
                            </div>
                            <div className="input-group">
                                <input id='price_to' name='price_to' className='sm-input2' placeholder='-ig' />
                                <div className="input-group-append">
                                    <span className="">Ft</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={isActive ? '' : 'collapse-form'}>

                      <div className='row d-flex justify-content-between'>
                        <div className='col-auto'>
                            <label htmlFor='odometer_from'>Kilóméteróra állás</label><br/>
                            <div className="input-groups">
                                <div className="input-group input-group-f">
                                    <input id='odometer_from' name='odometer_from' className='sm-input3' placeholder='-tól' min={0} max={9999999}/>
                                    <div className="input-group-append">
                                        <span className="">km</span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input id='odometer_to' name='odometer_to' className='sm-input3' placeholder='-ig' min={0} max={9999999}/>
                                    <div className="input-group-append">
                                        <span className="">km</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-auto">
                            <label htmlFor='body_type'>Kivitel</label><br/>
                            <select id='body_type' name='body_type' className='form-select w-100'>
                                <option value='all'>Összes</option>
                                <option value='hatchback'>Ferdehátú</option>
                                <option value='stationwagon'>Kombi</option>
                                <option value='sedan'>Szedán</option>
                                <option value='coupe'>Kupé</option>
                                <option value='mpv'>Egyterű</option>
                                <option value='SUV'>SUV</option>
                                <option value='offroad'>Terepjáró</option>
                                <option value='pickup'>Pickup</option>
                                <option value='cabrio'>Kabrió</option>
                                <option value='van'>Kisbusz</option>
                                <option value='other'>Egyéb</option>
                            </select>
                        </div>
                        <div className="col-auto">
                            <label htmlFor='color'>Szín</label><br/>
                            <input id='color' name='color' className='input' />
                        </div>
                        <div className="col-auto">
                            <label htmlFor='ccm_from'>Hengerűrtartalom</label><br/>
                            <div className="input-groups">
                                <div className="input-group input-group-f">
                                    <input id='ccm_from' name='ccm_from' className='sm-input' placeholder='-tól' min={0} max={9999}/>
                                    <div className="input-group-append">
                                        <span className="">cm³</span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input id='ccm_to' name='ccm_to' className='sm-input' placeholder='-ig' min={0} max={9999}/>
                                    <div className="input-group-append">
                                        <span className="">cm³</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-auto">
                            <label htmlFor='horsepower'>Teljesítmény</label><br/>
                            <div className="input-groups">
                                <div className="input-group input-group-f">
                                    <input id='horsepower_from' name='horsepower_from' className='sm-input' placeholder='-tól' min={0} max={9999}/>
                                    <div className="input-group-append">
                                        <span className="">LE</span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input id='horsepower_to' name='horsepower_to' className='sm-input' placeholder='-ig' min={0} max={9999}/>
                                    <div className="input-group-append">
                                        <span className="">LE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row d-flex justify-content-between'>
                        <div className="col-auto">
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
                                <option value="ev">elektromos</option>
                            </select>
                        </div>
                        <div className="col-auto">
                            <label htmlFor='motor_type'>Motor elrendezés</label><br/>
                            <select id='motor_type' className='form-select f-s-m'>
                                <option value='0'>Összes</option>
                                <option value='1'>Soros</option>
                                <option value='2'>V</option>
                                <option value='3'>Boxer</option>
                                <option value='4'>W</option>
                                <option value='5'>Rotary</option>
                            </select>
                        </div>
                        <div className="col-auto">
                            <label htmlFor='drive_train'>Hajtás</label><br/>
                            <select id='drive_train' className='form-select f-s-m'>
                                <option value='0'>Összes</option>
                                <option value='1'>FWD</option>
                                <option value='2'>RWD</option>
                                <option value='3'>AWD</option>
                                <option value='4'>4WD</option>
                            </select>
                        </div>
                        <div className="col-auto">
                            <label htmlFor='gearbox'>Váltó típusa</label><br/>
                            <select id='gearbox' className='form-select'>
                                <option value='0'>Összes</option>
                                <option value='1'>Manuális</option>
                                <option value='2'>Automata</option>
                                <option value='3'>CVT</option>
                            </select>
                        </div>
                        <div className="col-auto">
                            <label htmlFor='kerb_wheight_from'>Súly</label><br/>
                            <div className="input-groups">
                                <div className="input-group input-group-f">
                                    <input id='kerb_wheight_from' name='kerb_wheight_from' className='sm-input' placeholder='-tól' min={0} max={3500}/>
                                    <div className="input-group-append">
                                        <span className="">kg</span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input id='kerb_wheight_to' name='kerb_wheight_to' className='sm-input' placeholder='-ig' min={0} max={3500}/>
                                    <div className="input-group-append">
                                        <span className="">kg</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
                
                <div id='home-search-lower' className='row'>
                    <div className='col-6 ms-auto'>
                        <p onClick={handleClick}>Részletes keresés
                            <i className={isActive ? 'bi bi-caret-up' : 'bi bi-caret-down'}></i>
                        </p>
                        <Link to={'/search'}><button className='btn'>Keresés</button></Link>
                    </div>
                </div>
            </form>
        //</div>
    );
});

export default HomeSearch;
