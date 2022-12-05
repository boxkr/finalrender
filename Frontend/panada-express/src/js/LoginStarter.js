import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import '../css/Login.css';
import { Link, Navigate, useNavigate } from "react-router-dom";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import {useEffect} from 'react';
import {gapi} from 'gapi-script';
import {Translator, Translate} from 'react-auto-translate';

// const fs = require('fs');
// const client = fs.readFileSync('../client_secret.txt', 'utf8').split(/\r?\n/);

const clientID = "726483990366-aja05ddbfl17kvjes627pg8tvge9f4re.apps.googleusercontent.com"

export default function LoginStarter(props) {


  

  useEffect(() => {
    function start(){
      gapi.auth2.init({
        clientId: clientID,
        scope: ""
      })
    };

    gapi.load('client:auth2', start)
  })

  return (
      <div className="login-div">
            <h1>I am a...</h1>
            <Link className='button-text' to="/Login"><Button className="starterbtn" variant="primary">
                <Translate>Customer!</Translate></Button>
            </Link>
            <Link className='button-text' to="/ManagerLogin"><Button className="starterbtn" variant="primary">
                <Translate>Manager!</Translate></Button>
            </Link>
      </div>
  )
  
}
