import React from 'react'
import '../css/App.css';
import { Link } from "react-router-dom";
import logo from '../images/Panda-Express-Logo.png';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

let welcome = "Welcome To Panda Express";

export default function Landing() {
 return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br></br>
        <p className="welcome">
          {welcome}
        </p>
        <Button variant="primary" size="lg"> {' '}
          <Link className='button-text' style={{ textDecoration: 'none' }} to="/login">Login</Link>
        </Button>
        <br></br>
        <Button variant="primary" size="lg"> {/*just need to add style with tailwind or bootstrap */}
          <Link className='button-text' style={{ textDecoration: 'none' }} to="/size">Order Now!</Link>
        </Button>
      </header>
    </div>
  )
}
