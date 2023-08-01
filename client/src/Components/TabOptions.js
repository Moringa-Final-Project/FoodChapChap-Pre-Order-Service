import React from 'react'
import './TabOptions.css'

const tabs=[
  { 
    id:1,
    name: 'Place Order',
    active_img: 'https://b.zmtcdn.com/data/o2_assets/30fa0a844f3ba82073e5f78c65c18b371616149662.png',
    backdrop: '#FCEEC0',
    inactive_image:'https://b.zmtcdn.com/data/o2_assets/78d25215ff4c1299578ed36eefd5f39d1616149985.png?output-format=webp'
  },
  { 
    id:2,
    name: 'Dining Out',
    active_img: 'https://static.vecteezy.com/system/resources/previews/021/232/292/non_2x/champagne-icon-design-free-vector.jpg',
    backdrop: '#E5F3F3',
    inactive_image:'https://cdn-icons-png.flaticon.com/128/5527/5527985.png'
  },
  { 
    id:3,
    name: 'Nightlife',
    active_img: 'https://b.zmtcdn.com/data/o2_assets/855687dc64a5e06d737dae45b7f6a13b1616149818.png',
    backdrop: '#EDf4FF',
    inactive_image:'https://b.zmtcdn.com/data/o2_assets/01040767e4943c398e38e3592bb1ba8a1616150142.png?output-format=webp'
  }
]

const TabOptions = ({ activeTab, setActiveTab}) => {
  return (
    <div className='tab-options'>
      <div className='max-width options-wrapper'>
        {tabs.map((tab)=>{
          return (
            <div onClick={()=>setActiveTab(tab.name)}
            className={`tab-item absolute-center cur-po ${activeTab===tab.name && 'active-tab'}`}
            >
              <div className='tab-image-container absolute-center'
              style={{backgroundColor:`${activeTab===tab.name?tab.backdrop}`}}
              >

              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TabOptions