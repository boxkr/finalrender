import React, { useEffect, useState } from 'react'
import { Link, } from "react-router-dom"
import "../css/order.css"
import Button from 'react-bootstrap/Button'
import '../css/Ordering.css'
import {Translator, Translate} from 'react-auto-translate';
import { TranslateContext } from 'react-auto-translate/lib/commonjs/translator';

export default function Entree(props) {

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
  const [nextPage, setNextPage] = useState("/entree");

  const [refresher, setRefresh] = useState(Math.random());
  //set obj for re-rendering
  let obj = props.currentOrder;

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

  useEffect(() =>{
    props.setCurrentOrder(obj);
    console.log(props.currentOrder);
  }, [selectedOption,props.currentOrder, props.currentOrder.selectionHistory]) 

  /**
  * Pushes this page onto the selectionHistory stack, which lets you know which page was last so that you can return to it
  * when you click the back button
  */
  const saveSelection = ()=>{
    let temp = props.currentOrder;
    temp.selectionHistory.push({"page": "/entree", "selection": selectedOption})
    temp.entrees.push(selectedOption)
    
    if (temp.numEntrees > 0){
      temp.numEntrees -= 1;
    }
    //without this the plate and bigger plate would take much more entrees
    if (temp.numEntrees == 0){
      setNextPage("/extra");
    }

    props.setCurrentOrder(temp);
    // console.log(props.currentOrder);
    window.scrollTo({top:0, left:0, behavior: 'smooth'});
    document.getElementById(selectedOption).className = "item-button";
  }
  
  /**
    * Pops the previous page off of the selectionHistory stack. Called when heading back to the previous page.
    */
  const removePreviousSelection = ()=>{
    let temp = props.currentOrder;
    temp.selectionHistory.pop();

    temp.numEntrees += 1;

    if(temp.entrees.length != 0){
      temp.entrees.pop()
    }
    if(temp.sides.length != 0){
      temp.sides.pop();
    }
    props.setCurrentOrder(temp);
    setRefresh(Math.random());
    console.log(props.currentOrder);
    console.log(obj.selectionHistory[obj.selectionHistory.length - 1].page)

  }


  /* Logic for determining what the next page is depending on how many sides/entrees there are left to decide*/
  //without this the bowl takes 2 entrees
  useEffect(() => {
    if (props.currentOrder.numEntrees <= 0) {
      setNextPage("/extra");
      console.log("changed to extra");
    }
  }, []);

  useEffect(() => {
    // setOrderState(orderState);
    fetch("http://localhost:3000/api/Inventory")
        .then((response) => response.json())
        .then((data) => setItems(data)); 
  }, []);

  const pictureDict = {"Honey Sesame Chicken" : "https://s3.amazonaws.com/panda-express-international/Canada/HSC_CA.jpg", "Orange Chicken" : "https://s3.amazonaws.com/panda-express-international/Menu/thumbnails/grid_OrangeChicken.jpg",
  "Shanghai Angus Steak" : "https://s3.amazonaws.com/panda-express-international/Canada/bpasca.jpg", "String Bean Chicken Breast" : "https://s3.amazonaws.com/panda-express-international/Menu/thumbnails/grid_StringBeanChicken.jpg", 
  "SweetFire Chicken Breast" : "https://s3.amazonaws.com/panda-express-international/Menu/thumbnails/grid_SweetFireChicken.jpg", "Kung Pao Chicken " : "https://s3.amazonaws.com/panda-express-international/Menu/thumbnails/grid_KungPaoChicken.jpg", 
  "Mushroom Chicken" : "https://s3.amazonaws.com/panda-express-international/Menu/thumbnails/grid_MushroomChicken.jpg", "Black Pepper Chicken" : "https://s3.amazonaws.com/panda-express-international/Menu/thumbnails/grid_BlackPepperChicken.jpg", 
  "Grilled Teriyaki Chicken" : "https://s3.amazonaws.com/panda-express-international/Menu/thumbnails/grid_TeriyakiChicken.jpg","Broccoli Beef" : "https://s3.amazonaws.com/panda-express-international/Menu/thumbnails/grid_BroccoliBeef.jpg", 
  "Beijing Beef " : "https://s3.amazonaws.com/panda-express-international/Menu/thumbnails/grid_BeijingBeef.jpg", "Honey Walnut Shrimp" : "https://s3.amazonaws.com/panda-express-international/Menu/thumbnails/grid_HoneyWalnutShrimp.jpg"}

  return (
    <div>
      <title>Entree</title>
    <div className='centered-container'>
      <Translator
      to={props.currentOrder.userLanguage}
      from='en'
      googleApiKey='AIzaSyDFSi6R48DY2waTTn0If0j8tkuqFCtSzHY'
      > 
      <h1><Translate>Choose an entree</Translate></h1>
        <div className='top-level-item-render'>
          {items.map( (item) => {
              //we have grabbed the entire inventory, but we only want to render the sides on this particular page
              if(item.itemtype != 'entree'){
                return;
              }else{
                return (
                  <div id={item.name} className="item-button" onClick={handleItemAdd} key={item.id}>
                    <p className='non-clickable'><Translate>{item.name}</Translate></p>
                    <img className='non-clickable entree-picture' src={pictureDict[item.name]}/>
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
          <Link className='button-text' to={nextPage} onClick={saveSelection}>
              <Button variant="primary">
                <Translate>Next</Translate>
              </Button>
          </Link>
        }
        </p>
        </Translator> 
    </div>
    </div>
  )
}
