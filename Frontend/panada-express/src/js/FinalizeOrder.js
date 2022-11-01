import React from 'react'
import {Link} from "react-router-dom"

export default function FinalizeOrder() {
  return (
    <div>
        <h1>Your Order Summary</h1>
        <button>
            <Link to="/drink">Previous</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
            <Link to="/size">Order More</Link>
            {/* 
                need to add functionality
                Currently just has buttons to navigate
            */}
        </button>
        <button> Order Now </button> {/* Does nothing for now */}
    </div>
  )
}
