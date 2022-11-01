import React from 'react'
import '../css/App.css';
import { Link } from "react-router-dom";
import logo from '../images/Panda-Express-Logo.png';

let welcome = "Welcome To Panda Express";

export default function Landing() {
 return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="welcome">
          {welcome}
        </p>
        <button> {/*just need to add style with tailwind or bootstrap */}
          <Link to="/login">Login</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
          <Link to="/size">Order Now!</Link>
        </button>
      </header>
    </div>
  )
}
