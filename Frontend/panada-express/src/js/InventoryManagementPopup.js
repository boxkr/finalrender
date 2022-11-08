import React, {useEffect, useState} from 'react'
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



export default function InventoryManagementPopup(props) {

    const handleClose=()=>{
        props.popCounterFunction(props.popupCounter+1);
    }

    const [fullInventory, setFullInventory] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/api/Inventory")
            .then((response) => response.json())
            .then((data) => setFullInventory(data)); 
    }, []);

    
    console.log(fullInventory);
    
    return (
        <div className="management-container">
            <Button onClick={handleClose}>Close</Button>
            <h1 className="management-header">Inventory Management</h1>
            <RestockInventory/>
            <div className="inventory-view">
                {fullInventory.map((item) => (
                    <div id={item.name} key={item.id}>
                        <p className='inventory-item'>{item.name}</p>
                        <p className='inventory-item'>{item.quantity}</p>
                    </div>
                ))}
            </div>
            
        </div>
    )
}
