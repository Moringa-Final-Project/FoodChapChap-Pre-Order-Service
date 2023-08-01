import React from 'react'
import Slider from 'react-slick';
import './PlaceOrderCollections.css'
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
import PlaceOrderItem from './PlaceOrderItem';

const placeOrderItems = [
    {
        id:1,
        title:'Pizza',
        cover: 'https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png',
    },
    {
        id:2,
        title:'Burger',
        cover: 'https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png',
    },
    {
        id:3,
        title:'Biryani',
        cover: 'https://b.zmtcdn.com/data/dish_images/d19a31d42d5913ff129cafd7cec772f81639737697.png',
    },
    {
        id:4,
        title:'Rolls',
        cover: 'https://b.zmtcdn.com/data/dish_images/c2f22c42f7ba90d81440a88449f4e5891634806087.png',
    },
    {
        id:5,
        title:'Chicken',
        cover: 'https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png',
    },
    {
        id:6,
        title:'Cake',
        cover: 'https://b.zmtcdn.com/data/dish_images/d5ab931c8c239271de45e1c159af94311634805744.png',
    },
    {
        id:7,
        title:'Fried Rice',
        cover: 'https://b.zmtcdn.com/data/o2_assets/e444ade83eb22360b6ca79e6e777955f1632716661.png',
    },
    {
        id:8,
        title:'Noodles',
        cover: 'https://b.zmtcdn.com/data/dish_images/91c554bcbbab049353a8808fc970e3b31615960315.png',
    },
    {
        id:9,
        title:'Ugali',
        cover: 'https://pbs.twimg.com/media/Dkm9aBmXsAA_Szt.jpg',
    },
    {
        id:10,
        title:'Chapati',
        cover: 'https://swahilifood.com/wp-content/uploads/2017/05/chapati.jpg',
    },
    {
        id:11,
        title:'Pilau',
        cover: 'https://lh3.googleusercontent.com/4oBHZ16tfSzB_KjTKb6rKpT2fpuWLXMobIER3XJd8tOln3V7IhMHWCS2DmittBTaA5EPd2sfx2YiD8YgqD54CDZbynSKAHNDd96YYymt9g=s750',
    },
];

const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

const PlaceOrderCollections = () => {
  return (
    <div className='place-order-collection'>
        <div className='max-width'>
            <div className='collection-title'>Eat what makes you happy</div>
            <Slider {...settings}>
                {placeOrderItems.map((item)=>{
                    return <PlaceOrderItem item={item} />
                })}
            </Slider>
        </div>
    </div>
  )
}

export default PlaceOrderCollections