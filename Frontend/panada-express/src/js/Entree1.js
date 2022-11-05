import React from 'react'
import {Link, useLocation} from "react-router-dom"

export default function Entree1() {
  const location = useLocation()
  let order = location.state
  console.log(order)

  return (
    <div>
        <h1>Choose your 1st Entree</h1>
        
        <button>
            <Link to="/side2" state={order}>Previous</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
            <Link to="/entree2" state={order}>Next</Link>
        </button>
    </div>
  )
}
