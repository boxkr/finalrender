import React from 'react'
import {Link} from "react-router-dom"

export default function Entree2() {
  return (
    <div>
        <h1>Choose your 2nd Entree</h1>
        <button>
            <Link to="/entree1">Previous</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
            <Link to="/entree3">Next</Link>
        </button>
    </div>
  )
}
