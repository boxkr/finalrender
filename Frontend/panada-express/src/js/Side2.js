import React from 'react'
import {Link} from "react-router-dom"

export default function Side2() {
  return (
    <div>
        <h1>Choose your 2nd side</h1>
        <button>
            <Link to="/side1">Previous</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
            <Link to="/entree1">Next</Link>
        </button>
    </div>
  )
}
