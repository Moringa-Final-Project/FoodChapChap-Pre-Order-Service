// import React, { useState, useEffect } from 'react';
// import './Menu.css'

// function Menu() {
//   const [showUpdateForm, setShowUpdateForm] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [updatedItem, setUpdatedItem] = useState({
//     item: '',
//     price: '',
//   });
//   const [menuItems, setMenuItems] = useState([]); // Define the state for menu items

//   useEffect(() => {
//     fetchMenuItems('http://127.0.0.1:5555/menuitems');
//   }, []);

//   const fetchMenuItems = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:5555/menuitems/restaurant_id');
//       if (response.ok) {
//         const data = await response.json();
//         setMenuItems(data.menu_items);
//       }
//     } catch (error) {
//       console.error('Error fetching menu items:', error);
//     }
//   };

//   const handleDeleteRestaurant = async (itemId) => {
//     try {
//       // Implement your handleDeleteRestaurant logic here
//       await handleDeleteRestaurant(itemId);
//       fetchMenuItems('http://127.0.0.1:5555/menuitems');
//     } catch (error) {
//       console.error('Error deleting menu item:', error);
//     }
//   };

//   const handleUpdate = (item) => {
//     setSelectedItem(item)
//     setUpdatedItem({ item: item.item, price: item.price });
//     setShowUpdateForm(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedItem((prevItem) => ({ ...prevItem, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`http://127.0.0.1:5555/menuitems/${selectedItem.id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           item_name: updatedItem.item_name,
//           price: updatedItem.price,
//         }),
//       });
//       if (response.ok) {
//         fetchMenuItems();
//         setShowUpdateForm(false);
//       }
//     } catch (error) {
//       console.error('Error updating menu item:', error);
//     }
//   }

//   return (
//     <div className="menu">
//       <h2>Menu</h2>
//       <div className="menu-cards">
//         {menuItems.map((item) => (
//           <div key={item.id} className="menu-card">
//             <h3>{item.item}</h3>
//             <p>Price: ${item.price}</p>
//             <p>Promo: %{item.promos}</p>
//             <div className="menu-card-buttons">
//               <button className="delete-button" onClick={() => handleDeleteRestaurant(item.id)}>
//                 Delete
//               </button>
//               <button className="update-button" onClick={() => handleUpdate(item)}>
//                 Update
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {showUpdateForm && selectedItem && (
//         <div className="update-form">
//           <h3>Update Item</h3>
//           <form onSubmit={handleSubmit}>
//             <label>
//               Name:
//               <input
//                 type="text"
//                 name="item"
//                 value={updatedItem.item}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Price:
//               <input
//                 type="number"
//                 name="price"
//                 value={updatedItem.price}
//                 onChange={handleChange}
//               />
//             </label>
//             <button type="submit">Update</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Menu;

import React, { useState } from 'react';
import './Menu.css'

function Menu(){
  const [menuItems, setMenuItems] = useState([
    { id: 101, item: 'Margherita Pizza', price: 10.99, promos: 10 },
    { id: 102, item: 'Classic Burger', price: 8.99, promos: 11 },
    { id: 103, item: 'Creamy Alfredo Pasta', price: 12.49, promos: 15 },
    { id: 104, item: 'French Fries', price: 11.11, promos: 19},
    { id: 105, item: 'Chocolate Cake', price: 7.6, promos: 5},
    {id: 106, item: 'Sushi Roll', price: 14.88, promos: 20},
    {id: 107, item: 'Grilled Salmon', price: 18.88, promos: 12},
    {id: 108, item: 'Steak and Shrimp', price: 12.88, promos: 15}
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

  return (
    <div className="menu">
      <h2>Menu</h2>
      <div className="menu-cards">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-card">
            <h3>{item.item}</h3>
            <p>Price: ${item.price}</p>
            <p>Promo: %{item.promos}</p>
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
};

export default Menu;