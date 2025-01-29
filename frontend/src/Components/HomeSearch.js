import React, { useState } from 'react';
import './HomeSearch.css';

const HomeSearch = React.memo(() => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setIsActive((prevState) => !prevState);
    };

    return (
        // <div id='home-search'>
            <form id='home-search-form'>
                <div className='row d-flex'>
                    <div className='col-auto'>
                        <label htmlFor='manufacturer'>Márka</label><br/>
                        <input id='manufacturer' name='manufacturer' className='lg-input' />
                    </div>
                    <div className="col-auto">
                        <label htmlFor='type'>Típus</label><br/>
                        <input id='type' name='type' className='lg-input' />
                    </div>
                    <div className="col-auto">
                        <label htmlFor='fuel'>Üzemanyag</label><br/>
                        <input id='fuel' name='fuel' className='lg-input' />
                    </div>
                    <div className="col-auto">
                        <label htmlFor='yearfrom'>Évjárat</label><br/>
                        <input id='yearfrom' className='sm-input-f' placeholder='-tól'/>
                        <input id='yearto' className='sm-input' placeholder='-ig'/>
                    </div>
                    <div className="col-auto">
                        <label htmlFor='pricefrom'>Vételár</label><br/>
                        <input id='pricefrom' className='sm-input-f' placeholder='-tól'/>
                        <input id='priceto' className='sm-input' placeholder='-ig'/>
                    </div>

                    <div className={isActive ? '' : 'collapse'}>
                      <div className='row d-flex'>
                        <div className='col-auto'>
                            <label htmlFor='manufacturer'>Márka</label><br/>
                            <input id='manufacturer' name='manufacturer' className='lg-input' />
                        </div>
                        <div className="col-auto">
                            <label htmlFor='type'>Típus</label><br/>
                            <input id='type' name='type' className='lg-input' />
                        </div>
                        <div className="col-auto">
                            <label htmlFor='fuel'>Üzemanyag</label><br/>
                            <input id='fuel' name='fuel' className='lg-input' />
                        </div>
                        <div className="col-auto">
                            <label htmlFor='yearfrom'>Évjárat</label><br/>
                            <input id='yearfrom' className='sm-input-f' placeholder='-tól'/>
                            <input id='yearto' className='sm-input' placeholder='-ig'/>
                        </div>
                        <div className="col-auto">
                            <label htmlFor='pricefrom'>Vételár</label><br/>
                            <input id='pricefrom' className='sm-input-f' placeholder='-tól'/>
                            <input id='priceto' className='sm-input' placeholder='-ig'/>
                        </div>
                      </div>

                      <div className='row d-flex'>
                        <div className='col-auto'>
                            <label htmlFor='manufacturer'>Márka</label><br/>
                            <input id='manufacturer' name='manufacturer' className='lg-input' />
                        </div>
                        <div className="col-auto">
                            <label htmlFor='type'>Típus</label><br/>
                            <input id='type' name='type' className='lg-input' />
                        </div>
                        <div className="col-auto">
                            <label htmlFor='fuel'>Üzemanyag</label><br/>
                            <input id='fuel' name='fuel' className='lg-input' />
                        </div>
                        <div className="col-auto">
                            <label htmlFor='yearfrom'>Évjárat</label><br/>
                            <input id='yearfrom' className='sm-input-f' placeholder='-tól'/>
                            <input id='yearto' className='sm-input' placeholder='-ig'/>
                        </div>
                        <div className="col-auto">
                            <label htmlFor='pricefrom'>Vételár</label><br/>
                            <input id='pricefrom' className='sm-input-f' placeholder='-tól'/>
                            <input id='priceto' className='sm-input' placeholder='-ig'/>
                        </div>
                      </div>
                    </div>
                </div>
                
                <div id='home-search-lower' className='row'>
                    <div className='col-6'>
                        <p onClick={handleClick}>Részletes keresés
                            <i className={isActive ? 'bi bi-caret-up' : 'bi bi-caret-down'}></i>
                        </p>
                        <button className='btn' >Keresés</button>
                    </div>
                </div>
            </form>
        //</div>
    );
});

export default HomeSearch;
