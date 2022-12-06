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
    const [updater,forceUpdate] = useState(0);
    const [currentInventory, setCurrentInventory] = useState([])
    const [delItem, setDelItem] = useState("")

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL +"/api/Sizes")
            .then((response) => response.json())
            .then((data) => setCurrentSizes(data));
        fetch(process.env.REACT_APP_BACKEND_URL +"/api/Inventory")
            .then((response) => response.json())
            .then((data)=>setCurrentInventory(data))
    }, [updater]);

    const handleSizeEditSubmit= async (e)=>{
        e.preventDefault()
        console.log(sizeName,sizePrice)
        //First we want to find the size we're looking for, and get its information
        let found = false;
        let id = 0;
        let numsides = 0;
        let numentrees = 0;
        let price = 0;
        for(let i = 0; i < currentSizes.length; i++){

            if(currentSizes[i].name == sizeName){
                found = true
                numsides = currentSizes[i].numsides;
                numentrees=currentSizes[i].numentrees;
                price=currentSizes[i].price;
                id=currentSizes[i].id;


            }
        }

        if(found == false){
            alert("Size not found!")
            return
        }
        if(!sizePrice || !(parseInt(sizePrice))){
            alert("Enter a new price!")
            return
        }
        
        if(parseInt(sizePrice) < 0){
            alert("New Price can't be less than 0!")
            return;
        }
        //send a patch to /sizes to change the price
        //object in the form { ID, Name, NumSides, NumEntrees, Price }
        let obj = {"ID" : id, "Name" : sizeName, "NumSides" : numsides, "NumEntrees" : numentrees, "Price" : sizePrice}
        let res = await fetch(process.env.REACT_APP_BACKEND_URL +"/api/Sizes",{method: 'PUT',headers: {'Content-Type': 'application/json'},body: JSON.stringify(obj)})
        forceUpdate(Math.random());
        console.log("complete",res)
        alert("Finished editing size");
        
    }
    const handleNewItem= async (e)=>{
        e.preventDefault()
        console.log(newItemName,newItemType,newItemCalories,newItemQuantity,newItemWC)

        //we want to create a new item
        //all we need to do is create an object with the given information and send to post
        //{ Name, ItemType, Calories, Quantity, WholesaleCost, Minimum }
        let obj = {"Name" : newItemName, "ItemType" : newItemType, "Calories" : parseInt(newItemCalories), "Quantity" : parseInt(newItemQuantity), "WholesaleCost" : parseInt(newItemWC), "Minimum" : 0}
        let res = await fetch(process.env.REACT_APP_BACKEND_URL +"/api/Inventory",{method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify(obj)});
        forceUpdate(Math.random())
        console.log("complete",res);
        alert("Added "+newItemName);
    }
    
    const handleDelete=async(e)=>{

        e.preventDefault()
        console.log(delItem)
        
        //we want to delete the item we typed
        //first, we need to find it's ID
        let found = false;
        let id = 0;
        for(let i = 0; i < currentInventory.length; i++){

            if(delItem == currentInventory[i].name){
                found = true;
                id = currentInventory[i].id
            }
        }
        if(found == false){
            alert("Trying to delete an item that doesn't exist!");
        }

        //to delete, all we have to do is send a delete fetch to "/Inventory/:id"
        let url = process.env.REACT_APP_BACKEND_URL +"/api/Inventory" + "/"+id.toString();
        let obj = {params: {id: id}};
        let res = await fetch(url,{method: 'DELETE',headers: {'Content-Type': 'application/json'},body: JSON.stringify(obj)});
        console.log("complete",res)
        alert("Finished deleting "+delItem);

    }

    console.log(currentSizes)
    console.log(currentInventory)

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
            <div>
                <h2 className='restock-header'>Delete an Item</h2>
                    <form>
                        <label className='restock-text'>Item to delete: </label>
                        <input type='text' value={delItem} onChange={(e)=>{setDelItem(e.target.value)}}/>
                        <input value="Delete Item" type='submit' onClick={handleDelete}/>
                    </form>
            </div>
            {console.log(currentSizes)}
            <div className='sizes-view'>
                {currentSizes.map((size) => (
                    <div className='size-card' id={size.name} key={size.id}>
                        <p className='inventory-item'>{size.name}</p>
                        <p className='inventory-item'>{size.price}</p>
                    </div>
                ))}
            </div>
            
        </div>
    )
}
