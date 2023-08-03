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
        cover: 'https://www.allrecipes.com/thmb/iXKYAl17eIEnvhLtb4WxM7wKqTc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/240376-homemade-pepperoni-pizza-Beauty-3x4-1-6ae54059c23348b3b9a703b6a3067a44.jpg',
    },
    {
        id:2,
        title:'Burger',
        cover: 'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2560%2Cc_limit/Smashburger-recipe-120219.jpg'
    },
    {
        id:3,
        title:'Biryani',
        cover: 'https://www.madhuseverydayindian.com/wp-content/uploads/2022/11/easy-vegetable-biryani.jpg',
    },
    {
        id:4,
        title:'Wraps',
        cover: 'https://i2-prod.coventrytelegraph.net/incoming/article14949292.ece/ALTERNATES/s1200b/0_unnamed.png',
    },
    {
        id:5,
        title:'Chicken',
        cover: 'https://leitesculinaria.com/wp-content/uploads/2021/02/batter-fried-chicken-fp.jpg',
    },
    {
        id:6,
        title:'Cake',
        cover: 'https://joyfoodsunshine.com/wp-content/uploads/2020/08/best-chocolate-cake-recipe-from-scratch-8-500x500.jpg',
    },
    {
        id:7,
        title:'Fried Rice',
        cover: 'https://www.skabash.com/wp-content/uploads/2022/02/Fried-rice-2500x1584.jpg',
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
            <div className='collection-title'>Get inspiration for your first order</div>
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