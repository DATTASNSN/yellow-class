import logo from './logo.svg';
import './App.css';
import Pictures from './Components/Pictures';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Photo Feed
        </h1>
        <Pictures />
      </header>
    </div>
  );
}

export default App;
