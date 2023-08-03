import React from 'react'
import './ExploreCard.css'

const ExploreCard = ({ restaurant }) => {
    const name = restaurant?.restaurant_name ?? "";
    const coverImg = restaurant?.image_url;
    const rating = restaurant?.rating;
    const offers = restaurant?.offer;

  return (
    <div>ExploreCard</div>
  )
}

export default ExploreCard