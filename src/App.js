import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Header from "./components/Header";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </div>
  );
}

export default App;
