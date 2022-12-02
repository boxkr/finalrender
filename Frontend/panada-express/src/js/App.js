import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import Login from "./Login";
import Location from "./Location";
import ManagerLogin from "./ManagerLogin";
import CreateAccount from "./CreateAccount";
import Landing from "./Landing";
import Size from "./Size";
import Side from "./Side";
import Side1 from "./Side1";
import Side2 from "./Side2";
import Entree from "./Entree";
import Entree1 from "./Entree1";
import Entree2 from "./Entree2";
import Entree3 from "./Entree3";
import Extra from "./Extra";
import Drink from "./Drink";
import FinalizeOrder from "./FinalizeOrder";
import Manager from "./Manager"
import RedirectPage from "./RedirectPage"

// export const contextContainer = React.createContext();

function App(props) {
  const [currentOrder, setCurrentOrder] = useState({
    size: "",
    price: 0,
    selectionHistory: [],
    numEntrees: 0,
    numSides: 0,
    sides: [],
    entrees: [],
    extra: "",
    userLanguage: 'en'
  });
  const [totalOrder, setTotalOrder] = useState({
    serverName: "",
    userID: "Guest",
    userLanguage: "en",
    orders: [],
    totalPrice: 0,
    userPoints: 0
  })
  return (
    <div className="App">
      {/* <contextContainer.Provider value = {{currentOrder: [currentOrder, setCurrentOrder]}}> */}
        <BrowserRouter>
            <Routes>
              <Route path='/' element = {
                <Landing 
                  // currentOrder = {currentOrder}
                  // setCurrentOrder = {() => this.setCurrentOrder()} 
                  totalOrder = {totalOrder}
                  setTotalOrder = {setTotalOrder}
                />
                }
              />
              <Route path='/login' element = {
                <Login 
                  // currentOrder = {currentOrder} 
                  // setCurrentOrder = {setCurrentOrder} 
                  totalOrder = {totalOrder}
                  setTotalOrder = {setTotalOrder}
                />
                } 
              />
              <Route path='/managerlogin' element = {
                <ManagerLogin 
                  // currentOrder = {currentOrder} 
                  // setCurrentOrder = {setCurrentOrder} 
                  totalOrder = {totalOrder}
                  setTotalOrder = {setTotalOrder}
                />
                } 
              />
              <Route path='/createaccount' element = {
                <CreateAccount 
                  // currentOrder = {currentOrder}
                  // setCurrentOrder = {setCurrentOrder}  
                  // totalOrder = {totalOrder}
                  // setTotalOrder = {setTotalOrder}
                />
                } 
              />
              <Route path='/manager' element = {
                <Manager 
                  // currentOrder = {currentOrder} 
                  // setCurrentOrder = {setCurrentOrder} 
                  // totalOrder = {totalOrder}
                  // setTotalOrder = {setTotalOrder}
                />
                } 
              />
              <Route path='/size' element = {
                <Size 
                  currentOrder = {currentOrder} 
                  setCurrentOrder = {setCurrentOrder} 
                  totalOrder = {totalOrder}
                  // setTotalOrder = {setTotalOrder}
                />
              }
              />
              <Route path='/side' element = {
                <Side 
                  currentOrder = {currentOrder} 
                  setCurrentOrder = {setCurrentOrder} 
                  // totalOrder = {totalOrder}
                  // setTotalOrder = {setTotalOrder}
                />
                }
              />
              <Route path='/entree' element = {
                <Entree 
                  currentOrder = {currentOrder} 
                  setCurrentOrder = {setCurrentOrder} 
                  // totalOrder = {totalOrder}
                  // setTotalOrder = {setTotalOrder}
                />
                }
              />
              <Route path='/extra' element = {
                <Extra 
                  currentOrder = {currentOrder} 
                  setCurrentOrder = {setCurrentOrder} 
                  // totalOrder = {totalOrder}
                  // setTotalOrder = {setTotalOrder}
                />
                }
              />
              {/* <Route path='/drink' element = {
                <Drink
                  currentOrder = {currentOrder}
                  setCurrentOrder = {setCurrentOrder} 
                  totalOrder = {totalOrder}
                  setTotalOrder = {setTotalOrder}
                />
                }
              /> */}
              <Route path='/finalizeOrder' element = {
                <FinalizeOrder
                  currentOrder = {currentOrder}
                  setCurrentOrder = {setCurrentOrder} 
                  totalOrder = {totalOrder}
                  setTotalOrder = {setTotalOrder}
                />
                }
              />
              {/* <Route path="/redirect" element={
                <RedirectPage
                  currentOrder = {currentOrder}
                  setCurrentOrder = {setCurrentOrder} 
                  totalOrder = {totalOrder}
                  setTotalOrder = {setTotalOrder}
                />
                }
              /> */}
              <Route path='/Location' element = {<Location />} />
            </Routes>
        </BrowserRouter>
      {/* </contextContainer.Provider> */}
    </div>
  );
}

export default App;
