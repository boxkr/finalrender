import React, {useEffect, useState} from 'react'
import {Link, useLocation} from "react-router-dom"
import "../css/order.css"

export default function Drink() {
  const location = useLocation()
  //gets the previous state
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
    placeholder.smallOrder['entree3'] = name;
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
    <div>
      <title>Drink Menu</title>
    <div className='centered-container'>
        <h1>Any Extras?</h1>
        <div className='top-level-item-render'>
          {items.map( (item) => {
              
              //we have grabbed the entire inventory, but we only want to render the sides on this particular page
              if(item.itemtype != 'etc'){
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
        <button>
          <Link to="/extra" state={neworder}>Previous</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
          <Link to="/finalizeOrder" state={neworder}>Next</Link>
        </button>
    </div>
    </div>
  )
}