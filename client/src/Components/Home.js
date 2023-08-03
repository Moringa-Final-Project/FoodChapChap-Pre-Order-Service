import React, { useState } from 'react'
import Header from './Header'
import TabOptions from './TabOptions'
import Footer from './Footer'
import PlaceOrder from './PlaceOrder'
import DiningOut from './DiningOut'
import Nightlife from './Nightlife'
import PlaceOrderCollections from './PlaceOrderCollections'

const Home = () => {

    const [activeTab, setActiveTab] = useState('Place Order')

  return (
    <div>
        <Header />
        <TabOptions activeTab={activeTab} setActiveTab={setActiveTab} /> 
        {getCorrectScreen(activeTab)}
        <Footer />   
    </div>
  )
}

const getCorrectScreen = (tab) => {
    switch(tab){
        case 'Place Order':
            return <PlaceOrder />
        case 'Dining Out':
            return <DiningOut />
        case 'Nightlife':
            return <Nightlife />
        default:
            return <PlaceOrder />
    }
}

export default Home