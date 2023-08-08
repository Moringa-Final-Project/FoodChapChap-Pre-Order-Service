import React from 'react';
import Modal from 'react-modal';
import './MenuModal.css';

const MenuModal = ({ restaurantName, isOpen, onClose }) => {

  const menuItems = [
    {
      "id": 1,
      "image": "https://source.unsplash.com/random/?pizza&1",
      "price": 9.99,
      "item_name": "Pizza",
      "desription": "Our Specially made Pizza"
    },
    {
      "id": 2,
      "image": "https://source.unsplash.com/random/?Burger&1",
      "price": 6.49,
      "item_name": "Burger",
      "desription": "Our Specially made Burger"
    },
    {
      "id": 3,
      "image": "https://source.unsplash.com/random/?Fries&1",
      "price": 3.79,
      "item_name": "Fries",
      "desription": "Our Specially made Fries"
    },
    {
      "id": 4,
      "image": "https://source.unsplash.com/random/?Sushi&1",
      "price": 12.99,
      "item_name": "Sushi",
      "desription": "Our Specially made Sushi"
    },
    {
      "id": 5,
      "image": "https://source.unsplash.com/random/?Pasta&1",
      "price": 8.99,
      "item_name": "Pasta",
      "desription": "Our Specially made Pasta"
    },
    {
      "id": 6,
      "image": "https://source.unsplash.com/random/?Salad&1",
      "price": 5.49,
      "item_name": "Salad",
      "desription": "Our Specially made Salad"
    },
    {
      "id": 7,
      "image": "https://source.unsplash.com/random/?Icecream&1",
      "price": 7.99,
      "item_name": "Ice Cream",
      "desription": "Our Specially made Ice Cream"
    },
    {
      "id": 8,
      "image": "https://source.unsplash.com/random/?Donut&1",
      "price": 4.25,
      "item_name": "Donut",
      "desription": "Our Specially made Donut"
    },
    {
      "id": 9,
      "image": "https://source.unsplash.com/random/?Cupcake",
      "price": 2.99,
      "item_name": "Cupcake",
      "desription": "Our Specially made Cupcake"
    },
    {
      "id": 10,
      "image": "https://source.unsplash.com/random/?Steak",
      "price": 6.99,
      "item_name": "Steak",
      "desription": "Our Specially made Steak"
    },
  ];
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="menu-modal"
      overlayClassName="menu-modal-overlay"
    >
      <div className="menu-modal-content">
        <span className='title-container'>
        <h2 className='title'>{restaurantName} Menu</h2>
        <button className='close-button' onClick={onClose}>Close</button>
        </span>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <div className='container' >
              <div className='first-container'>
                <span className='item-name'>{item.item_name}</span>
                <div className='item-description'>{item.desription}</div>
                <span className='item-price'>${item.price.toFixed(2)}</span>
              </div>
              <div className='second-container'>
                <div>
                  <button className='cart-button'>+ Add to Cart</button>
                </div>
              </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default MenuModal;
