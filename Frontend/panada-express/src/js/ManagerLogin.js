import React from 'react';
import Button from 'react-bootstrap/Button';
import '../css/Login.css';
import { Link } from "react-router-dom";


export default function ManagerLogin() {
  return (
    <div>
            <title>Manager Login</title>
    <div className='login-div'>
        <h1>Manager Login</h1>
        <br></br>
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
              <Link to="/manager"><Button variant="primary">
              Submit</Button>
              </Link>
            </div>
        </form>
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
