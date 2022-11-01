import React from 'react'
import { Link } from "react-router-dom"

export default function Size() {
  return (
    <div>
        <h1>Choose your size</h1>
        <button>
            <Link to="/">Previous</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
            <Link to="/side1">Next</Link>
        </button>
    </div>
  )
}
