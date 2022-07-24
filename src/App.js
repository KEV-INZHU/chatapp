import './App.css';
import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import {useStateValue} from './StateProvider';
function App() {
  const[{user}, dispatch] = useStateValue();

  return (
    <div className="App">
      {!user?(
        <Login/>
      ):(
      <div className = "app_body">
      <Router>
        <Routes>
          <Route path ="/rooms/:roomId" element = {<><Sidebar/><Chat/></>}>
          </Route>
          <Route path = "/" element = {<Sidebar/>}>
          </Route>
        </Routes>
      </Router>
    </div>)}
      
    </div>
  );
}

export default App;
