import React, { useEffect } from 'react'
import { Link } from "react-router-dom"

async function populate(items){
    items = await getResponse();
    // console.log(items);
    return items
}

async function getResponse(){
    let response;
    const res = await fetch("http://localhost:3000/api/inventory");
    response = res.json();
    // console.log(response);
    return response;
}

export default function Size() {
    var items;
    items = getResponse();
    console.log(items.resolve());
  return (
    <div>
        <h1>Choose your size</h1> 
        <button>
            <Link to='/'>Previous</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
            <Link to='/side1' state={order}>Next</Link>
        </button>
    </div>
  )
}
