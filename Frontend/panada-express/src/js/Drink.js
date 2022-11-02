import React from 'react'
import {Link, useLocation} from "react-router-dom"

export default function Drink() {
  const location = useLocation()
  let order = location.state
  console.log(order)
  return (
    <div>
        <h1>Any Drinks?</h1>
        <button>
            <Link to="/extra" state={order}>Previous</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
            <Link to="/finalizeOrder" state={order}>Next</Link>
        </button>
    </div>
  )
}
