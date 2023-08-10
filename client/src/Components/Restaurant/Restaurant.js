import React, { useState } from 'react';
import Menu from './Restaurants/Menu';
import OrderList from './Restaurants/Order';
import './Restaurants.css';

function Restaurant() {
  const [menuVisible, setMenuVisible] = useState(false);

  // Sample order data (Replace this with your actual order data)
  const [orders] = useState([
    // ... (your order data here)
    { id: 1, item: 'Pizza', quantity: 1, imageUrl: "https://shorturl.at/qBLNY"},
    { id: 2, item: 'Burger', quantity: 1, imageUrl: "https://shorturl.at/cenxN" },
    { id: 3, item: 'Fries', quantity: 2, imageUrl: " https://shorturl.at/enwMY"},
    { id: 4, item: 'Sushi', quantity: 1, imageUrl: "https://shorturl.at/mnNQ3"},
    { id: 5, item: 'Pasta', quantity: 1,  imageUrl: "https://shorturl.at/sAS28"},
  ]);

  const [searchTerm, setSearchTerm] = useState('');

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
              <button onClick={() => setMenuVisible(false)}>Menu</button>
              <button onClick={() => setMenuVisible(true)}>OrderList</button>
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
      {menuVisible ? (
        <OrderList orders={filteredOrders} />
      ) : (
        <Menu />
      )}
    </div>
  );
}

export default Restaurant;



