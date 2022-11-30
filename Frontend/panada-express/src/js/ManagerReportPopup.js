import React, {useEffect, useState,} from 'react'
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
    const [excessReportEndDate,setExcessReportEndDate] = useState("noinput");
    const [currentReport,setCurrentReport] = useState("");
    const [curInventory,setCurInventory] = useState([]);
    const [excessItems,setExcessItems] = useState([]);
    const [restockItems,setRestockItems] = useState([]);
    const [curInventoryHistory,setCurInventoryHistory] = useState([]);
    const [curOrderHistory,setCurOrderHistory] = useState([])
    const [salesItems, setSalesItems] = useState({})

    const populateBasedOnState=(state)=>{

        
        return(
            <div className='centered'>
                {/*<p className="restock-text">{state}</p>*/}
                
                {state == 'restock' ? <div >
                    <h4 className='restock-header'>These items are below their minimum: </h4>
                    <div className='restock-view'>
                        {restockItems.length == 0 ? <p className='restock-text'>All items are up to stock</p> : ""}
                        {restockItems.map((item) => (
                            <div key={item.id}>
                                <p className='restock-text'>{item.name}</p>
                                <p className='restock-text'>Minimum: {item.minimum}</p>
                            </div>
                        ))}
                    </div>
                </div> : ""}
                {state == 'excess' ? <div>
                    
                    <h4 className='restock-header'>These items have sold less than 10%</h4>
                    <div className='restock-view'>
                        {excessItems.length == 0 ? <p className='restock-text'>All items have sold 10%</p> : ""}
                        {excessItems.map((item) => (
                            <div key={item.id}>
                                <p className='restock-text'>{item}</p>
                            </div>
                        ))}
                    </div>
                </div> : ""}
                {state == 'sales' ? <div>
                    <h4 className='restock-header'>These items have sold these amounts during the given time period</h4>
                    <div className='restock-view'>
                        {Object.keys(salesItems).map((item)=>(
                            <div key={item}>
                                <p className='restock-text'>{item}</p>
                                <p className='restock-text'>{salesItems[item]}</p>
                            </div>
                        ))}
                    </div>
                </div> : ""}
            </div>
            
            
        )
    }

    const handleSalesReportSubmit = async (e)=>{

        e.preventDefault();
        
        console.log("salesReportSubmit");
        console.log(salesReportStartDate);
        console.log(salesReportEndDate);
        console.log(curOrderHistory)
        if(salesReportStartDate == ""){
            alert("Enter a start date!")
            return
        }
        if(salesReportEndDate == ""){
            alert("Enter an end date!")
            return
        }
        setCurrentReport("sales");

        let startDateSnapshot;
        let endDateSnapshot;

        //get a snapshot of inventoryhistory at first instance of startdate
        console.log(salesReportStartDate);
        console.log(salesReportEndDate);
        let obj = {first: salesReportStartDate, second : "noinput"};
        await (fetch(process.env.REACT_APP_BACKEND_URL +"/api/InventoryHistoryStartDate",{method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify(obj)})
        .then((response) => response.json())
        .then((data) => (startDateSnapshot = data))); 


        //get a snapshot of inventoryhistory at last instance of enddate
        obj = {first: "noinput", second : salesReportEndDate};
        await (fetch(process.env.REACT_APP_BACKEND_URL +"/api/InventoryHistoryStartDate",{method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify(obj)})
        .then((response) => response.json())
        .then((data) => (endDateSnapshot = data)));

        console.log(startDateSnapshot);
        console.log(endDateSnapshot);


        //convert each to JSON so we can use it as an object, not a string
        console.log(startDateSnapshot[0]);
        let firstHit = ""
        for(let i = 0; i < startDateSnapshot[0].currentinventory.length; i++){
            if(startDateSnapshot[0].currentinventory[i] == "'"){

                firstHit+="\"";
            }else{
                firstHit+=startDateSnapshot[0].currentinventory[i];
            }
        }
        let secondHit = ""
        for(let i = 0; i < endDateSnapshot[0].currentinventory.length; i++){
            if(endDateSnapshot[0].currentinventory[i] == "'"){

                secondHit+="\"";
            }else{
                secondHit+=endDateSnapshot[0].currentinventory[i];
            }
        }
        console.log(firstHit,secondHit)
        let jsonFirst = JSON.parse(firstHit)
        let jsonSecond = JSON.parse(secondHit);
        console.log(jsonFirst,jsonSecond)


        //create a dictionary that is the subtracted start - end, this is how many times it has sold
        let differences = {};
        for(let item in jsonFirst){
            differences[item] = jsonFirst[item];
        }
        for(let item in jsonSecond){
            if(item in jsonFirst){
                differences[item]-=jsonSecond[item]
            }
        }

        console.log(differences)
        setSalesItems(differences)
    }

    const handleExcessReportSubmit = async (e)=>{

        
        e.preventDefault();
        if(excessReportStartDate == ""){
            alert("Enter a start date!");
            return;
        }
        console.log("excess submit")
        console.log(excessReportStartDate);
        //console.log(excessReportEndDate);
        //console.log(curInventoryHistory)
        setCurrentReport("excess");

        //get inventoryhistory, find first date index. mark the values of all the items at this spot
        let obj = {first: excessReportStartDate, second : "noinput"};
        console.log("START REQUEST")
        let fetcheddata;
        await (fetch(process.env.REACT_APP_BACKEND_URL +"/api/InventoryHistoryStartDate",{method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify(obj)})
        .then((response) => response.json())
        .then((data) => (fetcheddata = data))); 
        //console.log(curInventoryHistory)
        console.log("END REQUEST")
        setCurInventoryHistory(fetcheddata);
        if(fetcheddata[0] == undefined){
            let fullres=[]
            for(let i = 0; i<curInventory.length; i++){
                fullres.push(curInventory[i].name)
            }
            setExcessItems(fullres);

            return;
        }

        //We want to turn the currentinventory value into an object, we can do this with the json libary
        //first, need to edit because json.parse doesnt work with single quotes and those are in our string
        console.log(fetcheddata[0]);
        let firstHit = ""
        for(let i = 0; i < fetcheddata[0].currentinventory.length; i++){
            if(fetcheddata[0].currentinventory[i] == "'"){

                firstHit+="\"";
            }else{
                firstHit+=fetcheddata[0].currentinventory[i];
            }
        }
        //console.log(firstHit);  
        let jsonfirst = JSON.parse(firstHit);

        
        //now, we want to current inventory levels
        //from the current inventoryhistory entry, mark the values of all the items at this spot
        let curInventoryObj = {};
        for(let i =0; i < curInventory.length; i++){
            curInventoryObj[curInventory[i].name] = curInventory[i].quantity;
        }
        

        //finally, for each shared item in our current inventory and past inventory, check their levels
        //if one didnt sell 10%, put it in res
        let res = []
        for(let item in jsonfirst){

            if(item.toString() in curInventoryObj){

                let currentValue = curInventoryObj[item.toString]
                let oldValue = jsonfirst[item];
                //do division to find which ones didn't sell 10%
                if( (1 - (currentValue / oldValue)) < .1 ){
                    res.push(item);
                }
            }
            
        }

        console.log(res);
        setExcessItems(res);

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
        setRestockItems(res);

    }

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL +"/api/Inventory")
            .then((response) => response.json())
            .then((data) => setCurInventory(data));
        console.log('re-rendered')
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
