import './App.css';
import Navbar from './Components/Navbar';
import DsaState from './Context/DsaState'
import {
  BrowserRouter as Router,
  Switch,
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
     <Switch>
       <Route exact path = "/">
         <Home/>
       </Route>
       <Route exact path = "/login">
         <div className="container">
         <Login />
         </div>
       </Route>
       <Route exact path = "/signup">
      <div className="container">
       <NewSignup></NewSignup>
       </div>
       </Route>
     </Switch>
   </Router>
   </DsaState>
  )
}

export default App