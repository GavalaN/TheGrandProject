import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import DataProtection from './Pages/DataProtection';
import TermsAndConditions from './Pages/TermsAndConditions';
import Contact from './Pages/Contact';
import NewAd from './Pages/NewAd';
import SearchList from './Pages/SearchList';
import ForgottedPassword from './Pages/ForgottedPassword';
import NewPassword from './Pages/NewPassword';
import CarCardDetailed from './Components/CarCardDetailed';
import Profile from './Pages/Profile';
import SiteCookies from './Components/SiteCookies';
import { useEffect } from 'react';
import RegistrationTaxCalculator from './Pages/RegistrationTaxCalculator';
import VehicleTitleTransfer from './Pages/VehicleTitleTransfer';
import Documents from './Pages/Documents';
import Activated from './Pages/Activated';
import NewAdPictures from './Components/NewAdPictures';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);
  
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/search/:page' element={<SearchList/>}/>
        {/* legyen POST (login), PUT (profil), GETID (/adat/:id) */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/regisztracio' element={<Registration/>}/>
        <Route path='/aktivalas/:username/:email' element={<Activated/>}/>
        <Route path='/elfelejtett-jelszo' element={<ForgottedPassword/>}/>
        <Route path='/uj-jelszo/:email/:token' element={<NewPassword/>}/>
        <Route path='/regisztracios-adokalkulator' element={<RegistrationTaxCalculator/>}/>
        <Route path='/dokumentumtar' element={<Documents/>}/>
        <Route path='/gepjarmu-atiras' element={<VehicleTitleTransfer/>}/>
        <Route path='/hirdetesfeladas' element={<NewAd/>}/>
        <Route path='/modositas/:id' element={<NewAd/>}/>
        <Route path='/kepfeltoltes' element={<NewAdPictures/>}/>
        <Route path='/adatvedelmi-tajekoztatas' element={<DataProtection/>}/>
        <Route path='/aszf' element={<TermsAndConditions/>}/>
        <Route path='kapcsolat' element={<Contact/>}/>
        <Route path='/hirdetes/:id' element={<CarCardDetailed/>}/>
        <Route path='/profil' element={<Profile/>}/>
        {/* <Route path='*' element={<HomePage/>}/> */}
      </Routes>
      <SiteCookies/>
      <Footer/>
    </div>
  );
}

export default App;
