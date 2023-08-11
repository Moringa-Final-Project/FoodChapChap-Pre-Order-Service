import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../images/logo.png';
import profile from '../images/user.png';
import { useCart } from './CartContext';
import CartModal from './CartModal';

const Header = ({ onSearchInputChange }) => {
  const { cartItemCount } = useCart();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCartIconClick = () => {
    setIsCartModalOpen(true);
  };

  const handleCartModalClose = () => {
    setIsCartModalOpen(false);
  };
  
  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    onSearchInputChange(searchTerm);
  };

  return (
    <div className='max-width header'>
      <img src={logo} alt='Food ChapChap Logo' className='header-logo' />
      <div className='header-right'>
        <div className='header-location-search-container'>
          <div className='location-wrapper'>
            <div className='location-icon-name'>
              <i className='fi fi-rr-marker absolute-center location-icon'></i>
              <div>Nairobi</div>
            </div>
          </div>
          <div className='location-search-separator'></div>
          <div className='header-searchbar'>
            <i className='fi fi-rr-search absolute-center search-icon'></i>
            <input
              type='text'
              placeholder='Search for a Restaurant'
              className='search-input'
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='profile-wrapper'>
          <i
            className='fi fi-rr-shopping-cart absolute-center cur-po cart-icon'
            onClick={handleCartIconClick}
          ></i>
          <span className='cart-item-count'>{cartItemCount}</span>
          <img src={profile} alt='Profile' className='header-profile-image cur-po' />
        </div>
          <button className='logout-button' onClick={() => navigate('/login')}>Logout </button>
      </div>
      <CartModal isOpen={isCartModalOpen} onClose={handleCartModalClose} />
    </div>
  );
};

export default Header;
