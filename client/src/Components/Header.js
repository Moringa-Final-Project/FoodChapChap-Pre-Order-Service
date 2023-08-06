import React from 'react';
import './Header.css';
import logo from '../images/logo.png';
import profile from '../images/user.png';

const Header = ({ onSearchInputChange }) => {
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
            <i className='fi fi-rr-caret-down absolute-center'></i>
          </div>
          <div className='location-search-separator'></div>
          <div className='header-searchbar'>
            <i className='fi fi-rr-search absolute-center search-icon'></i>
            <input
              type='text'
              placeholder='Search for restaurant, cuisine, or a dish'
              className='search-input'
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='profile-wrapper'>
          <img src={profile} alt='Profile' className='header-profile-image' />
          <span className='header-username'>User</span>
          <i className='fi fi-rr-angle-small-down absolute-center profile-options-icon'></i>
        </div>
      </div>
    </div>
  );
};

export default Header;
