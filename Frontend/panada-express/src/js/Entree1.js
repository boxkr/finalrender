import React from 'react'
import {Link} from "react-router-dom"

export default function Entree1() {
  return (
    <div>
        <h1>Choose your 1st Entree</h1>
        <button>
            <Link to="/side2">Previous</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
            <Link to="/entree2">Next</Link>
        </button>
    </div>
  )
}
