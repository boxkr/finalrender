import React, { useEffect } from 'react'
import {useState} from 'react';
import '../css/App.css';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-languages-select/css/react-languages-select.css';
import GuestLanding from './GuestLanding';
import CustomerLanding from './CustomerLanding';

// let userLanguage = 'en';
//(languageCode)=>setUserLanguage(languageCode)
export default function Landing(props) {
  const [userLanguage, setUserLanguage] = useState('en');
  // let totalOrder = props.totalOrder;
  useEffect(() =>{
    let temp = props.totalOrder;
    temp.userLanguage = userLanguage;
    props.setTotalOrder(temp);
    console.log(props.totalOrder);
  }, [userLanguage]);

  if (props.totalOrder.userID == "Guest"){
    return(
      <GuestLanding
        userLanguage = {userLanguage}
        setUserLanguage = {setUserLanguage}
      />
    )
  }
  else{
    return (
      <CustomerLanding
        userLanguage = {userLanguage}
        setUserLanguage = {setUserLanguage}
        totalOrder = {props.totalOrder}
        setTotalOrder = {props.setTotalOrder}
      />
    )
  }
}
