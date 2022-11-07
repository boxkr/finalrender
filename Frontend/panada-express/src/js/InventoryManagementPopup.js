import React from 'react'
import '../css/managerstyles.css';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';



const RestockInventory=()=>{
    return(
        <div>
            <h1>Restock Inventory placeholder</h1>
        </div>
    )
}

const ViewInventory=()=>{
    return(
        <div>
            <h1>Placeholder for inventory view</h1>
        </div>
    )
}

export default function InventoryManagementPopup(props) {

    const handleClose=()=>{
        props.popCounterFunction(props.popupCounter+1);
    }
    console.log(props);
    
    return (
        <div className="management-container">
            <Button onClick={handleClose}>Close</Button>
            <h1 className="management-header">Inventory Management</h1>
            <RestockInventory/>
            <ViewInventory/>
        </div>
    )
}
