import logo from './logo.svg';
import './App.css';
import Pictures from './Components/Pictures';

function App() {

  return (
    <div className="App">
      <header className="App-header">        
        <h1>
          Photo Feed
        </h1>
        <Pictures />
      </header>
    </div>
  );
}

export default App;
