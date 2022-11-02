import React from 'react'
import { Link, useLocation } from "react-router-dom"

let order = {};
export default function Size() {
  const location = useLocation()

  return (
    <div>
        <h1>Choose your size</h1>
        <button>
            <Link to='/'>Previous</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
            <Link to='/side1' state={order}>Next</Link>
        </button>
    </div>
  )
}
