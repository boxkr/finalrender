import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import "../css/order.css"
import Button from 'react-bootstrap/Button'
import '../css/Ordering.css'

export default function Side(props) {
  /**
     * These are state variables to hold the items from the api, the previous selected item, and our order object
  */
  //for populating page
  const [items, setItems] = useState([]);
  //for updating current order
  const [selectedOption, setSelectedOption] = useState(null);
  //for UI
  const [lastSelectedButton, setLastUsedButton] = useState(null);
  //for navigation
  const [nextPage, setNextPage] = useState("/side");

  //set obj for re-rendering
  let obj = props.currentOrder;

  /** 
     * HANDLE_ITEM_ADD
     * This function handles the item click, it highlights the selected item and adds it to the order object
    */
  const handleItemAdd = (e)=>{
    //if its not the first time, we want to reset the color on the last selected item to prepare for the new selection
    if (lastSelectedButton != null) {
        lastSelectedButton.target.className="item-button"
    }

    //we want to add the selected class to the new currently selected item
    if (e != lastSelectedButton) {
        //console.log('adding')
        e.target.className+=" item-button-selected"
    }
    
    //save the last used button in our state
    setLastUsedButton(e);

    //Grab the name, update order with that item
    let name = e.target.id;
    setSelectedOption(name);
  }
  
  //maybe we might not need this
  useEffect(() =>{
    props.setCurrentOrder(obj);
    console.log(props.currentOrder);
  }, [selectedOption]) 

  /**
  * Pushes this page onto the selectionHistory stack, which lets you know which page was last so that you can return to it
  * when you click the back button
  * Also adds the selected side (only when you press next)
  */
  const saveSelection = ()=>{
      let temp = props.currentOrder;
      temp.selectionHistory.push({"page": "/side", "selection": selectedOption})
      temp.sides.push(selectedOption);

      if (temp.numSides == 0) {
        temp.numEntrees -= 1;
      } else {
        temp.numSides -= 1;
      }

      props.setCurrentOrder(temp);
      console.log(props.currentOrder);
  }

  /**
    * Pops the previous page off of the selectionHistory stack. Called when heading back to the previous page.
    */
  const removePreviousSelection = ()=>{
    let temp = props.currentOrder;
    temp.selectionHistory.pop();
    temp.sides.pop(); //possibly not

    temp.numSides += 1;

    props.setCurrentOrder(temp);
    console.log(props.currentOrder);
  }

  /* Logic for determining what the next page is depending on how many sides/entrees there are left to decide*/
  useEffect(() => {
    if (props.currentOrder.numSides == 0) {
      setNextPage("/entree");
    }
    // let temp = props.currentOrder;
    // temp.redirectDest = "/side";
    // setOrderState(temp);
    // console.log(orderState)
  }, []);
  
  useEffect(() => {
    fetch("http://localhost:3000/api/Inventory")
        .then((response) => response.json())
        .then((data) => setItems(data)); 
  }, []);

  return (
    <div className = 'centered-container'>
        <h1>Choose a side</h1>
        <div className='top-level-item-render'>
            {items.map( (item) => {
              
              //we have grabbed the entire inventory, but we only want to render the sides on this particular page
              if(item.itemtype != 'side'){
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
        
        <Link className='button-text' to={obj.selectionHistory[obj.selectionHistory.length - 1].page} onClick={removePreviousSelection}><Button variant="primary">
            Previous</Button>
        </Link>
        { selectedOption &&
          <Link className='button-text' to={nextPage} onClick={saveSelection}><Button variant="primary">
            Next</Button>
          </Link>
        }
        {/* <Button onClick={saveSelection}>Hi</Button>
        <Button onClick={removePreviousSelection}>Bye</Button> */}
        </p>
    </div>
  )
}