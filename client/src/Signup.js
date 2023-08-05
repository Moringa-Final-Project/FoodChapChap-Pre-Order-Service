import { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [names, setNames] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

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
    })
    .catch(error => {
        console.error(error);
    });
};

  return (
    <div className='signup'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
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
        <input
          type={'password'}
          placeholder={'Confirm Password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span className='tnc'>By clicking Sign up, you agree to the Terms and Conditions of FoodChapChap</span>
        <button type={'submit'}>Sign up</button>
      </form>
    </div>
  )
}

export default Signup