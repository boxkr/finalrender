import React from 'react'
import {Link} from "react-router-dom"

export default function Entree3() {
  return (
    <div>
        <h1>Choose your 3rd Entree</h1>
        <button>
            <Link to="/entree2">Previous</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
            <Link to="/extra">Next</Link>
        </button>
    </div>
  )
}
