import React, { useEffect, useState } from 'react'
import {Link, useLocation} from "react-router-dom"
import Button from 'react-bootstrap/Button'
import '../css/Ordering.css'

export default function FinalizeOrder() {

  const [orderState, setOrderState] = useState(useLocation().state);

  let totalOrder = orderState.totalOrder;

  //Sets the actual order state totalOrder to the one with the current item added.
  const addCurrentToTotalOrder = () => {
    let temp = orderState;
    temp.totalOrder = totalOrder;
    temp.selectionHistory = [];
    setOrderState(temp);
  }

  const handleFinalize = () => {
    addCurrentToTotalOrder();
    console.log("order finalized");

    //TODO: backend API call

  }

  /**
    * Pops the previous page off of the selectionHistory stack. Called when heading back to the previous page.
    */
   const removePreviousSelection = () => {
    let temp = orderState;
    temp.selectionHistory.pop();
    setOrderState(temp);
    console.log(orderState)
  }


  let temp = [...orderState.totalOrder];
  console.log(orderState)

  if (temp.length > orderState.totalOrder.length) {
    return;
  }
  
  let currentItem = {"Size": orderState.currentSize, "Items": []};

  for (let i = 0; i < orderState.selectionHistory.length; i++) {
    if (orderState.selectionHistory[i]["page"] !== "/size") {
      currentItem["Items"].push(orderState.selectionHistory[i]["selection"]);
    }
  }

  temp.push(currentItem);

  totalOrder = temp;

  let fullOrderDisplay = totalOrder.map((orderItem, index1) => {
    return (
      <div key={index1}>
        <h3> {orderItem["Size"].toUpperCase()} </h3>
        {
          orderItem["Items"].map((item_component, index2) => (
            <p key={index2}>{item_component}</p>
          ))
        } 
      </div>
  )});


  console.log(fullOrderDisplay)

  return (
    <div className='finalize'>
        <h1>Your Order Summary</h1>
        <p>
        <Link className='button-text' onClick={removePreviousSelection} to="/extra" state={orderState}><Button variant="primary">
            Previous</Button>
        </Link>
        <Link className='button-text' onClick={addCurrentToTotalOrder} to="/size" state={orderState}><Button variant="primary">
            Order More</Button>
        </Link>
        <Link className='button-text' onClick={handleFinalize} to="/" /* TODO: Payment page */ ><Button variant="success">
            Finalize Order</Button>
        </Link>
        </p>
        { fullOrderDisplay }
    </div>
  )
}
