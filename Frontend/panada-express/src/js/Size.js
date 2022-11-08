import React, { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
// import '../css/Size.css';
import Button from 'react-bootstrap/Button';
import '../css/Ordering.css'


export default function Size() {
    
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
        let placeholder = order;
        placeholder.smallOrder['size'] = name;
        updateOrder(placeholder);
        

    }

    /**
     * This will tell us if we can continue. We don't want to continue on with no size selected.
     * Right now this just returns true or false, but in the future lets think about conditionally rendering the next button
     */
    const verifyValidContinue = ()=>{
        if(order == {}){
            console.log(false);
        }else{
            console.log(true);
        }
    }

    /**
     * These are state variables to hold the items from the api, the previous selected item, and our order object both large and small
     */
    const location = useLocation();
    let passedInOrder = location.state;
    const [sizes, setSizes] = useState([]);
    const [lastSelectedButton, setLastUsedButton] = useState(null);
    const [order,updateOrder] = useState({smallOrder: {}, largeOrder: (passedInOrder == undefined || passedInOrder == null) ? [] : passedInOrder.largeOrder})

    
    

    //calls our api, gets the json response for all the sizes
    useEffect(() => {
        fetch("http://localhost:3000/api/Sizes")
            .then((response) => response.json())
            .then((data) => setSizes(data)); 
    }, []);
    
  return (
    <div className='centered-container'>
        <h1>Choose your size</h1> 
        
        <div className='top-level-item-render'>
            {/*This will create a element for every size so we can see it on the screen */}
            {sizes.map((size) => (
                <div id={size.name} className="item-button" onClick={handleItemAdd} key={size.id}>
                    <p className='item-id non-clickable'>{size.id}</p>  
                    <p className='non-clickable'>{size.name}</p>
                    <p>{size.numSides}</p>
                    <p>{size.numEntrees}</p>
                    <p className='item-price non-clickable'>{size.price}</p>
                </div>
            ))}
        </div>
        <Link className='button-text' to="/side1"><Button variant="primary">
            Next</Button>
        </Link>

        <br></br>
        <Link className='button-text' style={{ textDecoration: 'none' }} to="/"><Button variant="secondary">
            Return to landing page</Button>
        </Link>
    </div>
  )
}
