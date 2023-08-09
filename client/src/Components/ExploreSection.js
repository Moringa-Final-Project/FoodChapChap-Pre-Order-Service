import React, { useState } from 'react';
import './ExploreSection.css';
import ExploreCard from './ExploreCard';

const ExploreSection = ({ list, collectionName, searchTerm }) => {

  const [filteredRestaurants, setFilteredRestaurants] = useState(list);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false); 

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const applyRatingFilter = () => {
    const filteredList = list.filter(restaurant => parseFloat(restaurant.rating) >= 4.5);
    setFilteredRestaurants(filteredList);
  };

  const applyOfferFilter = () => {
    const filteredList = list.filter(restaurant => restaurant.offer && parseFloat(restaurant.offer) >= 50);
    setFilteredRestaurants(filteredList);
  };

  const resetFilters = () => {
    setFilteredRestaurants(list);
  };

  const filterRestaurants = (restaurants, searchTerm) => {
    if (!searchTerm) return restaurants;
    const normalizedSearchTerm = searchTerm.toLowerCase();
    return restaurants.filter((restaurant) => {
      const restaurantName = restaurant?.restaurant_name?.toLowerCase();
      return restaurantName && restaurantName.includes(normalizedSearchTerm);
    });
  };

  const filteredList = filterRestaurants(filteredRestaurants, searchTerm);

  const handleLocationFilter = (location) => {
    setSelectedLocation(location);
    resetFilters(); // Reset other filters when selecting a new location
    if (location) {
      const filteredList = list.filter((restaurant) => restaurant.location === location);
      setFilteredRestaurants(filteredList);
    } else {
      setFilteredRestaurants(list);
    }
  };

  return (
    <div className='max-width explore-section'>
      <div className='collection-title'>{collectionName}</div>
      <div className='filter-section'>
      <div className='filter-icon cur-po'>
        <i className="fi fi-rr-settings-sliders absolute-center"></i>
        <span className='absolute-center'>Filters</span>
      </div>
      <div>
        <button className='filter-buttons' onClick={applyRatingFilter}>Rating: 4.5+</button>
        <button className='filter-buttons' onClick={applyOfferFilter}>Best Offers</button>
        <button className='filter-buttons' onClick={resetFilters}>Safe and Hygienic</button>
        <button className='filter-buttons' onClick={resetFilters}>Remove Filters</button>
      </div>
      <div className='dropdown'>
            <button className='filter-buttons' onClick={handleDropdownToggle}>
              Locations
            </button>
            {dropdownVisible && (
              <div className='dropdown-content cur-po'>
                <div onClick={() => handleLocationFilter(null)}>All Locations</div>
                {['Westlands', 'Moi Avenue', 'Lavington', 'Karen', 'Ngong Lane'].map((location) => (
                  <div key={location} onClick={() => handleLocationFilter(location)}>
                    {location}
                  </div>
            ))}
          </div>
            )}
        </div>
      </div>
      {filteredList.length === 0 ? (
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
