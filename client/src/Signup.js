import { useState } from 'react';
import './Signup.css';

const Signup = () => {
    const [interest, setInterest]=useState('Choose a User type')
  return (
    <div className='signup'>
        <h1>Sign Up</h1>
        <select className='menu' onChange={(e)=>setInterest(e.target.value)}> 
                <option>Choose a User type</option>
                <option>Customer</option>
                <option>Restaurant</option>
        </select>
        <form>
            <input type={'email'} placeholder={'Email'} />
            <input type={'password'} placeholder={'Password'} />
            <input type={'password'} placeholder={'Confirm Password'} />
            <span>By clicking Sign up, you agree to the Terms and Conditions of FoodChapChap</span>
            <button type={'submit'}>Sign up</button>
        </form>
    </div>
  )
}

export default Signup