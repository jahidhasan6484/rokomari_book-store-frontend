import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import data from './components/Data/Data';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Author from './components/Author/Author';
import Category from './components/Category/Category';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Verified from './components/Verified/Verified';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Orders from './components/Orders/Orders';
import Profile from './components/Profile/Profile';
import Shipping from './components/Shipping/Shipping';
import DB from './components/DB/DB';


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
        <Route path="/db" element={<DB />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/author/:name" element={<Author />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/verified" element={<Verified />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/profile" element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        } />
        <Route path="/orders" element={
          <RequireAuth>
            <Orders />
          </RequireAuth>
        } />
        <Route path="/shipping" element={
          <RequireAuth>
            <Shipping />
          </RequireAuth>
        } />
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
