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
    const [restockReportStartDate, setRestockReportStartDate] = useState("");
    const [restockReportEndDate, setRestockReportEndDate] = useState("");
    const [currentReport,setCurrentReport] = useState("");

    const populateBasedOnState=(state)=>{

        return(
        <p className="restock-text">{state}</p>
        )
    }

    const handleSalesReportSubmit = (e)=>{

        e.preventDefault();
        console.log("salesReportSubmit");
        console.log(salesReportStartDate);
        console.log(salesReportEndDate);
        setCurrentReport("sales");
    }

    const handleExcessReportSubmit = (e)=>{
        e.preventDefault();
        console.log("excess submit")
        console.log(excessReportStartDate);
        console.log(excessReportEndDate);
        setCurrentReport("excess");
    }

    const handleRestockReportSubmit = (e)=>{
        e.preventDefault();
        console.log('restock submit');
        console.log(restockReportStartDate);
        console.log(restockReportEndDate);
        setCurrentReport('restock');
    }
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
                    <form>
                        <label className='restock-text'>Start date:</label>
                        <input type='text' value={restockReportStartDate} onChange={(e)=>{setRestockReportStartDate(e.target.value)}}/>
                        <br></br>
                        <label className='restock-text'>End date:</label>
                        <input type='text' value={restockReportEndDate} onChange={(e)=>{setRestockReportEndDate(e.target.value)}}/>
                        <br></br>
                        <input value="Submit Edit" type='submit' onClick={handleRestockReportSubmit}/>
                    </form>
                </div>
            </div>
            <div className="inventory-view">
                {populateBasedOnState(currentReport)}
            </div>
            
        </div>
    )
}
