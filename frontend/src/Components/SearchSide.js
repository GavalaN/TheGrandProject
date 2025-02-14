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

    return (
        <div id='side-search'>
            <a data-tooltip-id='search-tooltip' data-tooltip-content='Keresés' id='side-search-button' className={isActive ? '' : 'form-collapsed'} onClick={handleClick}>
                <i className="bi bi-search"></i>
            </a>
            <Tooltip id='search-tooltip'/>
            <form id='side-search-form' className={isActive ? 'form-collapsed' : ''}>
                {console.log(years)}
                <div className='row d-flex justify-content-between'>
                    <button id='side-search-closing' className='btn ms-auto' onClick={handleClick}><i className="bi bi-x-square"></i></button>
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
                                    <input id='odometer_from' name='odometer_from' className='sm-input3' placeholder='-tól' min={0} max={9999999} onChange={handleInputChange} />
                                    <div className="input-group-append">
                                        <span className="">km</span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input id='odometer_to' name='odometer_to' className='sm-input3' placeholder='-ig' min={0} max={9999999} onChange={handleInputChange} />
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
                    <Link to={'/search'}><button className='btn'>Keresés</button></Link>
                </div>
            </form>
        </div>
    );
});

export default SearchSide;
