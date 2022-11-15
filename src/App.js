import React from 'react';
import './App.css'; 
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';



function App() {

  return (
    <>
      <Navbar />
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes> */}
    </>
  );
}

export default App;
