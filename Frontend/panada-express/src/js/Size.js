import React from 'react'
import { Link } from "react-router-dom"
import '../css/Size.css';
import Button from 'react-bootstrap/Button';

export default function Size() {
  return (
    <div className='size-menu'>
      <p className='nav-buttons'>
      <Link className='link' to="/"><Button variant="outlined" className='navbutton'>
            Previous</Button>
      </Link> 
      <Link className='link' to="/side1"><Button variant="outlined" className='navbutton'>
            Next</Button>
      </Link>
      </p>
      <h1>Select a size</h1>
    </div>
  )
}
