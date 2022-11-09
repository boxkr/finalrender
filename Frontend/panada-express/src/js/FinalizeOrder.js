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

    //backend API call

    //probably redirect to some page, maybe displaying how much you paid

  }

  console.log(order);
  let allItems = [...order.largeOrder];
  allItems.push(order.smallOrder);

  console.log(allItems)

  for (let i = 0; i < allItems.length; i++) {
    allItems[i].items_array = [];
    for(const [key, value] of Object.entries(allItems[i])) {
      if (key !== "size" && key !== "items_array") {
        allItems[i].items_array.push(value + "\n");
      }
    }
  }

  console.log(allItems)
  
  const fullOrderDisplay = allItems.map((smallOrder, index1) => {
    return (
      <div key={index1}>
        <h3> {smallOrder.size.toUpperCase()} </h3>
        {
          smallOrder.items_array.map((order_item, index2) => (
            <p key={index2}>{order_item}</p>
          ))
        } 
      </div>
  )});


  
  console.log(fullOrderDisplay)

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
        { fullOrderDisplay }
        </p>
    </div>
  )
}
