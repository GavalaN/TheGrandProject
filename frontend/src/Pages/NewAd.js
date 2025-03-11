import React, { useEffect } from 'react';
import NewAdForm from '../Components/NewAdForm';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function NewAd() {
  const navigate = useNavigate();
  const user = Cookies.get("user");

  useEffect(() => {
    if (user === undefined) {
      alert("Hirdetésfeladáshoz kérlek jelentkezz be!")
      navigate("/login")
    }
  }, [user])
  return (
    <div className="content">
      <NewAdForm/>
    </div>
  )
}
