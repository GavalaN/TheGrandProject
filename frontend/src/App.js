import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
