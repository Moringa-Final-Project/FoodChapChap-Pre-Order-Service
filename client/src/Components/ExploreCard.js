import React from 'react'
import './ExploreCard.css'

const ExploreCard = ({ restaurant }) => {
    const name= restaurant?.restaurant_name ?? "";
    const coverImg= restaurant?.image_url

  return (
    <div>ExploreCard</div>
  )
}

export default ExploreCard