import React from 'react'
import {Link, useLocation} from "react-router-dom"

export default function Entree3() {
  const location = useLocation()
  let order=location.state
  console.log(order)
  return (
    <div>
        <h1>Choose your 3rd Entree</h1>
        <button>
            <Link to="/entree2" state={order}>Previous</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
            <Link to="/extra" state={order}>Next</Link>
        </button>
    </div>
  )
}
