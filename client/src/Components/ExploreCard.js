import React, { useState } from 'react'
import './ExploreCard.css'
import MenuModal from './MenuModal';

const ExploreCard = ({ restaurant }) => {

    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

    const name = restaurant?.restaurant_name ?? "";
    const coverImg = restaurant?.image_url;
    const rating = restaurant?.rating;
    const offers = restaurant?.offer ?? [];
    const cuisines = restaurant?.cuisines_offered;
    const bottomContainers = restaurant?.bottomContainers;

    const handleMenuModalClose = () => {
        setIsMenuModalOpen(false); 
      };
    
      const handleCardClick = () => {
        setIsMenuModalOpen(true); 
      };

  return (
    <div className='explore-card cur-po' onClick={handleCardClick} >
      <div className='explore-card-cover' >
        <img src={coverImg} alt={name} className='explore-card-image' />
        <div className='offers absolute-center'>{offers}</div>
      </div>
      <div className='res-row'>
        <div className='res-name'>{name}</div>
        <div className='res-rating absolute-center'>
          {rating} <i className='fi fi-rr-star absolute-center'></i>
        </div>
      </div>
      <div className='res-row'>
        <div className='res-cuisine'>
          <span className='res-cuisine-tag'>{cuisines}</span>
        </div>
      </div>
      <div>
        <div className='card-separator'></div>
        <div className='explore-bottom'>
          <img
            src={bottomContainers[0]?.image?.url}
            alt={bottomContainers?.text}
            style={{ height: '18px' }}
          />
          <div className='res-bottom-text'>{bottomContainers[0]?.text}</div>
        </div>
      </div>
      <MenuModal
        restaurantName={name}
        menuItems={restaurant.menu_items}
        isOpen={isMenuModalOpen}
        onClose={handleMenuModalClose}
      />
    </div>
  );
};

export default ExploreCard