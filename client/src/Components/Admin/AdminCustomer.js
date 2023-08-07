import React, { useState, useEffect } from 'react';

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch customers from the backend
    fetch('http://127.0.0.1:5000/customer', {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify
    })
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error('Error fetching customers:', error));
  }, []);

  return (
    <div>
      <h1>Customer List</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerList;


