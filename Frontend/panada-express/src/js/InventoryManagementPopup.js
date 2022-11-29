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
    const [updater,forceUpdate] = useState("");
    useEffect(() => {
        fetch(process.env.BACKEND_URL +"/api/Inventory")
            .then((response) => response.json())
            .then((data) => setFullInventory(data)); 
    }, [updater]);

    const handleRestock= async (e)=>{
        e.preventDefault();
        console.log("Restock called.","Item: "+restockItem,"Amount: "+restockAmount)

        //first we need to find all the relevant information for the searched item
        let found = false;
        let quan = 0;
        let id = 0;
        let type = "";
        let calories = 0;
        let wc = 0;
        let mn = 0;
        for(let i = 0; i < fullInventory.length; i++){
            if(fullInventory[i].name == restockItem){
                found = true;
                id = fullInventory[i].id;
                type= fullInventory[i].itemtype;
                calories=fullInventory[i].calories;
                quan = fullInventory[i].quantity;
                wc = fullInventory[i].wholesalecost;
                mn = fullInventory[i].minimum;
                break;
            }
        }

        if(found == false){
            alert("Item not found!");
            return;
        }
        console.log(restockAmount);
        if(!restockAmount){
            alert("Please enter a value!")
            return;
        }
        if(quan + parseInt(restockAmount) < 0){
            alert("Can't have negative stock!")
            return;
        }
        //now we should have all the values, so we can send the patch call
        //fetch put to /inventory, we hit it with a object of { Name, ItemType, Calories, Quantity, WholesaleCost, Minimum }
        let newamount = (quan+parseInt(restockAmount));
        let obj = {ID: id, Name: restockItem, ItemType: type, Calories: calories, Quantity: newamount, WholesaleCost: wc, Minimum: mn}
        console.log(obj);
        let res = await fetch(process.env.BACKEND_URL +"/api/Inventory",{method: 'PUT',headers: {'Content-Type': 'application/json'},body: JSON.stringify(obj)})
        console.log(JSON.stringify(obj))
        console.log("completed",res);

        //interesting footnote, react actually wont re-render unless this state value is different than what it was before.
        //to get around this, we need a random variable
        forceUpdate(Math.random())
        alert("Done with stock update");

    }
    
    console.log(fullInventory)
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
