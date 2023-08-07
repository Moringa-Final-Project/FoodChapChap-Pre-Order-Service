import React, { useState, useEffect } from 'react';
import './AdminRestaurants.css'

const AdminRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [formData, setFormData] = useState ({
        restaurant_name: "",
        restaurant_image: "",
        location: "",
        ambience: "",
        cuisines_offered: "",
        operating_hours: "",
        contact_info: "",
    });

    useEffect(() => {
        //Fetch restaurants from the backend
        fetch('http://127.0.0.1:5000/restaurants')
        .then((response) => response.json())
        .then((data) => setRestaurants(data))
        .catch((error) => console.error('Error fetching restaurants:', error));
    }, []);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form data to create a new restaurant
        fetch('http://127.0.0.1:5000/restaurants', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Refresh the restaurant list after successful creation
                setRestaurants([...restaurants, data]);
                //Clear form data
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

    const handleDelete = (restaurantId) => {
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
      

    return(
        <div>
            <h1>Admin Landing Page</h1>
            <h2>Restaurants</h2>
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant.id}>
                        <div>
                            <strong>{restaurant.restaurant_name}</strong> ({restaurant.location})
                            <button onClick={() => handleDelete(restaurant.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
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
    );
}

export default AdminRestaurants;
