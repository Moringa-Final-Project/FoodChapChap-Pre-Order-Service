import React, { useState } from 'react';
import './Menu.css';

function Menu({ searchTerm }) {
  // ... (your existing code)
  const [menuItems, setMenuItems] = useState([
    { id: 101, item: 'Pizza', price: 1490, imageUrl: "https://shorturl.at/qBLNY" },
    { id: 102, item: 'Burger', price: 900, imageUrl: "https://shorturl.at/cenxN" },
    { id: 103, item: 'Fries', price: 200, imageUrl: " https://shorturl.at/enwMY" },
    { id: 104, item: 'Sushi', price: 1800, imageUrl: "https://shorturl.at/mnNQ3"},
    { id: 105, item: 'Pasta', price: 1500, imageUrl: "https://shorturl.at/sAS28"},
    {id: 106, item: 'Salad', price: 150, imageUrl: "https://shorturl.at/blAS6"},
    {id: 107, item: 'Ice Cream', price: 350, imageUrl: "https://shorturl.at/IKLW1"},
    {id: 108, item: 'Donut', price: 300, imageUrl: "https://shorturl.at/nPUYZ"},
    {id: 109, item: 'CupCake', price: 300, imageUrl: "https://shorturl.at/DHJO5"},
    {id: 110, item: 'Steak', price: 850, imageUrl: "https://shorturl.at/bpsvD"}
    // Add more menu items here
  ]);


  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState ({
    item: '',
    price: '',
  });

  const handleDelete = (itemId) => {
    //Remove the item from the menuItems array by its id
    setMenuItems((prevMenuItems) => prevMenuItems.filter((item) => item.id !== itemId));
  };

  const handleUpdate = (item) => {
    setSelectedItem(item)
    setUpdatedItem({ item: item.item, price: item.price });
    setShowUpdateForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Update the selected item with the new name and price
    setMenuItems((prevMenuItems) => 
      prevMenuItems.map((item) => 
      item.id === selectedItem.id ? { ...item, item: updatedItem.item, price: updatedItem.price } : item
      )
    );
    setShowUpdateForm(false);
  }

  const filteredMenuItems = menuItems.filter((item) =>
    item.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="menu">
      <div className='hidden'>
      <h2>Menu</h2>
      <div className="filter-input">
        <input
          type="text"
          placeholder="Search menu..."
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      </div>
      <div className="menu-cards">
        {filteredMenuItems.map((item) => (
           <div key={item.id} className="menu-card">
           <img src={item.imageUrl} alt={item.item} className="menu-item-image" />
           <h3>{item.item}</h3>
           <p>Price: Ksh{item.price}</p>
           <div className="menu-card-buttons">
             <button className="delete-button" onClick={() => handleDelete(item.id)}>
               Delete
             </button>
             <button className="update-button" onClick={() => handleUpdate(item)}>
               Update
             </button>
           </div>
         </div>
        ))}
      </div>
      {showUpdateForm && selectedItem && (
        <div className="update-form">
          <h3>Update Item</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="item"
                value={updatedItem.item}
                onChange={handleChange}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={updatedItem.price}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Update</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Menu;
