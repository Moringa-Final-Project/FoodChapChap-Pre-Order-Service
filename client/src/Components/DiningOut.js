import React from 'react'
import './DiningOut.css'
import Collection from './Collection'

const collectionList=[
  {
    id:1,
    title:'Trending This Week',
    cover:'https://www.restaurant-hospitality.com/sites/restaurant-hospitality.com/files/styles/article_featured_retina/public/Nashville-Hot-flavor-of-the-week.gif?itok=OC3xhZsT',
  },
  {
    id:2,
    title:'Live Sports Screenings',
    cover:'https://www.manchesterbars.com/photos/dive-football.jpg',
  },
  {
    id:3,
    title:'Newly Opened',
    cover:'https://images.moneycontrol.com/static-mcnews/2022/10/Tao-Fu-Chinese-restaurant-in-Pune-770x433.jpg?impolicy=website&width=770&height=431',
  },
  {
    id:4,
    title:'Veggie Friendly',
    cover:'https://newinzurich.com/wp-content/uploads/2022/07/290397826_5738809876169977_1641048783490970643_n.jpg',
  },
  {
    id:5,
    title:'Best Of Nairobi',
    cover:'https://media-cdn.tripadvisor.com/media/photo-s/13/e2/0c/30/certainly-nairobi-s-most.jpg',
  },
  {
    id:6,
    title:'Outdoor Seating',
    cover:'https://media-cdn.tripadvisor.com/media/photo-s/0e/9e/31/7e/the-ultimate-outdoor.jpg',
  },
  {
    id:7,
    title:'Best Pizzas In Town',
    cover:'https://nairobifashionhub.co.ke/wp-content/uploads/2021/10/Nairobi-Fashion-Hub-Best-Pizza-Joint-in-Kenya.jpg',
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


const DiningOut = () => {
  return (
    <Collection list={collectionList} />
  )
}

export default DiningOut