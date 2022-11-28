import React from 'react'
import '../css/App.css';
import { Link } from "react-router-dom";
import logo from '../images/Panda-Express-Logo.png';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';


let welcome = "Welcome To Panda Express";

export default function Landing({orderInfo}) {
 return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br></br>
        <p className="welcome">
          {welcome}
        </p>
        <Link className='button-text' to="/Login"><Button variant="primary">
            Login</Button>
          </Link>
        <br></br>
        <Link className='button-text' to="/size"><Button variant="primary">
            Order Now!</Button>
          </Link>
      </header>
    </div>
  )
}
