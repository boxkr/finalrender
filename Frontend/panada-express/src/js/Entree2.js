import React from 'react'
import {Link, useLocation} from "react-router-dom"

export default function Entree2() {
  const location = useLocation();
  let order = location.state
  console.log(order)
  return (
    <div>
        <h1>Choose your 2nd Entree</h1>
        <button>
            <Link to="/entree1" state={order}>Previous</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
            <Link to="/entree3" state={order}>Next</Link>
        </button>
    </div>
  )
}
