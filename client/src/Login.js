import { useState } from 'react';
import './Login.css';

const Login = () => {
    const [interest, setInterest]=useState('Choose a User type')
  return (
    <div className='login'>
        <h1>Login</h1>
        <select className='menu' onChange={(e)=>setInterest(e.target.value)}> 
                <option>Choose a User type</option>
                <option>Customer</option>
                <option>Restaurant</option>
                <option>Admin</option>
        </select>
        <form>
            <input type={'email'} placeholder={'Email'} />
            <input type={'password'} placeholder={'Password'} />
            <button type={'submit'}>Login</button>
        </form>
    </div>
  )
}

export default Login