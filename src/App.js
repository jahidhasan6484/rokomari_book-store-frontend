import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import data from './components/Data/Data';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Author from './components/Author/Author';
import Category from './components/Category/Category';


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
        <Route path="/cart" element={<Cart />} />
        <Route path="/author/:name" element={<Author />} />
        <Route path="/category/:category" element={<Category />} />
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
