import React, { useState, useEffect } from 'react';
import './Admin.css'

const Admin = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
        restaurant_name: "",
        restaurant_image: "",
        location: "",
        ambience: "",
        cuisines_offered: "",
        operating_hours: "",
        contact_info: "",
    });

    useEffect(() => {
        // Fetch restaurants from the backend
        fetch('http://127.0.0.1:5000/restaurants')
            .then((response) => response.json())
            .then((data) => setRestaurants(data))
            .catch((error) => console.error('Error fetching restaurants:', error));

        // Fetch customers from the backend API
        fetch('http://127.0.0.1:5000/customers')
            .then((response) => response.json())
            .then((data) => setCustomers(data))
            .catch((error) => console.error('Error fetching customers:', error));
    }, []);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form data to create a new restaurant
        fetch('http://127.0.0.1:5000/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Refresh the restaurant list after successful creation
                setRestaurants([...restaurants, data]);
                // Clear form data
                setFormData({
                    restaurant_name: "",
                    restaurant_image: "",
                    location: "",
                    ambience: "",
                    cuisines_offered: "",
                    operating_hours: "",
                    contact_info: "",
                });
            })
            .catch((error) => console.error('Error creating restaurant:', error));
    };

    const handleDeleteRestaurant = (restaurantId) => {
        // Delete the restaurant from the backend
        fetch(`http://127.0.0.1:5000/restaurants/${restaurantId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.status === 200) {
                    // Remove the deleted restaurant from the local state
                    setRestaurants(restaurants.filter((restaurant) => restaurant.id !== restaurantId));
                }
            })
            .catch((error) => console.error('Error deleting restaurant:', error));
    };

    const handleDeleteCustomer = (customerId) => {
        // Delete the customer from the backend API
        fetch(`http://127.0.0.1:5000/customers/${customerId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.status === 200) {
                    // Remove the deleted customer from the local state
                    setCustomers(customers.filter((customer) => customer.id !== customerId));
                }
            })
            .catch((error) => console.error('Error deleting customer:', error));
    };

    return (
        <div>
            <h1>Admin Landing Page</h1>

            <div className="cards-container">
                <div className="card-section">
                    <h2>Restaurants</h2>
                    <div className="card-list">
                        {restaurants.map((restaurant) => (
                            <div className="card" key={restaurant.id}>
                                <strong>{restaurant.restaurant_name}</strong>
                                <p>{restaurant.location}</p>
                                <button onClick={() => handleDeleteRestaurant(restaurant.id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card-section">
                    <h2>Create New Restaurant</h2>
                    <form onSubmit={handleSubmit}>
                    <label>
                    Restaurant Name:
                    <input 
                        type='text'
                        name="restaurant_name"
                        value={formData.restaurant_name}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    Ambience:
                    <input 
                        type='text'
                        name='ambience'
                        value={formData.ambience}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    Cuisines Offered:
                    <input
                        type="text"
                        name="cuisines_offered"
                        	  value={formData.cuisines_offered}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    Operating Hours:
                    <input
                        type="text"
                        name="operating_hours"
                        value={formData.operating_hours}
                        onChange={handleFormChange}
                     />
                </label>
                <label>
                    Contact Info:
                    <input 
                        type='text'
                        name='contact_info'
                        value={formData.contact_info}
                        onChange={handleFormChange}
                    />
                </label>
                <button type='submit'>Create Restaurant</button>
                    </form>
                </div>

                <div className="card-section">
                    <h2>Customers</h2>
                    <div className="card-list">
                        {customers.map((customer) => (
                            <div className="card" key={customer.id}>
                                <strong>{customer.username}</strong>
                                <p>{customer.email}</p>
                                <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
