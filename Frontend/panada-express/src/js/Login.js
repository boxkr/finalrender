import React from 'react';
import Button from 'react-bootstrap/Button';
import '../css/Login.css';
import { Link } from "react-router-dom";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import {useEffect} from 'react';
import {gapi} from 'gapi-script';

// const fs = require('fs');
// const client = fs.readFileSync('../client_secret.txt', 'utf8').split(/\r?\n/);

const clientID = "726483990366-aja05ddbfl17kvjes627pg8tvge9f4re.apps.googleusercontent.com"


export default function Login(props) {

  useEffect(() => {
    function start(){
      gapi.auth2.init({
        clientId: clientID,
        scope: ""
      })
    };

    gapi.load('client:auth2', start)
  })

  let totalOrderPass = props.totalOrder;
  let setTotalOrderPass = props.setTotalOrder;

  return (
    <div className='login-div'>
        <h1>Login to your Panda Express account</h1>
        <br></br>
        <LoginButton 
          totalOrder = {totalOrderPass}
          setTotalOrder = {setTotalOrderPass}
        />
        <LogoutButton />
        <br></br>
        <form>
            <label>
                <p>Username</p>
                <input type="text" />
            </label>
            <br></br>
            <label>
                <p>Password</p>
                <input type = "password" /> 
            </label>
            <div>
              <br></br>
              <Link to="/size"><Button variant="primary">
              Submit</Button>
              </Link>
            </div>
        </form>
        <p className='create-account-text'>
          Dont have a Panda Express acount? <br></br>
          <Link className='button-text'to="/createaccount">Click here to create one.</Link>
        </p>
        <p className='return'>
          <br></br>
          <br></br>
          <br></br>
          
          <Link className='button-text' style={{ textDecoration: 'none' }} to="/"><Button variant="secondary">
            Return to landing page</Button>
          </Link>
          <br></br>
          <br></br>
          <Link className='alt-login'to="/managerlogin">Click here to login as a manager.</Link>      
        </p>
    </div>
  )
}
