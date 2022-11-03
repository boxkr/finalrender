import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"


export default function Size() {
    const [sizes, setSizes] = useState(null);
    useEffect(() => {
        fetch("http://localhost:3000/api/Sizes")
            .then((response) => response.json())
            .then((data) => setSizes(data));
    }, []);

  return (
    <div>
        <h1>Choose your size</h1> 
        {/* {sizes.map((size) => (
            <div key = {size.id}>
                <div>{size.id}</div>
                <div>{size.name}</div>
                <div>{size.numSides}</div>
                <div>{size.numEntrees}</div>
                <div>{size.price}</div>
            </div>
        ))} */}
        {console.log(sizes)}
        <button>
            <Link to='/'>Previous</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
            <Link to='/side1'>Next</Link>
        </button>
    </div>
  )
}
