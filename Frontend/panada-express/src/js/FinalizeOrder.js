import React from 'react'
import {Link, useLocation} from "react-router-dom"
import Button from 'react-bootstrap/Button'
import '../css/Ordering.css'

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
    <div className='finalize'>
        <h1>Your Order Summary</h1>
        <p>
        <Link className='button-text' to="/extra"><Button variant="primary">
            Previous</Button>
        </Link>
        <Link className='button-text' onClick={handleOrderMore} to="/size"><Button variant="primary">
            Continue your order</Button>
        </Link>
        <Link className='button-text' onClick={handleFinalize}><Button variant="success">
            Order Now</Button>
        </Link>
        </p>
    </div>
  )
}
