import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from './HomePage.js';
import Mint from './Mint.js';

function App() {
  return (
      <div className="App">
        <header>
          <nav>
            <div className="logo">
              <h1>
                <a href="">Grandpa's Chat</a>
              </h1>
            </div>
            <ul>
              <li>
                <a href="./">Home</a>
              </li>
              <li className="nav-cta">
                <a href="/Mint">Mint</a>
              </li>
            </ul>
          </nav>
          </header>

          <Router>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/Mint" element={<Mint />}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
