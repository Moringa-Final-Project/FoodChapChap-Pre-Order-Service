import React, { useState } from 'react'
import Header from './Header'
import TabOptions from './TabOptions'
import Footer from './Footer'
import PlaceOrder from './PlaceOrder'
import DiningOut from './DiningOut'
import Nightlife from './Nightlife'

const Home = () => {

  const [activeTab, setActiveTab] = useState('Place Order');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInputChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const getCorrectScreen = (tab) => {
    switch(tab){
        case 'Place Order':
            return <PlaceOrder searchTerm={searchTerm} />
        case 'Dining Out':
            return <DiningOut />
        case 'Nightlife':
            return <Nightlife />
        default:
            return <PlaceOrder searchTerm={searchTerm} />
    }
}

  return (
    <div>
        <Header onSearchInputChange={handleSearchInputChange} />
        <TabOptions activeTab={activeTab} setActiveTab={setActiveTab} /> 
        {getCorrectScreen(activeTab)}
        <Footer />   
    </div>
  )
}

export default Home