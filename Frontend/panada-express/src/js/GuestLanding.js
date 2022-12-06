import React from 'react';
import {Translator, Translate} from 'react-auto-translate';
import logo from '../images/Panda-Express-Logo.png';
import {Button} from 'react-bootstrap';
import ReactLanguageSelect from 'react-languages-select';
import { Link } from "react-router-dom";

export default function GuestLanding(props){
    const welcome = "Welcome To Panda Express";
    const userLanguage = props.userLanguage;
    return (
        <div>
            <title>Landing page for Guests</title>
        <div className="App">
            <ReactLanguageSelect className="language-select"
                searchable={true}
                defaultLanguage='en'
                onSelect={(languageCode)=>props.setUserLanguage(languageCode)}
                //selected language is saved in props.totalOrder.userLang
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
                <Link className='button-text' to="/LoginStarter"><Button variant="primary">
                    <Translate>Login</Translate></Button>
                </Link>
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
        </div>
  )
}