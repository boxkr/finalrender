import React, {useState, useEffect} from 'react'
import '../css/managerstyles.css';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';


export default function OrderHistoryPopup(props) {
    const [updater,forceUpdate] = useState(0);
    const [orderHistory,setOrderHistory] = useState([]);

    const handleClose=()=>{
        props.popCounterFunction(props.popupCounter+1);
    }

    const parsedOrderDetails=(details)=>{

        //big contrived thing to try and grab the size
        let tester = details;
        tester = tester.split(",");
        /*
        for(let thing in tester){
            thing = thing.join("")
            thing = thing.split("{");
            thing=thing.join("");
            thing = thing.split(",");
            let sizesplit = thing[0]
            //console.log(sizesplit)
            let itemssplit = thing.slice(1);
            sizesplit = sizesplit.split(":")
            sizesplit=sizesplit[1]
            //console.log(sizesplit)
            sizesplit = sizesplit.split("\"")
            //console.log(sizesplit)
            let size = "";
            for(let i = 0; i < sizesplit[1].length; i++){
                if(sizesplit[1][i] != "\\"){
                    size+=sizesplit[1][i];
                }else{
                    break;
                }
            }
            
            if(size == ""){
                size = "Invalid size"
            }
            //console.log(itemssplit)
            if(itemssplit.length >= 3 && itemssplit[2].includes("Size")){
                console.log("multi-order")
            }
        }
       
        */
        return details;
    }
    useEffect(()=>{
        fetch(process.env.REACT_APP_BACKEND_URL +"/api/OrderHistoryLast")
            .then((response) => response.json())
            .then((data) => setOrderHistory(data))
            .then(()=>console.log(orderHistory));
    },[updater])

    return(
     
        <div className="management-container">
            <title>Order History</title>
            <Button onClick={handleClose}>Close</Button>
            <h1 className='management-header'>Order History</h1>
            <h4 className='management-header'>Currently viewing the last 10 orders</h4>
            <div className="orderhistory-container">
                {orderHistory.map((order) => (
                        <div className='order-card' id={order.id} key={order.id}>
                            <p className='order-item'>{order.date}</p>
                            <p className='order-item'>{order.customername}</p>
                            <p className='order-item'>{parsedOrderDetails(order.orderdetails)}</p>
                            <p className='order-item'>{order.totalprice}</p>
                        </div>
                    ))}
            </div>
        </div>
    )
}
