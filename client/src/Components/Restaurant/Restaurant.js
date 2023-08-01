import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Menu from './Restaurants/Menu';
import OrderList from './Restaurants/Order';
import Statistics from './Restaurants/Statistics';

function Restaurant() {
  const [menuVisible, setMenuVisible] = React.useState(false);
  
  // Sample order data (Replace this with your actual order data)
  const [orders] = React.useState([
    { id: 1, item: 'Pizza', quantity: 2, price: 10.99, imageUrl: "https://shorturl.at/qBLNY"},
    { id: 2, item: 'Burger', quantity: 1, price: 8.99, imageUrl: "https://shorturl.at/cenxN" },
    { id: 3, item: 'Pasta', quantity: 3, price: 12.49, imageUrl: "https://shorturl.at/sAS28"},
    { id: 4, item: 'French Fries', quantity: 5, price: 11.11, imageUrl: "https://shorturl.at/enwMY"},
    { id: 5, item: 'Chocolate Cake', quantity: 1, price: 7.6, imageUrl: "https://shorturl.at/nELV2"},
    { id: 6, item: 'Sushi Roll',quantity: 7, price: 14.88, imageUrl: "https://shorturl.at/mnNQ3"},
    { id: 7, item: 'Grilled Salmon',quantity: 5, price: 18.88, imageUrl: "https://shorturl.at/fpBNY"},
    { id: 8, item: 'Steak and Shrimp',quantity: 4, price: 12.88, imageUrl: "https://shorturl.at/mpGZ5"}
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
    <Router>
      <div className="App">
        <header className="header">
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
          <Route
            path="/order-list"
            element={<OrderList orders={filteredOrders} />} 
          />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Restaurant;
