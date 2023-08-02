import { useState } from 'react';
import './Login.css';

const Login = () => {

  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Create the login request body in the format expected by the backend
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    // Send the login request to the backend endpoint
    fetch('http://127.0.0.1:5000/login', {
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
        // Handle successful login response here (e.g., set user state, store token, redirect, etc.)
        console.log(data);
      })
      .catch((error) => {
        // Handle login error here (e.g., show error message to the user)
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

export default Login