import React from 'react'
import { Link, useLocation } from "react-router-dom"

export default function Side1() {
  
  const location = useLocation()
  let order = location.state
  console.log(order)
  return (
    
    <div>
        <h1>Choose your 1st side</h1>
        <button>
            <Link to="/size" state={order}>Previous</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
            <Link to="/side2" state={order}>Next</Link>
        </button>
    </div>
  )
}
