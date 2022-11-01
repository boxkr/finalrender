import React from 'react'
import{Link} from "react-router-dom"

export default function Extra() {
  return (
    <div>
        <h1>Any Extras?</h1>
        <button>
            <Link to="/entree3">Previous</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
            <Link to="/drink">Next</Link>
        </button>
    </div>
  )
}
