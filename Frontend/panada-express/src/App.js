import logo from './logo.svg';
import './App.css';
let x = "this is a variable";
function App() {

  //createVariables();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {x}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          dont Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
