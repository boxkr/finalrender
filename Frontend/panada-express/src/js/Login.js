import React from 'react';
import Button from 'react-bootstrap/Button';
import '../css/Login.css';
import { Link } from "react-router-dom";


export default function Login() {
  return (
    <div className='login-div'>
        <h1>Login to your Panda Express account</h1>
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
                <Button variant="primary">Submit</Button>{
                  //FIXME
                }
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
        </p>
    </div>
  )
}
