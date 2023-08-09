import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [names, setNames] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
        names: names,
        phone_number: phoneNumber,
        email: email,
        password: password,
        role: role.toLowerCase(),
    };

    fetch('http://127.0.0.1:5555/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        navigate('/');
    })
    .catch(error => {
        console.error(error);
    });
};

  return (
    <div className='signup'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
        <div className='radio-button'>
          <label>
            <input
              type='radio'
              value='customer'
              checked={role === 'customer'}
              onChange={() => setRole('customer')}
            />
            Customer
          </label>
          <label>
            <input
              type='radio'
              value='restaurant_owner'
              checked={role === 'restaurant_owner'}
              onChange={() => setRole('restaurant_owner')}
            />
            Restaurant Owner
          </label>
        </div>
        <input
          type={'text'}
          placeholder={'Name'}
          value={names}
          onChange={(e) => setNames(e.target.value)}
        />
        <input
          type={'tel'} 
          placeholder={'Phone Number'}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
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
        <span className='tnc'>By clicking Sign up, you agree to the Terms and Conditions of FoodChapChap</span>
        <button type={'submit'}>Sign up</button>
      </form>
    </div>
  )
}

export default Signup