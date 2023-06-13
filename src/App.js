import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Prediction from './Prediction';


function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} ></Route>
          <Route exact path="/Prediction" element={<Prediction />} ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
