import React from 'react';
import './Restaurants.css'
import { Link, Route, Routes } from 'react-router-dom';
import Menu from './Restaurants/Menu';
import OrderList from './Restaurants/Order';
import Statistics from './Restaurants/Statistics';

function Restaurant() {
  const [menuVisible, setMenuVisible] = React.useState(false);
  
  // Sample order data (Replace this with your actual order data)
  const [orders] = React.useState([
    // ... (your order data here)
  ]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrders = orders.filter((order) =>
    order.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <header className="head">
        <h1>FOOD CHAPCHAP</h1>
        <nav>
          <ul className="navbar">
            <li>
              <Link to="/order-list">OrderList</Link>
            </li>
            <li>
              <Link to="/statistics">Statistics</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className="search-bar"
              />
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
      {menuVisible ? null : (
          <Route 
            path='/order-list'
            element={<OrderList orders={filteredOrders} />}
          />
        )}
        {menuVisible ? null : (
          <Route path='/statistics' element={<Statistics />} />
        )}
        <Route path="/" element={<Menu />} />
      </Routes>
    </div>
  );
}

export default Restaurant;
