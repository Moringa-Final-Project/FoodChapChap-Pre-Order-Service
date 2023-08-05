import React from 'react'
import Collection from './Collection';

const nightlifeList=[
  {
    id:1,
    title:'Rooftop Lounges',
    cover:'https://www.therooftopguide.com/rooftop-bars-in-nairobi/Bilder/sky-bar-at-emara-ole-serini-600-1.jpg',
  },
  {
    id:2,
    title:'Best Bars & Pubs',
    cover:'https://images.hivisasa.com/1200/B09V7wVWOmItems-to-buy-when-opening-a-bar-660x400%402x.jpg',
  },
  {
    id:3,
    title:'Artisan Cocktails',
    cover:'https://www.businesstraveller.com/files/News-images/Sankara/Sankara-Nairobi-new.jpg',
  },
  {
    id:4,
    title:'Chill Vibes',
    cover:'https://netstorage-tuko.akamaized.net/images/34df1cf7ac90a87d.jpg',
  },
  {
    id:5,
    title:'Happy Hour',
    cover:'https://www.theworlds50best.com/discovery/filestore/jpg/Hero-Bar-Interior.jpg',
  },
  {
    id:6,
    title:'Luxury Lounge',
    cover:'https://im.idiva.com/luxury/content/2012/Aug/f_lounge_diner_bar_champagne_lounge.jpg',
  },
  {
    id:7,
    title:'Bar-Gain',
    cover:'https://www.kara.or.ke/images/Bar.jpg',
  },
]

const diningFilters=[
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

const Nightlife = () => {
  return (
    <div>
      <Collection list={nightlifeList} />
    </div>
  )
}

export default Nightlife