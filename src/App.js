import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import data from './components/Data/Data';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Programming from './components/Programming/Programming';
import Islamic from './components/Islamic/Islamic';
import Novel from './components/Novel/Novel';
import Cart from './components/Cart/Cart';


export const CartContext = createContext();

function App() {

  const { booksList } = data;

  const [cart, setCart] = useState([])

  useEffect(() => {

    if (JSON.parse(localStorage.getItem('cart'))) {
      setCart(JSON.parse(localStorage.getItem('cart')))
    }

  }, [])

  return (
    <CartContext.Provider value={[cart, setCart, booksList]}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/freelancing_Programming" element={<Programming />} />
        <Route path="/islamicBook" element={<Islamic />} />
        <Route path="/novel" element={<Novel />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
