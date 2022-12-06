import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import '../css/Login.css';
import { Link, Navigate, useNavigate } from "react-router-dom";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import {useEffect} from 'react';
import {gapi} from 'gapi-script';

// const fs = require('fs');
// const client = fs.readFileSync('../client_secret.txt', 'utf8').split(/\r?\n/);

const clientID = "726483990366-aja05ddbfl17kvjes627pg8tvge9f4re.apps.googleusercontent.com"

export default function Login(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({firstname: "Guest", customerpoints: 0, username: "Guest"});

  const navigate = useNavigate();

  const getUsername = (e) =>{
    setUsername(e.target.value);
  }

  const getPassword = (e) =>{
    setPassword(e.target.value);
  }

  const login = () =>{
    const data = {
      Username: username,
      Password: password
    }

    fetch(process.env.REACT_APP_BACKEND_URL +'/api/CustomerLogin', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => alert("Failed to login. Please try again."));
  }

  useEffect(() => {
    console.log("Login success")
    let temp = props.totalOrder;
    temp.firstname = userData.firstname;
    temp.userID = userData.username;
    temp.userPoints = userData.customerpoints;
    props.setTotalOrder(temp);
    const goToHome = () => navigate('/login');
    goToHome();
  }, [userData])

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
  if (props.totalOrder.userID == "Guest"){
    return (
      <div>
            <title>Log in!</title>
      <div className='login-div'>
          <h1>Login to your Panda Express account</h1>
          <br></br>
          <LoginButton 
            totalOrder = {totalOrderPass}
            setTotalOrder = {setTotalOrderPass}
          />
          <LogoutButton 
            totalOrder = {totalOrderPass}
            setTotalOrder = {setTotalOrderPass}
          />
          <br></br>
          <form>
              <label>
                  <p>Username</p>
                  <input type="text" onChange={getUsername}/>
              </label>
              <br></br>
              <label>
                  <p>Password</p>
                  <input type = "password" onChange={getPassword}/> 
              </label>
              <div>
                <br></br>
                <Button variant="primary" onClick={login}>
                  Submit
                </Button>
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
          </p>
      </div>
      </div>
    )
  }
  
  else{
    return (
      <Navigate to='/'/>
    )
  }
  
}
