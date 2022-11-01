import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Landing from "./Landing";
import Size from "./Size";
import Side1 from "./Side1";
import Side2 from "./Side2";
import Entree1 from "./Entree1";
import Entree2 from "./Entree2";
import Entree3 from "./Entree3";
import Extra from "./Extra";
import Drink from "./Drink";
import FinalizeOrder from "./FinalizeOrder";

let welcome = "Welcome To Panda Express";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path='/' element = {<Landing />}/>
              <Route path='/login' element = {<Login />} />
              <Route path='/size' element = {<Size />} />
              <Route path='/side1' element = {<Side1 />} />
              <Route path='/side2' element = {<Side2 />} />
              <Route path='/entree1' element = {<Entree1 />} />
              <Route path='/entree2' element = {<Entree2 />} />
              <Route path='/entree3' element = {<Entree3 />} />
              <Route path='/extra' element = {<Extra />} />
              <Route path='/drink' element = {<Drink />} />
              <Route path='/finalizeOrder' element = {<FinalizeOrder />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;