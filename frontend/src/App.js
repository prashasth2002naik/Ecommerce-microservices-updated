import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import OrderList from './components/OrderList';
import CreateOrder from './components/CreateOrder';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1>E-Commerce Microservices</h1>
          <ul>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/orders">Orders</Link></li>
            <li><Link to="/create-order">Create Order</Link></li>
          </ul>
        </nav>
        
        <div className="container">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/create-order" element={<CreateOrder />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;