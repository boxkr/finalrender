import React, {useEffect, useState} from 'react'
import {Link, useLocation} from "react-router-dom"
import "../css/order.css"
import Button from 'react-bootstrap/Button'
import '../css/Ordering.css'

export default function Entree1() {
  const location = useLocation()
  let order = location.state
  console.log(order)

  /** 
     * HANDLE_ITEM_ADD
     * This function handles the item click, it highlights the selected item and adds it to the order object
    */
   const handleItemAdd = (e)=>{
    //console.log(e.target.id);
    //console.log(e.target)

    //if its not the first time, we want to reset the color on the last selected item to prepare for the new selection
    if(lastSelectedButton != null){
        lastSelectedButton.target.className="item-button"
    }

    //we want to add the selected class to the new currently selected item
    if(e != lastSelectedButton){
        //console.log('adding')
        e.target.className+=" item-button-selected"
    }
    
    //save the last used button in our state
    setLastUsedButton(e);

    //Grab the name, update order with that item
    let name = e.target.id;
    console.log(name,"Selected");
    let placeholder = order;
    placeholder.smallOrder['entree1'] = name;
    updateOrder(placeholder);
    

  }

  /**
  * These are state variables to hold the items from the api, the previous selected item, and our order object
  */
  const [items, setItems] = useState([]);
  const [lastSelectedButton, setLastUsedButton] = useState(null);
  const [neworder,updateOrder] = useState({})

  useEffect(() => {
    updateOrder(order);
    fetch("http://localhost:3000/api/Inventory")
        .then((response) => response.json())
        .then((data) => setItems(data)); 
  }, []);

  return (
    <div className='centered-container'>
        <h1>Choose your 1st Entree</h1>
        <div className='top-level-item-render'>
          {items.map( (item) => {
              
              //we have grabbed the entire inventory, but we only want to render the sides on this particular page
              if(item.itemtype != 'entree'){
                return;
              }else{
                return (
                  <div id={item.name} className="item-button" onClick={handleItemAdd} key={item.id}>
                    <p className='item-id non-clickable'>{item.id}</p>  
                    <p className='non-clickable'>{item.name}</p>
                    <p>{item.numSides}</p>
                    <p>{item.numEntrees}</p>
                    <p className='item-price non-clickable'>{item.price}</p>
                  </div>
                  )
              }
            })}
        </div>
        <p>
        <Link className='button-text' to="/side2"><Button variant="primary">
            Previous</Button>
        </Link>
        <Link className='button-text' to="/entree2"><Button variant="primary">
            Next</Button>
        </Link>
        </p>
    </div>
  )
}
