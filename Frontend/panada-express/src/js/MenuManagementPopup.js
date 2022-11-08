import React, {useState, useEffect} from 'react'
import '../css/managerstyles.css';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';


export default function MenuManagementPopup(props) {

    const handleClose=()=>{
        props.popCounterFunction(props.popupCounter+1);
    }
    console.log(props);

    const [sizePrice,setSizePrice] = useState("");
    const [sizeName, setSizeName] = useState("");
    const [newItemName, setNewItemName] = useState("")
    const [newItemType, setNewItemType] = useState("")
    const [newItemCalories, setNewItemCalories] = useState("")
    const [newItemQuantity, setNewItemQuantity] = useState("")
    const [newItemWC,setNewItemWC] = useState("")  //wholesale cost
    const [currentSizes,setCurrentSizes] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/api/Sizes")
            .then((response) => response.json())
            .then((data) => setCurrentSizes(data)); 
    }, []);

    const handleSizeEditSubmit=(e)=>{
        e.preventDefault()
        console.log(sizeName,sizePrice)
    }
    const handleNewItem=(e)=>{
        e.preventDefault()
        console.log(newItemName,newItemType,newItemCalories,newItemQuantity,newItemWC)
    }
    return (
        <div className="management-container">
            <Button onClick={handleClose}>Close</Button>
            <h1 className='management-header'>Menu Management</h1>
            <div>
                <h2 className='restock-header'>Edit Size Price:</h2>
                <form>
                    <label className='restock-text'>Size Name: </label>
                    <input type='text' value={sizeName} onChange={(e)=>{setSizeName(e.target.value)}}/>
                    <label className='restock-text'>New Size Price:</label>
                    <input type='text' value={sizePrice} onChange={(e)=>{setSizePrice(e.target.value)}}/>
                    <input value="Submit Edit" type='submit' onClick={handleSizeEditSubmit}/>
                </form>
            </div>
            <div>
                <h2 className='restock-header'>Create a new item</h2>
                <form>
                    <label className='restock-text'>New Item Name: </label>
                    <input type='text' value={newItemName} onChange={(e)=>{setNewItemName(e.target.value)}}/>
                    <label className='restock-text'>New Item Type:</label>
                    <input type='text' value={newItemType} onChange={(e)=>{setNewItemType(e.target.value)}}/>
                    <label className='restock-text'>New Item Quantity:</label>
                    <input type='text' value={newItemQuantity} onChange={(e)=>{setNewItemQuantity(e.target.value)}}/>
                    <br/>
                    <label className='restock-text'>New Item Calories:</label>
                    <input type='text' value={newItemCalories} onChange={(e)=>{setNewItemCalories(e.target.value)}}/>
                    <label className='restock-text'>New Item Wholesale Cost:</label>
                    <input type='text' value={newItemWC} onChange={(e)=>{setNewItemWC(e.target.value)}}/>
                    <br/>
                    <input value="Create new item" type='submit' onClick={handleNewItem}/>
                </form>
            </div>
            {console.log(currentSizes)}
            <div className='sizes-view'>
                {currentSizes.map((size) => (
                    <div id={size.name} key={size.id}>
                        <p className='inventory-item'>{size.name}</p>
                        <p className='inventory-item'>{size.price}</p>
                    </div>
                ))}
            </div>
            
        </div>
    )
}
