import React from 'react';
import Modal from 'react-modal';
import { useCart } from './CartContext'; // Update the path
import './CartModal.css'

const CartModal = ({ isOpen, onClose }) => {
  const { cartItems } = useCart();

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="cart-modal"
      overlayClassName="cart-modal-overlay"
    >
      <div className="cart-modal-content">
        <h2>Your Cart</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <div>
                <span>{item.item_name}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="cart-total">
          <span>Total:</span>
          <span>${calculateTotalPrice().toFixed(2)}</span>
        </div>
        <button className="proceed-button"> // onClick=Handle checkout
          Proceed to Checkout
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default CartModal;
