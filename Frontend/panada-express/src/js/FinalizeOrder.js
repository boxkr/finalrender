import React from 'react'
import {Link, useLocation} from "react-router-dom"

export default function FinalizeOrder() {

  const location = useLocation()
  let order = location.state

  const handleOrderMore = () => {
    //we're not done yet, so we push the order we have currently to a list of our orders, and restart
    order.largeOrder.push(order.smallOrder);
    order.smallOrder={};
  }

  const handleFinalize = () => {


    console.log("order finalized")

    //add order to order history

    //remove stuff from inventory

    //probably redirect to some page, maybe displaying how much you paid

  }
  
  console.log(order)
  return (
    <div>
        <h1>Your Order Summary</h1>
        <button>
            <Link to="/extra" state={order}>Previous</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
            <Link to="/size" onClick={handleOrderMore} state={order}>Order More</Link>
        </button>
        <button onClick={handleFinalize}> Order Now </button>
    </div>
  )
}
