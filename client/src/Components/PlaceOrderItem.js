import React from 'react'
import './PlaceOrderItem.css'

const PlaceOrderItem = ({ item }) => {
  return (
    <div>
      <div className='place-order-item-cover'>
        <img src={item.cover} className='place-order-item-image' alt={item.title} />
      </div>
      <div className='place-order-item-title'>{item.title}</div>
    </div>
  )
}

export default PlaceOrderItem;