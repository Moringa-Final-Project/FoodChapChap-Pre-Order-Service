import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate(); // Access the navigation function

  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    fetch('http://127.0.0.1:5555/login', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Login failed');
        }
      })
      .then((data) => {
        console.log(data);
        // Assuming the server returns the user role in the response
        const userRole = data.role;

        // Redirect to the appropriate landing page based on the user role
        switch (userRole) {
          case 'customer':
            navigate('/customer-landing');
            break;
          case 'admin':
            navigate('/admin-landing');
            break;
          case 'restaurant':
            navigate('/restaurant-landing');
            break;
          default:
            // Handle unexpected roles or error cases
            break;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='login'>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
        <input
          type={'text'}
          placeholder={'User role: Customer or Restaurant'}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <input
          type={'email'}
          placeholder={'Email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={'password'}
          placeholder={'Password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type={'submit'}>Login</button>
      </form>
    </div>
  )
}

export default Login;
