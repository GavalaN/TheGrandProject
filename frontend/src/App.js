import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import Useful_Things from './Pages/Useful_Things';
import DataProtection from './Pages/DataProtection';
import TermsAndConditions from './Pages/TermsAndConditions';
import Contact from './Pages/Contact';
import NewAd from './Pages/NewAd';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        {/* legyen POST (login), PUT (profil), GETID (/adat/:id) */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/regisztracio' element={<Registration/>}/>
        <Route path='/hasznos-tudnivalok' element={<Useful_Things/>}/>
        <Route path='/hirdetesfeladas' element={<NewAd/>}/>
        <Route path='/adatvedelmi-tajekoztatas' element={<DataProtection/>}/>
        <Route path='/aszf' element={<TermsAndConditions/>}/>
        <Route path='kapcsolat' element={<Contact/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
