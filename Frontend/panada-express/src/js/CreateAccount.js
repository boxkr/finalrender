import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import '../css/Login.css';
import { Link, useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const getUsername = (e) =>{
    setUsername(e.target.value);
  }

  const getFirstName = (e) =>{
    setFirstName(e.target.value);
  }

  const getLastName = (e) => {
    setLastName(e.target.value);
  }

  const getPassword = (e) =>{
    setPassword(e.target.value);
  }

  const createAccount = () =>{
    const data = {
      FirstName: firstName,
      LastName: lastName,
      Username: username,
      Password: password
    }
    console.log(process.env.REACT_APP_BACKEND_URL)
    fetch(process.env.REACT_APP_BACKEND_URL + '/api/RegisterCustomerAccount',
      {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
      .then((response) => response.json)
      .then((data) => success())
      .catch((error) => alert("Something went wrong. Please try again."));
  }

  const success = () =>{
    alert("Account has been successfully created! Please login to continue.")
    const goToHome = () => navigate('/');
    goToHome();
  }

  return (
    <div>
      <title>Create an Account</title>
    <div className='login-div'>
        <h1>Create a new Panda Express Account</h1>
        <br></br>
        <br></br>
        <form>
            <label>
                <p>Username</p>
                <input type="text" onChange={getUsername}/>
            </label>
            <br></br>
            <label>
                <p>First Name</p>
                <input type="text" onChange={getFirstName}/>
            </label>
            <br></br>
            <label>
                <p>Last Name</p>
                <input type="text" onChange={getLastName}/>
            </label>
            <br></br>
            <label>
                <p>Password</p>
                <input type = "password" onChange={getPassword}/> 
            </label>
            <div>
              <br></br>
                <Button variant="primary" onClick={createAccount}>Submit</Button>{
                  
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
    </div>
  )
}