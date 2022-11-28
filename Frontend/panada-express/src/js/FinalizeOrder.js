import React, { useEffect, useState } from 'react'
import {Link, useLocation} from "react-router-dom"
import Button from 'react-bootstrap/Button'
import '../css/Ordering.css'

export default function FinalizeOrder(props) {

  const [orderState, setOrderState] = useState(useLocation().state);

  // let totalOrder = [...orderState.totalOrder];
  // let totalOrderPrice = ('totalOrderPrice' in orderState) ? orderState.totalOrderPrice : 0;

  /**
  * Sets the actual order state totalOrder to the one with the current item added.
  */
  const addCurrentToTotalOrder = () => {
    let tempCurrentOrder = props.currentOrder;
    let tempTotalOrder = props.totalOrder;
    tempTotalOrder.orders.push(tempCurrentOrder);
    tempTotalOrder.totalPrice += tempCurrentOrder.price;
    tempCurrentOrder = {};
    props.setCurrentOrder(tempCurrentOrder);
    props.setTotalOrder(tempTotalOrder);
    console.log("Total Order:", props.totalOrder);
  }

  useEffect(() =>{
    addCurrentToTotalOrder();
  }, [])

  // let global_currentOrder = props.currentOrder;
  let global_totalOrder = props.totalOrder;

  let totalOrder = []
  for (let i = 0; i < global_totalOrder.orders.length; i++){
    let currentItem = {
      Size: global_totalOrder.orders[i].size,
      Items: global_totalOrder.orders[i].sides.concat(global_totalOrder.orders[i].entrees)
    }
    totalOrder.push(currentItem);
  }

  /**
  * Finalizes the order.
  */
  const handleFinalize = () => {
    // addCurrentToTotalOrder();
    console.log("order finalized");

    //TODO: backend API call
    const data = {
      ServerName: global_totalOrder.serverName,
      CustomerName: global_totalOrder.userID,
      TotalPrice: global_totalOrder.totalPrice,
      OrderDetails: totalOrder
    }

    console.log(data)

    fetch('http://localhost:3000/api/FinalizeOrder', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }

  /**
    * Pops the previous page off of the selectionHistory stack. Called when heading back to the previous page.
    */
  const removePreviousSelection = () => {
    let temp = props.currentOrder;
    temp.selectionHistory.pop();
    props.setCurrentOrder(temp);
  }

  //Get JSX for displaying all items in the order
  let fullOrderDisplay = global_totalOrder.orders.map((singleOrder, index1) => {
    return (
      <div key={index1}>
        <h3> {singleOrder.size.toUpperCase()} </h3>
        {
          singleOrder.sides.map((side, index2) => (
            <p key={index2}>{side}</p>
          ))
        } 
        {
          singleOrder.entrees.map((entree, index3) => (
            <p key={index3}>{entree}</p>
          ))
        }
        <p key={"etc"}>{singleOrder.extra}</p>
      </div>
  )});
  // console.log(fullOrderDisplay)


  return (
    <div className='finalize'>
        <h1>Your Order Summary</h1>
        <p>
        <Link className='button-text' onClick={removePreviousSelection} to="/extra"><Button variant="primary">
            Previous</Button>
        </Link>
        <Link className='button-text' to="/size"><Button variant="primary">
            Order More</Button>
        </Link>
        {/* <Link className='button-text' onClick={addCurrentToTotalOrder} to="/size"><Button variant="primary">
            Order More</Button>
        </Link> */}
        <Link className='button-text' onClick={handleFinalize} to="/" /* TODO: Payment page */ ><Button variant="success">
            Finalize Order</Button>
        </Link>
        </p>
        { fullOrderDisplay }
    </div>
  )
}
