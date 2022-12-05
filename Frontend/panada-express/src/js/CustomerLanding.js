import React from 'react';
import {Translator, Translate} from 'react-auto-translate';
import logo from '../images/Panda-Express-Logo.png';
import {Button} from 'react-bootstrap';
import ReactLanguageSelect from 'react-languages-select';
import { Link } from "react-router-dom";

export default function CustomerLanding(props){
    const welcome = "Welcome To Panda Express";
    const userLanguage = props.userLanguage;
    const userName = props.totalOrder.userID;
    const userPoints = props.totalOrder.userPoints
    return (
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
            <div className='customerInfo'>
                <p>Hello {userName}! You currently have {userPoints} Points</p>
                <br></br>
            </div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <br></br>
                <p className="welcome">
                    <Translate>{welcome}</Translate>
                </p>
                <Link className='button-text' to="/LoginStarter"><Button variant="primary">
                    <Translate>Login</Translate></Button>
                </Link>
                <Link className='button-text' to="/size"><Button variant="primary">
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