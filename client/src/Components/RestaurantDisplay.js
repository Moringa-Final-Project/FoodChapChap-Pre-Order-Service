import React from 'react'
import RestaurantCard from './RestaurantCard';
import restaurantsData from './data';

const RestaurantDisplay = () => {
  return (
    <div className="restaurant-list">
            {restaurantsData.map((restaurant, index) => (
                <RestaurantCard key={index} {...restaurant} />
            ))}
    </div>
  )
}

export default RestaurantDisplay