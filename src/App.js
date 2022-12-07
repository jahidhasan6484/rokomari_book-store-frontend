import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Author from './components/Author/Author';
import Category from './components/Category/Category';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Orders from './components/Orders/Orders';
import Profile from './components/Profile/Profile';
import Shipping from './components/Shipping/Shipping';
import AddBook from './components/AddBook/AddBook';
import Update from './components/Update/Update';
import api from './components/API';
import ManageBook from './components/ManageBook/ManageBook';


export const CartContext = createContext();

function App() {
  const [bookDB, setBookDB] = useState([]);
  const [admins, setAdmins] = useState([])
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(`${api}/bookDB`)
      .then((response) => response.json())
      .then((result) => setBookDB(result))
  }, []);

  useEffect(() => {
    fetch(`${api}/admins`)
      .then((response) => response.json())
      .then((result) => setAdmins(result))
  }, [])

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('cart'))) {
      setCart(JSON.parse(localStorage.getItem('cart')))
    }
  }, [])

  return (
    <CartContext.Provider value={[cart, setCart, bookDB, setBookDB, admins]}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addBook" element={<AddBook />} />
        <Route path="/manageBook" element={<ManageBook />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/author/:name" element={<Author />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
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
