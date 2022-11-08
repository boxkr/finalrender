import React from 'react'
import{Link, useLocation} from "react-router-dom"

export default function Extra() {
  const location = useLocation()
  let order = location.state
  console.log(order)
  return (
    <div>
        <h1>Any Extras?</h1>
        <button>
            <Link to="/entree3" state={order}>Previous</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
            <Link to="/drink" state={order}>Next</Link>
        </button>
    </div>
  )
}
