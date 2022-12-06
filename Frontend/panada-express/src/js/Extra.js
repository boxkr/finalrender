import React, {useEffect, useState} from 'react'
import {Link, useLocation} from "react-router-dom"
import "../css/order.css"
import Button from 'react-bootstrap/Button'
import '../css/Ordering.css'
import {Translator, Translate} from 'react-auto-translate';
import { TranslateContext } from 'react-auto-translate/lib/commonjs/translator';

export default function Extra(props) {

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
  const [nextPage, setNextPage] = useState("/finalizeOrder");

  //set obj for re-rendering
  let obj = props.currentOrder;

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
    setSelectedOption(name);
  }

  useEffect(() =>{
    props.setCurrentOrder(obj);
    console.log(props.currentOrder);
  }, [selectedOption]) 

  /**
  * Pushes this page onto the selectionHistory stack, which lets you know which page was last so that you can return to it
  * when you click the back button
  */
  const saveSelection = ()=>{
    //currently only takes 1 extra item
    let temp = props.currentOrder;
    temp.selectionHistory.push({"page": "/extra", "selection": selectedOption})
    temp.extra = selectedOption;
    props.setCurrentOrder(temp);
  }

  /**
    * Pops the previous page off of the selectionHistory stack. Called when heading back to the previous page.
    */
  const removePreviousSelection = ()=>{
    let temp = props.currentOrder;
    temp.selectionHistory.pop();

    temp.entrees.pop();
    props.setCurrentOrder(temp);
    console.log(props.currentOrder);
  }

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL +"/api/Inventory")
        .then((response) => response.json())
        .then((data) => setItems(data)); 
  }, []);

  console.log(obj);
  return (
    <div>
      <title>Extra</title>
    <div className='centered-container'>
      <Translator
      to={props.currentOrder.userLanguage}
      from='en'
      googleApiKey='AIzaSyDFSi6R48DY2waTTn0If0j8tkuqFCtSzHY'
      >
        <h1><Translate>Any Extras?</Translate></h1>
        <div className='top-level-item-render'>
          {items.map( (item) => {
              
              //we have grabbed the entire inventory, but we only want to render the sides on this particular page
              if(item.itemtype != 'etc'){
                return;
              }else{
                return (
                  <div id={item.name} className="item-button" onClick={handleItemAdd} key={item.id}>
                    <p className='non-clickable'><Translate>{item.name}</Translate></p>
                  </div>
                  )
              }
            })}
        </div>
        <p>
        <Link className='button-text' to={obj.selectionHistory[obj.selectionHistory.length - 1].page} onClick={removePreviousSelection}><Button variant="primary">
            <Translate>Previous</Translate></Button>
        </Link>
        { selectedOption &&
          <Link className='button-text' to={nextPage} onClick={saveSelection}><Button variant="primary">
            <Translate>Next</Translate></Button>
          </Link>
        }
        </p>
    </Translator>
    </div>
    </div>
  )
}
