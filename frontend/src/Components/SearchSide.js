import React, { useState } from 'react';
import './Search.css';
import './SearchSide.css';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'


function yearRange(){
    let years = [];
    const currentYear = new Date().getFullYear();
    for(let i = 1885; i <= currentYear; i++){
        years.push(i);
    }
    return years.reverse();
}

const SearchSide = React.memo(() => {
    const [isActive, setIsActive] = useState(false);
    const  years = yearRange();

    const handleClick = (e) => {
        e.preventDefault();
        setIsActive((prevState) => !prevState);
    };

    return (
        <div id='side-search'>
            <a data-tooltip-id='search-tooltip' data-tooltip-content='Keresés' id='side-search-button' className={isActive ? '' : 'collapsed'} onClick={handleClick}>
                <i class="bi bi-search"></i>
            </a>
            <Tooltip id='search-tooltip'/>
            <form id='side-search-form' className={isActive ? 'collapsed' : ''}>
                {console.log(years)}
                <div className='row d-flex justify-content-between'>
                    <button id='side-search-closing' className='btn ms-auto' onClick={handleClick}><i class="bi bi-x-square"></i></button>
                    <div className='col-12'>
                        <label htmlFor='manufacturer'>Márka</label><br/>
                        <input id='manufacturer' name='manufacturer' className='lg-input' />
                    </div>
                    <div className="col-12">
                        <label htmlFor='type'>Típus</label><br/>
                        <input id='type' name='type' className='lg-input' />
                    </div>
                    <div className="col-12">
                        <label htmlFor='fuel'>Üzemanyag</label><br/>
                        <select id='fuel' name='fuel' className='form-select w-100'>
                            <option value='all'>Összes</option>
                            <option value='gas'>Benzin</option>
                            <option value='diesel'>Dízel</option>
                            <option value='ev'>Elektromos</option>
                            <option value='hibrid'>Hibrid</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <label htmlFor='yearfrom'>Évjárat</label><br/>
                        <div className="input-groups">
                            <select id='yearfrom' className='form-select form-select-f'>
                                <option value='0'>-tól</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <select id='yearto' className='form-select'>
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


                        <div className='col-12'>
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
                        <div className="col-12">
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
                        <div className="col-12">
                            <label htmlFor='color'>Szín</label><br/>
                            <input id='color' name='color' className='lg-input' />
                        </div>
                        <div className="col-12">
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
                        <div className="col-12">
                            <label htmlFor='horsepower'>Teljesítmény</label><br/>
                            <div className="input-groups">
                                <div className="input-group input-group-f">
                                    <input id='horsepower_from' name='horsepower_from' className='sm-input3' placeholder='-tól' min={0} max={9999}/>
                                    <div className="input-group-append">
                                        <span className="">LE</span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input id='horsepower_to' name='horsepower_to' className='sm-input3' placeholder='-ig' min={0} max={9999}/>
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
                                <option value="ev">elektromos</option>
                            </select>
                        </div>
                        <div className="col-6 ps-4">
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
                        <div className="row">
                        <div className="col-6">
                            <label htmlFor='drive_train'>Hajtás</label><br/>
                            <select id='drive_train' className='form-select f-s-m form-select-f'>
                                <option value='0'>Összes</option>
                                <option value='1'>FWD</option>
                                <option value='2'>RWD</option>
                                <option value='3'>AWD</option>
                                <option value='4'>4WD</option>
                            </select>
                        </div>
                        <div className="col-6 ps-0">
                            <label htmlFor='gearbox' className=''>Váltó típusa</label><br/>
                            <select id='gearbox' className='form-select ms-1'>
                                <option value='0'>Összes</option>
                                <option value='1'>Manuális</option>
                                <option value='2'>Automata</option>
                                <option value='3'>CVT</option>
                            </select>
                        </div>
                        </div>
                        <div className="col-12">
                            <label htmlFor='kerb_wheight_from'>Súly</label><br/>
                            <div className="input-groups">
                                <div className="input-group input-group-f">
                                    <input id='kerb_wheight_from' name='kerb_wheight_from' className='sm-input3' placeholder='-tól' min={0} max={3500}/>
                                    <div className="input-group-append">
                                        <span className="">kg</span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input id='kerb_wheight_to' name='kerb_wheight_to' className='sm-input3' placeholder='-ig' min={0} max={3500}/>
                                    <div className="input-group-append">
                                        <span className="">kg</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                
                <div id='side-search-lower' className=''>
                    <Link to={'/search'}><button className='btn'>Keresés</button></Link>
                </div>
            </form>
        </div>
    );
});

export default SearchSide;
