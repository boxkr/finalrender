import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom"
// import '../css/Size.css';
import Button from 'react-bootstrap/Button';
import '../css/Ordering.css'
import {Translator, Translate} from 'react-auto-translate';
import { TranslateContext } from 'react-auto-translate/lib/commonjs/translator';

export default function Size(props) {
    
    /**
     * These are state variables to hold the items from the api, the previous selected item, and our order object both large and small
     */
    //for populating page
    const [sizes, setSizes] = useState([]);
    //for updating current order
    const [selectedOption, setSelectedOption] = useState(null);
    //for UI
    const [lastSelectedButton, setLastUsedButton] = useState(null);

    //  const {currentOrder} = useContext(contextContainer)
    //  const [stateCurrentOrder, setSCO] = currentOrder;

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
            e.target.className+=" item-button-selected"
        }
        
        //save the last used button in our state
        setLastUsedButton(e);
        let _size = e.target.id;
        let _price = parseFloat(e.target.getAttribute('price'));
        // let _selectionHistory = [];
        let _numEntrees = parseInt(e.target.getAttribute('numentrees'));
        let _numSides = parseInt(e.target.getAttribute('numsides'));

        setSelectedOption(_size);
        
        let temp = props.currentOrder;
        temp.size = _size;
        temp.price = _price;
        temp.selectionHistory.push({"page": "/size", "selection": _size});
        temp.numEntrees = _numEntrees;
        temp.numSides = _numSides;
        temp.userLanguage = props.totalOrder.userLanguage;
        props.setCurrentOrder(temp);
    }

    useEffect(() =>{
        console.log(props.currentOrder); 
        // console.log(props.totalOrder.userID)
        console.log(props.totalOrder);
        //re-renders this useEffect function every time selectedOption is altered
    }, [selectedOption]);

    /**
     * Pushes this page onto the selectionHistory stack, which lets you know which page was last so that you can return to it
     * when you click the back button
     */
    const saveSelection = ()=>{
        props.currentOrder.numSides -= 1;
        console.log(props.currentOrder);
    }

    //calls our api, gets the json response for all the sizes
    useEffect(() => {
        console.log(process.env.REACT_APP_BACKEND_URL+"/api/Sizes")
        fetch(process.env.REACT_APP_BACKEND_URL+"/api/Sizes")
            .then((response) => response.json())
            .then((data) => setSizes(data)); 
    }, []);
    // orderState.language = userLanguage;
    //Dont ask me why this works but it does
    // let lang = JSON.stringify(userLanguage)[2] + JSON.stringify(userLanguage)[3];
  return (
    <div>
    <title>Choose a size!</title>
      <div className='centered-container'>
        <Translator
        from='en'
        to={props.totalOrder.userLanguage}
        googleApiKey='AIzaSyDFSi6R48DY2waTTn0If0j8tkuqFCtSzHY'
        >
        <h1><Translate>Choose your size</Translate></h1> 
        
        <div className='top-level-item-render'>
            {/*This will create a element for every size so we can see it on the screen */}
            {sizes.map((size) => (

                <div id={size.name} numentrees={size.numentrees} numsides={size.numsides} price={size.price} className="item-button" onClick={handleItemAdd} key={size.id}>  
                    <p className='non-clickable'><Translate>{size.name}</Translate></p>

                    <p className='item-price non-clickable'>${size.price.toFixed(2)}</p>
                </div>
            ))}
        </div>
        { selectedOption &&
            <Link className='button-text' to="/side" onClick={saveSelection}><Button variant="primary">
                <Translate>Next</Translate></Button>
            </Link>
        }
        {/* state={orderState} */}
        <br></br>
        <Link className='button-text' style={{ textDecoration: 'none' }} to="/"><Button variant="secondary">
            <Translate>Return to landing page</Translate></Button>
        </Link>
        </Translator>
    </div>
    </div>
  )
}
