import React from 'react';
import './ExploreSection.css';
import ExploreCard from './ExploreCard';

const ExploreSection = ({ list, collectionName, searchTerm }) => {
  const filterList = (list, searchTerm) => {
    if (!searchTerm) return list;
    const normalizedSearchTerm = searchTerm.toLowerCase();
    return list.filter((restaurant) => {
      const restaurantName = restaurant?.restaurant_name?.toLowerCase();
      return restaurantName && restaurantName.includes(normalizedSearchTerm);
    });
  };

  const filteredList = filterList(list, searchTerm);

  return (
    <div className='max-width explore-section'>
      <div className='collection-title'>{collectionName}</div>
      {filteredList.length === 0 ? ( // Check if filteredList is empty
        <div className='no-matching-items collection-title'>
          No items match your search input, try again.
        </div>
      ) : (
        <div className='explore-grid'>
          {filteredList.map((restaurant) => {
            return <ExploreCard restaurant={restaurant} key={restaurant.id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ExploreSection;
