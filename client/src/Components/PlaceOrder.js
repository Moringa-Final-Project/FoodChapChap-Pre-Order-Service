import React from 'react';
import { restaurants } from './data';
import PlaceOrderCollections from './PlaceOrderCollections';
import TopBrands from './TopBrands';
import ExploreSection from './ExploreSection';

const restaurantList = restaurants;

const PlaceOrder = ({ searchTerm }) => {
  const isFiltered = !!searchTerm;

  return (
    <div>
      <div className='max-width'>
        {/* Conditionally render Filters, PlaceOrderCollections, and TopBrands */}
        {!isFiltered && (
          <>
            <PlaceOrderCollections />
            <TopBrands />
          </>
        )}
      </div>
      <ExploreSection
        list={restaurantList}
        collectionName='Best Food in Nairobi'
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default PlaceOrder;
