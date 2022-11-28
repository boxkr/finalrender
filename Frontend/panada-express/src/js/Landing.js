import React from 'react'
import {useState} from 'react';
import '../css/App.css';
import { Link } from "react-router-dom";
import logo from '../images/Panda-Express-Logo.png';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import {Translator, Translate} from 'react-auto-translate';
import { TranslateContext } from 'react-auto-translate/lib/commonjs/translator';
import ReactLanguageSelect from 'react-languages-select';
import 'react-languages-select/css/react-languages-select.css';
import { BsTelephoneMinus } from 'react-icons/bs';
let welcome = "Welcome To Panda Express";

// let userLanguage = 'en';
//(languageCode)=>setUserLanguage(languageCode)
export default function Landing() {
  const [userLanguage, setUserLanguage] = useState('en');
  return (
    <div className="App">
      <ReactLanguageSelect className="language-select"
        searchable={true}
        defaultLanguage='en'
        onSelect={(languageCode)=>setUserLanguage(languageCode)}
      ></ReactLanguageSelect>
      <Translator 
        from='en'
        to={userLanguage}
        googleApiKey='AIzaSyDFSi6R48DY2waTTn0If0j8tkuqFCtSzHY'
        >
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br></br>
        <p className="welcome">
          <Translate>{welcome}</Translate>
        </p>
        <Link className='button-text' to="/Login"><Button variant="primary">
            <Translate>Login</Translate></Button>
          </Link>
        <br></br>
        <Link className='button-text' to="/size" state={userLanguage}><Button variant="primary">
            <Translate>Order Now!</Translate></Button>
          </Link>
        <br></br>
        <Link className='button-text' to="/Location"><Button variant="warning">
            <Translate>View our location on a map</Translate></Button>
          </Link>
      </header>
      </Translator>
    </div>
  )
}
