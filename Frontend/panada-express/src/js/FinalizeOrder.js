import React, { useEffect, useState } from 'react'
import {Link, useLocation} from "react-router-dom"
import Button from 'react-bootstrap/Button'
import '../css/Ordering.css'
import {Translator, Translate} from 'react-auto-translate';
import { TranslateContext } from 'react-auto-translate/lib/commonjs/translator';

export default function FinalizeOrder(props) {

  const [orderState, setOrderState] = useState(useLocation().state);
  const [refresher, forceRefresh] = useState(Math.random());
  const [totalPrice, setTotalPrice] = useState(-1);
  // let totalOrder = [...orderState.totalOrder];
  // let totalOrderPrice = ('totalOrderPrice' in orderState) ? orderState.totalOrderPrice : 0;

  /**
  * Sets the actual order state totalOrder to the one with the current item added.
  */

  //we are ordering more, so we set current order to nothing
  const handleOrderMore=()=>{
    let tempCurrentOrder = props.currentOrder;
    tempCurrentOrder = tempCurrentOrder = {'entrees' : [], 'extra': "", 'numEntrees': 0, 'numSides': 0, 'price': 0, 'selectionHistory': [], 'sides': [], 'size': "", 'userLanguage': ""};
    props.setCurrentOrder(tempCurrentOrder); //refreshes
  }

  //add everything to total order. we don't immediately change props.current order to {} in case we want to go back
  const addCurrentToTotalOrder = () => {
    let tempCurrentOrder = props.currentOrder;
    let tempTotalOrder = props.totalOrder;
    tempTotalOrder.orders.push(tempCurrentOrder);
    tempTotalOrder.totalPrice += tempCurrentOrder.price;
    props.setCurrentOrder(tempCurrentOrder);
    props.setTotalOrder(tempTotalOrder);
    setTotalPrice(props.totalOrder.totalPrice);
    console.log("Total Order:", props.totalOrder);

  }

  const handleLeave = ()=>{
    //reset everything
    let tempTotalOrder = {'orders':[],'serverName':"",'totalPrice': 0,'userID': global_totalOrder.userID, 'userLanguage': "en", 'userPoints':global_totalOrder.userPoints};
    let tempCurrentOrder = {'entrees' : [], 'extra': "", 'numEntrees': 0, 'numSides': 0, 'price': 0, 'selectionHistory': [], 'sides': [], 'size': "", 'userLanguage': ""};
    props.setCurrentOrder(tempCurrentOrder);
    props.setTotalOrder(tempTotalOrder);
  }

  useEffect(() =>{
    addCurrentToTotalOrder();
    forceRefresh(Math.random())
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
  const handleFinalize = async () => {
    // addCurrentToTotalOrder();
    console.log("order finalized");

    const data = {
      ServerName: global_totalOrder.serverName,
      CustomerName: global_totalOrder.userID,
      TotalPrice: global_totalOrder.totalPrice,
      OrderDetails: totalOrder
    }

    console.log(data)

    await fetch(process.env.REACT_APP_BACKEND_URL +'/api/FinalizeOrder', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      //.then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    
      //if we're a logged in account, we want to add points to our account
      let pointstoadd = 0;
      if(global_totalOrder.userID && global_totalOrder.userID != "Guest"){

        console.log("USER FOUND, UPDATING POINTS")
        //get the points to add, and send it off to the sever route.
        pointstoadd = (global_totalOrder.totalPrice)*100;
        console.log("POINTS TO ADD:",pointstoadd);
        const ptsData = {Username : global_totalOrder.userID, NumPoints: pointstoadd}
        await fetch(process.env.REACT_APP_BACKEND_URL +'/api/AddUserPoints',{method: "PUT", headers: {'Content-Type': 'application/json',},body: JSON.stringify(ptsData),})
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      }

      //reset everything
      let tempTotalOrder = {'orders':[],'serverName':"",'totalPrice': 0,'userID': global_totalOrder.userID, 'userLanguage': "en", 'userPoints':global_totalOrder.userPoints+pointstoadd};
      let tempCurrentOrder = {'entrees' : [], 'extra': "", 'numEntrees': 0, 'numSides': 0, 'price': 0, 'selectionHistory': [], 'sides': [], 'size': "", 'userLanguage': ""};
      props.setCurrentOrder(tempCurrentOrder);
      props.setTotalOrder(tempTotalOrder);

      
      

  }

  const handleFinalizeWithPoints=async()=>{

    console.log("order finalized with points");

    const data = {
      ServerName: global_totalOrder.serverName,
      CustomerName: global_totalOrder.userID,
      TotalPrice: global_totalOrder.totalPrice,
      OrderDetails: totalOrder
    }

    console.log(data)

    await fetch(process.env.REACT_APP_BACKEND_URL +'/api/FinalizeOrder', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      //.then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    
      //if we're a logged in account, we want to add points to our account
      let pointstoadd = 0;
      if(global_totalOrder.userID && global_totalOrder.userID != "Guest"){

        console.log("USER FOUND, UPDATING POINTS")
        //get the points to add, and send it off to the sever route.
        pointstoadd = -1000;
        console.log("POINTS TO ADD:",pointstoadd);
        const ptsData = {Username : global_totalOrder.userID, NumPoints: pointstoadd}
        await fetch(process.env.REACT_APP_BACKEND_URL +'/api/AddUserPoints',{method: "PUT", headers: {'Content-Type': 'application/json',},body: JSON.stringify(ptsData),})
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      }
    //reset everything
    let tempTotalOrder = {'orders':[],'serverName':"",'totalPrice': 0,'userID': global_totalOrder.userID, 'userLanguage': "en", 'userPoints':global_totalOrder.userPoints-1000};
    let tempCurrentOrder = {'entrees' : [], 'extra': "", 'numEntrees': 0, 'numSides': 0, 'price': 0, 'selectionHistory': [], 'sides': [], 'size': "", 'userLanguage': ""};
    props.setCurrentOrder(tempCurrentOrder);
    props.setTotalOrder(tempTotalOrder);
  }

  /**
    * Pops the previous page off of the selectionHistory stack. Called when heading back to the previous page.
    */
  const removePreviousSelection = () => {
    let temp = props.currentOrder;
    temp.selectionHistory.pop();

    temp.extra="";
    props.totalOrder.orders.pop();
    props.totalOrder.totalPrice-=props.currentOrder.price;
    props.setCurrentOrder(temp);
  }

  const handleRemoveItem = (index,itemPrice) => {
    //props.orders.pop();
    global_totalOrder.orders.splice(index,1);
    global_totalOrder.totalPrice = global_totalOrder.totalPrice-itemPrice;
  }
  //Get JSX for displaying all items in the order

  let fullOrderDisplay = global_totalOrder.orders.map((singleOrder, index1) => {
    console.log(global_totalOrder.orders.length); 
    return (
      <div className="full-order-display" key={index1}>
        <Translator
      to={props.currentOrder.userLanguage}
      from='en'
      googleApiKey='AIzaSyDFSi6R48DY2waTTn0If0j8tkuqFCtSzHY'
      >
        <h3> <Translate>{singleOrder.size.toUpperCase()}</Translate></h3>
        {
          singleOrder.sides.map((side, index2) => (
            <p key={index2}><Translate>{side}</Translate></p>
          ))
        } 
        {
          singleOrder.entrees.map((entree, index3) => (
            <p key={index3}><Translate>{entree}</Translate></p>
          ))
        }
        <p key={"etc"}><Translate>{singleOrder.extra}</Translate></p>
        {/* <Button variant="outline-light">Remove {singleOrder.size}</Button>{handleRemoveItem} */}
        {singleOrder.size != '' && <Link className='button-text' onClick={()=>handleRemoveItem(index1,singleOrder.price)} /* TODO: Payment page */ ><Button variant="outline-light">
            <Translate>Remove {singleOrder.size}</Translate></Button>
        </Link>}
        </Translator>
      </div>
  )});
      console.log("PROPS",props);
  let roundedTotal = Math.round(100 * global_totalOrder.totalPrice) / 100;
  return (
    <div>
      <title>Finalize your order</title>
    <div className='finalize'>
      <Translator
      to={props.currentOrder.userLanguage}
      from='en'
      googleApiKey='AIzaSyDFSi6R48DY2waTTn0If0j8tkuqFCtSzHY'
      >
        <h1><Translate>Your Order Summary</Translate></h1>
        <h2><Translate>Total Price: {roundedTotal}</Translate></h2>
        {props.totalOrder.userID && props.totalOrder.userID != "Guest" && props.totalOrder.userPoints >= 1000 ? <h3 className='points-declare'>With your points you're eligible for half off! New Price: {roundedTotal * 0.5}</h3> : ""}
        {props.totalOrder.userID && props.totalOrder.userID != "Guest" ? <h5>Your points: {props.totalOrder.userPoints}</h5> : ""}
        <p>
        <Link className='button-text' to="/extra" onClick={removePreviousSelection} ><Button variant="primary">
            <Translate>Previous</Translate></Button>
        </Link>
        <Link className='button-text' onClick={handleOrderMore} to="/size"><Button variant="primary">
            <Translate>Order More</Translate></Button>
        </Link>
        {/* <Link className='button-text' onClick={addCurrentToTotalOrder} to="/size"><Button variant="primary">
            Order More</Button>
        </Link> */}
        <Link className='button-text' onClick={handleFinalize} to="/" /* TODO: Payment page */ ><Button variant="success">
            <Translate>Finalize Order</Translate></Button>
        </Link>
        { props.totalOrder.userID && props.totalOrder.userID != "Guest" && props.totalOrder.userPoints >= 1000 ?
        <Link className='button-text' onClick={handleFinalizeWithPoints} to="/" /* TODO: Payment page */ ><Button variant="success">
            <Translate>Finalize Order with Points</Translate></Button>
        </Link> : ""
        }
        <Link className='button-text' onClick={handleLeave} to="/" /* TODO: Payment page */ ><Button variant="secondary">
            <Translate>Go back to home</Translate></Button>
        </Link>
        </p>
        { fullOrderDisplay }
        </Translator> 
    </div>
    </div>
  )
}
