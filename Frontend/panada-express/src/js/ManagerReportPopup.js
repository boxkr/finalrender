import React, {useEffect, useState} from 'react'
import '../css/managerstyles.css';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';







export default function InventoryManagementPopup(props) {

    const handleClose=()=>{
        props.popCounterFunction(props.popupCounter+1);
    }
    
    const [updater,forceUpdate] = useState("");
    const [salesReportStartDate, setSalesReportStartDate] = useState("");
    const [salesReportEndDate, setSalesReportEndDate] = useState("");
    const [excessReportStartDate, setExcessReportStartDate] = useState("");
    const [excessReportEndDate,setExcessReportEndDate] = useState("");
    const [currentReport,setCurrentReport] = useState("");
    const [curInventory,setCurInventory] = useState([]);
    const [excessItems,setExcessItems] = useState([]);
    const [curInventoryHistory,setCurInventoryHistory] = useState([]);
    const [curOrderHistory,setCurOrderHistory] = useState([])

    const populateBasedOnState=(state)=>{

        
        return(
            <div className='centered'>
                <p className="restock-text">{state}</p>
                
                {state == 'restock' ? <div >
                    <h4 className='restock-header'>These items are below their minimum: </h4>
                    <div className='restock-view'>
                        {excessItems.length == 0 ? <p className='restock-text'>All items are up to stock</p> : ""}
                        {excessItems.map((item) => (
                            <div key={item.id}>
                                <p className='restock-text'>{item.name}</p>
                                <p className='restock-text'>Minimum: {item.minimum}</p>
                            </div>
                        ))}
                    </div>
                </div> : ""}
                {state == 'excess' ? <div>
                <p className='restock-text'>balls</p>
                </div> : ""}
                {state == 'sales' ? <div>
                    
                </div> : ""}
            </div>
            
            
        )
    }

    const handleSalesReportSubmit = (e)=>{

        e.preventDefault();
        console.log("salesReportSubmit");
        console.log(salesReportStartDate);
        console.log(salesReportEndDate);
        console.log(curOrderHistory)
        setCurrentReport("sales");

        //dictionary of entrees,sides,extras with inital value 0
        //get orderhistory, go through and find the first order with id salesReportStartDate
        //when that is seen, start going forward and d[name]+=1
        //display the dictionary to the screen
    }

    const handleExcessReportSubmit = (e)=>{
        e.preventDefault();
        console.log("excess submit")
        console.log(excessReportStartDate);
        console.log(excessReportEndDate);
        console.log(curInventoryHistory)
        setCurrentReport("excess");

        //get inventoryhistory, find first date index. mark the values of all the items at this spot
        //find the last end date index, mark the values of all the items at this spot
        //do division to find which ones didn't sell 10%
        //display those

    }

    const handleRestockReportSubmit = async (e)=>{
        e.preventDefault();
        console.log('restock submit');
        setCurrentReport('restock');

        //get a request of all the inventory items
        //from inventory, look at the quantities and compare with minimums
        let res = []
        for(let i =0; i < curInventory.length; i++){

            if(curInventory[i].minimum >= curInventory[i].quantity){
                res.push(curInventory[i]);
            }
        }
        setExcessItems(res);

    }

    useEffect(() => {
        fetch("http://localhost:3000/api/Inventory")
            .then((response) => response.json())
            .then((data) => setCurInventory(data));
    }, [updater]);

    return (
        <div className="management-container">
            <Button onClick={handleClose}>Close</Button>
            <h1 className="management-header">Reports</h1>
            <div className='restock-view'>
                <div className='report-container'>
                    <h2 className='restock-header'>Generate Sales Report</h2>
                    <form>
                        <label className='restock-text'>Start date:</label>
                        <input type='text' value={salesReportStartDate} onChange={(e)=>{setSalesReportStartDate(e.target.value)}}/>
                        <br></br>
                        <label className='restock-text'>End date:</label>
                        <input type='text' value={salesReportEndDate} onChange={(e)=>{setSalesReportEndDate(e.target.value)}}/>
                        <br></br>
                        <input value="Submit Edit" type='submit' onClick={handleSalesReportSubmit}/>
                    </form>
                </div>
                <div className='report-container'>
                    <h2 className='restock-header'>Generate Excess Report</h2>
                    <form>
                        <label className='restock-text'>Start date:</label>
                        <input type='text' value={excessReportStartDate} onChange={(e)=>{setExcessReportStartDate(e.target.value)}}/>
                        <br></br>
                        <label className='restock-text'>End date:</label>
                        <input type='text' value={excessReportEndDate} onChange={(e)=>{setExcessReportEndDate(e.target.value)}}/>
                        <br></br>
                        <input value="Submit Edit" type='submit' onClick={handleExcessReportSubmit}/>
                    </form>
                </div>
                <div className='report-container'>
                    <h2 className='restock-header'>Generate Restock Report</h2>
                    <Button onClick={handleRestockReportSubmit}>Generate</Button>
                </div>
            </div>
            <div className="report-view">
                {populateBasedOnState(currentReport)}
            </div>
            
        </div>
    )
}
