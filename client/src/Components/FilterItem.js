import React from 'react'
import './FilterItem.css'

const FilterItem = ({filter}) => {
  return (
    <div className='filter-item'>
        {filter.icon && filter.icon}
        
    </div>
  )
}

export default FilterItem