import './App.css';
import Navbar from './Components/Navbar';
import DsaState from './Context/DsaState'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import Home from './Components/Home';
import NewSignup from './Components/Auth/NewSignup';
import Login from './Components/Auth/Login';
import React from 'react';

function App() {
  return (
    <DsaState>
  <Router>
  <Navbar />
     <Routes>
       <Route exact path = "/" element = {<Home/>}>
         
       </Route>
       <Route exact path = "/login" element = {<div className="container">
         <Login />
         </div>}>
         
       </Route>
       <Route exact path = "/signup" element = {<div className="container">
       <NewSignup/>
       </div>}>
       </Route>
     </Routes>
   </Router>
   </DsaState>
  )
}

export default App