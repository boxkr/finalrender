import React, { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
// import '../css/Size.css';
import Button from 'react-bootstrap/Button';
import '../css/Ordering.css'
import {Translator, Translate} from 'react-auto-translate';
import { TranslateContext } from 'react-auto-translate/lib/commonjs/translator';

export default function Size() {
    /**
     * These are state variables to hold the items from the api, the previous selected item, and our order object both large and small
     */
     const location = useLocation();
     const userLanguage = useState(useLocation().state);
     let previousOrderState = location.state;
     const [sizes, setSizes] = useState([]);
     const [selectedOption, setSelectedOption] = useState(null);
     const [lastSelectedButton, setLastUsedButton] = useState(null);
     const [orderState,setOrderState] = useState({currentSize: "", totalOrder: (previousOrderState == undefined || previousOrderState == null) ? [] : previousOrderState.totalOrder})
    

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
        let name = e.target.id;
        console.log(name,"Selected");
        let temp = orderState;
        temp.currentSize = name;
        temp.selectionHistory = [];
        temp.numEntrees = parseInt(e.target.getAttribute('numentrees'));
        temp.numSides = parseInt(e.target.getAttribute('numsides'));
        setOrderState(temp);
        setSelectedOption(name);
        console.log(orderState);
        console.log(sizes);
    }

    /**
     * Pushes this page onto the selectionHistory stack, which lets you know which page was last so that you can return to it
     * when you click the back button
     */
    const saveSelection = ()=>{
        let temp = orderState;
        temp.selectionHistory.push({"page": "/size", "selection": temp.currentSize})

        temp.numSides -= 1;

        setOrderState(temp);
        console.log(orderState)
    }
    
    

    //calls our api, gets the json response for all the sizes
    useEffect(() => {
        fetch("http://localhost:3000/api/Sizes")
            .then((response) => response.json())
            .then((data) => setSizes(data)); 
    }, []);
    orderState.language = userLanguage;
    //Dont ask me why this works but it does
    let lang = JSON.stringify(userLanguage)[2] + JSON.stringify(userLanguage)[3];
  return (
      <div className='centered-container'>
        <Translator
        from='en'
        to={lang}
        googleApiKey='AIzaSyDFSi6R48DY2waTTn0If0j8tkuqFCtSzHY'
        >
        <h1><Translate>Choose your size</Translate></h1> 
        
        <div className='top-level-item-render'>
            {/*This will create a element for every size so we can see it on the screen */}
            {sizes.map((size) => (
                <div id={size.name} numentrees={size.numentrees} numsides={size.numsides} className="item-button" onClick={handleItemAdd} key={size.id}>  
                    <p className='non-clickable'><Translate>{size.name}</Translate></p>
                    <p className='item-price non-clickable'>${size.price}</p>
                </div>
            ))}
        </div>
        { selectedOption &&
            <Link className='button-text' to="/side" onClick={saveSelection} state={orderState}><Button variant="primary">
                <Translate>Next</Translate></Button>
            </Link>
        }

        <br></br>
        <Link className='button-text' style={{ textDecoration: 'none' }} to="/"><Button variant="secondary">
            <Translate>Return to landing page</Translate></Button>
        </Link>
        </Translator>
    </div>
  )
}
