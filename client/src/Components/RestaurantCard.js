import React from 'react'

const RestaurantCard = ({ name, address, rating, type_of_food }) => (
    <div className="card">
      <h2>{name}</h2>
      <p>{address}</p>
      <p>Rating: {rating}</p>
      <p>Cuisine: {type_of_food}</p>
    </div>
  );

export default RestaurantCard