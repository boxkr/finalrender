import React from 'react'
import '../css/managerstyles.css';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';


const AdjustPrice=()=>{


    return(
        <div>
            <h1>Adjust size prices placeholder</h1>
        </div>
    )
}

const AddNewItem=()=>{

    return(
        <div>
            <h1>Add a new item placeholder</h1>
        </div>
    )
}
const CurrentMenu=()=>{

    return(
        <div>
            <h1>Placeholder for current menu map</h1>
        </div>
    )
}
export default function MenuManagementPopup(props) {

    const handleClose=()=>{
        props.popCounterFunction(props.popupCounter+1);
    }
    console.log(props);

    
    return (
        <div className="management-container">
            <Button onClick={handleClose}>Close</Button>
            <h1 className='management-header'>Menu Management</h1>
            <AdjustPrice/>
            <AddNewItem/>
            <CurrentMenu/>
        </div>
    )
}
