import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./Pages/Home/Navbar";
import Home from './Pages/Home/Homescreen';

import SignIn from "./Pages/Home/SignIn";
import SignUp from "./Pages/Home/SignUp";


function App() {
  return(
    <div className="App">
     <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>


          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>


          <Route path="*" element={<div>404 Not Found</div>}></Route>
        </Routes>
      </div>
     </Router>
    </div>
  );
}

export default App;