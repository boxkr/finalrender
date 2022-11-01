import React from 'react'
import {Link} from "react-router-dom"

export default function Drink() {
  return (
    <div>
        <h1>Any Drinks?</h1>
        <button>
            <Link to="/extra">Previous</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
            <Link to="/finalizeOrder">Next</Link>
        </button>
    </div>
  )
}
