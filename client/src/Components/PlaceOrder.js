import React from 'react'
import { restaurants } from './data'
import Filters from './Filters'
import PlaceOrderCollections from './PlaceOrderCollections';
import TopBrands from './TopBrands';
import ExploreSection from './ExploreSection';

const placeOrderFilters=[
  {
    id:1,
    icon: <i className="fi fi-rr-settings-sliders absolute-center"></i>,
    title:'Filters',
  },
  {
    id:2,
    title:'Rating: 4.0+',
  },
  {
    id:3,
    title:'Safe and Hygienic',
  },
  {
    id:4,
    title:'Pure Veg',
  },
  {
    id:5,
    icon: <i className="fi fi-rr-apps-sort absolute-center"></i>,
    title:'Delivery Time',
  },
  {
    id:6,
    title:'Great Offers',
  },
];

const restaurantList = restaurants;

const PlaceOrder = () => {
  return (
    <div>
      <div className='max-width'>
      <Filters filterList={placeOrderFilters} />
      </div>
      <PlaceOrderCollections />
      <TopBrands />
      <ExploreSection list={restaurantList} collectionName='Best Food in Nairobi' />
    </div>
  )
}

export default PlaceOrder