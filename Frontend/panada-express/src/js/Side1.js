import React, {useEffect, useState} from 'react'
import { Link, useLocation } from "react-router-dom"
import "../css/order.css"
export default function Side1() {
  
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
    placeholder.smallOrder['side'] = name;
    updateOrder(placeholder);
    

  }

  //this location function lets us grab the state we passed over from sizes.js so we can persist the order
  const location = useLocation()
  let order = location.state
  console.log("current order",order)
  
  /**
     * These are state variables to hold the items from the api, the previous selected item, and our order object
  */
  const [sides, setSides] = useState([]);
  const [lastSelectedButton, setLastUsedButton] = useState(null);
  const [neworder,updateOrder] = useState({})
  
  useEffect(() => {
    updateOrder(order);
    fetch("http://localhost:3000/api/Inventory")
        .then((response) => response.json())
        .then((data) => setSides(data)); 
  }, []);


  return (
    
    <div>
        <h1>Choose your 1st side</h1>
        <div className='top-level-item-render'>
            {console.log(sides)}
            {sides.map( (side) => {
              
              //we have grabbed the entire inventory, but we only want to render the sides on this particular page
              if(side.itemtype != 'side'){
                return;
              }else{
                return (
                  <div id={side.name} className="item-button" onClick={handleItemAdd} key={side.id}>
                    <p className='item-id non-clickable'>{side.id}</p>  
                    <p className='non-clickable'>{side.name}</p>
                    <p>{side.numSides}</p>
                    <p>{side.numEntrees}</p>
                    <p className='item-price non-clickable'>{side.price}</p>
                  </div>
                  )
              }
            })}
              
        </div>
        <button>
            <Link to="/size" state={neworder}>Previous</Link>
        </button>
        <button> {/*just need to add style with tailwind or bootstrap */}
            <Link to="/side2" state={neworder}>Next</Link>
        </button>
    </div>
  )
}
