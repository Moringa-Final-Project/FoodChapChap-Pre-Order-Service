import React from 'react'
import './TopBrands.css'
import Slider from 'react-slick';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

const topBrandList=[
  {
    id:1,
    cover: 'https://logos-world.net/wp-content/uploads/2021/08/Dominos-Logo.png'
  },
  {
    id:2,
    cover: 'https://d26eb5y2jukpbz.cloudfront.net/ebs/archive/2019/media/OS_DE19085M_10.jpg'
  },
  {
    id:3,
    cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Burger_King_logo_%281999%29.svg/2024px-Burger_King_logo_%281999%29.svg.png'
  },
  {
    id:4,
    cover: 'https://static.vecteezy.com/system/resources/previews/024/693/396/non_2x/kfc-logo-transparent-free-png.png'
  },
  {
    id:5,
    cover: 'https://upload.wikimedia.org/wikipedia/sco/thumb/d/d2/Pizza_Hut_logo.svg/2177px-Pizza_Hut_logo.svg.png'
  },
  {
    id:6,
    cover: 'https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_640,h_400/https://galleria.co.ke/storage/2022/04/Java-Logo-640x400.png'
  },
  {
    id:7,
    cover: 'https://dynl.mktgcdn.com/p/Ez5Us5WiJpP5LDio6Nt_QhiFG0BZb8fNZe6KkvMhMdw/400x400.jpg'
  },
  {
    id:8,
    cover: 'https://d2lev5xroqke9e.cloudfront.net/ke/view/a28391f86f '
  }
]

const settings = {
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
};

const TopBrands = () => {
  return (
    <div className='top-brands max-width'>
      <div className='collection-title'>Top brands on our site</div>
      <Slider {...settings}>
        {topBrandList.map((brand)=>{
          return <div>
            <div className='top-brands-cover cur-po'>
              <img src={brand.cover} className='top-brands-image' alt='Top Brands' />
            </div>
          </div>
        })}
      </Slider>
    </div>
  )
}

export default TopBrands