import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
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

function App(props) {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path='/' element = {<Landing />}/>
              <Route path='/login' element = {<Login />} />
              <Route path='/Location' element = {<Location />} />
              <Route path='/managerlogin' element = {<ManagerLogin />} />
              <Route path='/createaccount' element = {<CreateAccount />} />
              <Route path='/manager' element = {<Manager />} />
              <Route path='/size' element = {<Size />} />
              <Route path='/side' element = {<Side />} />
              <Route path='/entree' element = {<Entree />} />
              <Route path='/extra' element = {<Extra />} />
              <Route path='/drink' element = {<Drink />} />
              <Route path='/finalizeOrder' element = {<FinalizeOrder />} />
              <Route path="/redirect" element={<RedirectPage />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
