import React from 'react';
import Modal from 'react-modal';
import { useCart } from './CartContext';
import './CartModal.css';

const CartModal = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, calculateTotalPrice, checkoutComplete, handleCheckout } = useCart(); 

  const calculateServiceFee = () => {
    const totalPrice = calculateTotalPrice();
    if (totalPrice <= 499  && totalPrice > 0) {
      return 30;
    } else if (totalPrice <= 999 && totalPrice > 499) {
      return 50;
    } else if (totalPrice <= 1499 && totalPrice > 999) {
      return 100;
    } else if (totalPrice <= 1999 && totalPrice > 1499) {
      return 150;
    } else if (totalPrice > 1999) {
      return 200;
    } else {
      return 0;
    }
    
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="cart-modal"
      overlayClassName="cart-modal-overlay"
    >
      <div className="cart-modal-content">
        {checkoutComplete ? (
          <>
            <h2>Order Successfully Placed!</h2>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div className='receipt-content'>
                    <span className='receipt-item-name'>{item.item_name}</span>
                    <span className='receipt-item-price'>Ksh{(item.price * item.quantity).toFixed(2)}</span>
                    <span className='receipt-item-quantity'>x{item.quantity}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <span className='receipt-total'>Total:</span>
              <span className='receipt-total-price'>Ksh{(calculateTotalPrice() + calculateServiceFee()).toFixed(2)}</span>
            </div>
          </>
        ) : (
          <>
            <h2>Your Cart</h2>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div className='cart-item-container'>
                    <span className='item-name'>{item.item_name}</span>
                    <div className='quantity-container'>
                      <button className='quantity-button' onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button className='quantity-button' onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                    <span>Ksh{(item.price * item.quantity).toFixed(2)}</span>
                    <button className='remove-button' onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-service-fee">
              <span className='total-text'>Service Fee:</span>
              <span className='total-amount'>Ksh{calculateServiceFee().toFixed(2)}</span>
            </div>
            <div className="cart-subtotal">
              <span className='total-text'>Subtotal:</span>
              <span className='total-amount'>Ksh{calculateTotalPrice().toFixed(2)}</span>
            </div>
            <div className="cart-total">
              <span className='total-text'>Total:</span>
              <span className='total-amount'>Ksh{(calculateTotalPrice() + calculateServiceFee()).toFixed(2)}</span>
            </div>
            <div className='checkout-button-container'>
              <button className="proceed-button" onClick={handleCheckout}>
                Pay at Restaurant
              </button>
            </div>
          </>
        )}
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default CartModal;
