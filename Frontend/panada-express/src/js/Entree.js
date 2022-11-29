import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import "../css/order.css"
import Button from 'react-bootstrap/Button'
import '../css/Ordering.css'

export default function Entree() {

  /**
  * These are state variables to hold the items from the api, the previous selected item, and our order object
  */
  const [items, setItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [lastSelectedButton, setLastUsedButton] = useState(null);
  const [orderState, setOrderState] = useState(useLocation().state);
  const [nextPage, setNextPage] = useState('/redirect');

  /** 
     * HANDLE_ITEM_ADD
     * This function handles the item click, it highlights the selected item and adds it to the order object
    */
   const handleItemAdd = (e)=>{
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
    setSelectedOption(name);
  }

  /**
  * Pushes this page onto the selectionHistory stack, which lets you know which page was last so that you can return to it
  * when you click the back button
  */
  const saveSelection = ()=>{
    let temp = orderState;
    temp.selectionHistory.push({"page": "/entree", "selection": selectedOption})

    if (temp.numEntrees > 0) {
      temp.numEntrees -= 1;
    }

    setOrderState(temp);
    console.log(orderState)
  }

  /**
    * Pops the previous page off of the selectionHistory stack. Called when heading back to the previous page.
    */
  const removePreviousSelection = ()=>{
    let temp = orderState;
    temp.selectionHistory.pop();

    temp.numEntrees += 1;

    setOrderState(temp);
    console.log(orderState)
  }


  /* Logic for determining what the next page is depending on how many sides/entrees there are left to decide*/
  useEffect(() => {
    if (orderState.numEntrees == 0) {
      setNextPage("/extra");
    }
    let temp = orderState;
    temp.redirectDest = "/entree";
    setOrderState(temp);
    console.log(orderState)
  }, []);

  useEffect(() => {
    setOrderState(orderState);
    fetch(process.env.REACT_APP_BACKEND_URL + "/api/Inventory")
        .then((response) => response.json())
        .then((data) => setItems(data)); 
  }, []);

  return (
    <div className='centered-container'>
      <h1>Choose an entree</h1>
        <div className='top-level-item-render'>
          {items.map( (item) => {
              
              //we have grabbed the entire inventory, but we only want to render the sides on this particular page
              if(item.itemtype != 'entree'){
                return;
              }else{
                return (
                  <div id={item.name} className="item-button" onClick={handleItemAdd} key={item.id}>
                    <p className='non-clickable'>{item.name}</p>
                  </div>
                  )
              }
            })}
        </div>
        <p>
        <Link className='button-text' to={orderState.selectionHistory[orderState.selectionHistory.length - 1].page} onClick={removePreviousSelection} state={orderState}><Button variant="primary">
            Previous</Button>
        </Link>
        { selectedOption &&
          <Link className='button-text' to={nextPage} onClick={saveSelection} state={orderState}><Button variant="primary">
            Next</Button>
          </Link>
        }
        </p>
    </div>
  )
}
