import React, {useState, useEffect} from 'react'
import '../css/managerstyles.css';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import MenuManagementPopup from './MenuManagementPopup'
import InventoryManagementPopup from './InventoryManagementPopup'


export default function Manager() {

    
    const [menuPopupCounter, setMenuPopupCounter] = useState(1);
    const [inventoryPopupCounter, setInventoryPopupCounter] = useState(1);

    

    
    const handleMenuClick = ()=>{
        //default is 1 (odd) so closed at first. if we see it's clicked and odd, then we want to open the menu, else close it
        setMenuPopupCounter(menuPopupCounter+1);
    }

    const handleInventoryClick=()=>{
        setInventoryPopupCounter(inventoryPopupCounter+1);
    }
    
    

    return (

        
        <div className="container">
            <h1 className="welcome"> Welcome Manager! </h1>
            <br></br>
            <Button variant="primary" size="lg" onClick={handleMenuClick}>
                Menu Management
            </Button>
            {(menuPopupCounter % 2 == 0) ? <MenuManagementPopup popupCounter={menuPopupCounter} popCounterFunction={setMenuPopupCounter}/> : ""}
            <br></br>
            <Button variant="primary" size="lg" onClick={handleInventoryClick   }> {/*just need to add style with tailwind or bootstrap */}
                Inventory Management
            </Button>
            {(inventoryPopupCounter % 2 == 0) ? <InventoryManagementPopup popupCounter={inventoryPopupCounter} popCounterFunction={setInventoryPopupCounter}/> : ""}
            
        </div>
    )
}
