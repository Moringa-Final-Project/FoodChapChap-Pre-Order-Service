import React, { useState } from 'react';
import Menu from './Restaurants/Menu';
import OrderList from './Restaurants/Order';
import './Restaurants.css';

function Restaurant() {
  const [menuVisible, setMenuVisible] = useState(false);

  // Sample order data (Replace this with your actual order data)
  const [orders] = useState([
    // ... (your order data here)
    { id: 1, item: 'Pizza', quantity: 2, price: 9.99, imageUrl: "https://shorturl.at/qBLNY"},
    { id: 2, item: 'Burger', quantity: 1, price: 6.49, imageUrl: "https://shorturl.at/cenxN" },
    { id: 3, item: 'Fries', price: 3.79, imageUrl: " https://shorturl.at/enwMY"},
    { id: 4, item: 'Sushi', quantity: 5, price: 12.99, imageUrl: "https://shorturl.at/mnNQ3"},
    { id: 5, item: 'Pasta', price: 8.99, imageUrl: "https://shorturl.at/sAS28"},
    { id: 6, item: 'Salad', price: 5.49, imageUrl: "https://shorturl.at/blAS6"},
    { id: 7, item: 'Ice Cream',quantity: 1, price: 7.99, imageUrl: "https://shorturl.at/IKLW1"},
    { id: 8, item: 'Donut',quantity: 1, price: 4.25, imageUrl: "https://shorturl.at/nPUYZ"},
    { id: 9, item: 'CupCake',quantity: 1, price: 2.99, imageUrl: "https://shorturl.at/DHJO5"},
    { id: 10, item: 'Steak', price: 6.99, imageUrl: "https://shorturl.at/bpsvD"}
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
