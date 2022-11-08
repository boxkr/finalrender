import React, {useEffect, useState} from 'react'
import '../css/managerstyles.css';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';







export default function InventoryManagementPopup(props) {

    const handleClose=()=>{
        props.popCounterFunction(props.popupCounter+1);
    }

    const [fullInventory, setFullInventory] = useState([]);
    const [restockItem, setRestockItem] = useState("");
    const [restockAmount, setRestockAmount] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/Inventory")
            .then((response) => response.json())
            .then((data) => setFullInventory(data)); 
    }, []);

    const handleRestock=(e)=>{
        e.preventDefault();
        console.log("Restock called.","Item: "+restockItem,"Amount: "+restockAmount)

        //fetch post to /inventory
    }
    
    
    return (
        <div className="management-container">
            <Button onClick={handleClose}>Close</Button>
            <h1 className="management-header">Inventory Management</h1>
            <div className='restock-view'>
                <form>
                    <div className='restock-field'>
                        <label className='restock-text' >Item Name: </label>
                        <input value={restockItem} onChange={(e)=>{setRestockItem(e.target.value)}} type='text' id='item-name'/>
                    </div>
                    <div className='restock-field'>
                        <label className='restock-text' >Item Amount: </label>
                        <input value={restockAmount} onChange={(e)=>{setRestockAmount(e.target.value)}} type='text' id='item-amount'/>
                    </div>
                    <input onClick={handleRestock} type='submit' value="Submit Restock Request"/>

                </form>
            </div>
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
