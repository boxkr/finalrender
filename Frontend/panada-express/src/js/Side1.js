import React from 'react'
import { Link } from "react-router-dom"

export default function Side1() {
  return (
    <div>
        <h1>Choose your 1st side</h1>
        <button>
            <Link to="/size">Previous</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
            <Link to="/side2">Next</Link>
        </button>
    </div>
  )
}
