import React from 'react';
import Button from 'react-bootstrap/Button';
import '../css/Login.css';
import { Link } from "react-router-dom";

export default function CreateAccount() {
    return (
      <div className='login-div'>
          <h1>Create a new Panda Express Account</h1>
          <br></br>
          <br></br>
          <form>
              <label>
                  <p>Username</p>
                  <input type="text" />
              </label>
              <br></br>
              <label>
                  <p>First Name</p>
                  <input type="text" />
              </label>
              <br></br>
              <label>
                  <p>Last Name</p>
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
          <p className='return'>
            <br></br>
            <Link className='button-text' style={{ textDecoration: 'none' }} to="/login"><Button variant="secondary">
            Return to login page</Button>
          </Link>
            <br></br>
            <br></br>
            <Link className='button-text' style={{ textDecoration: 'none' }} to="/"><Button variant="secondary">
            Return to landing page</Button>
          </Link>
          </p>
      </div>
    )
  }