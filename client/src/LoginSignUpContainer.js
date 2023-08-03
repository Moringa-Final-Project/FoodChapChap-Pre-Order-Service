import { useRef, useState } from 'react';
import "./LoginSignUpContainer.css";
import Login from './Login';
import Signup from './Signup';

function LoginSignUpContainer() {
  const [login, setLogin] = useState(true);

  const loginSignUpContainerRef = useRef(null);
  
  const handleClick =()=>{
    setLogin(!login);
    
    loginSignUpContainerRef.current.classList.toggle("active");
  }

  return (
    <div className='login-signup-container' ref={loginSignUpContainerRef}>
        <Login />
        <div className='side-div'>
            <button type = 'button' onClick={handleClick} > {login ? "Signup" : "Login"}</button>
        </div>
        <Signup />
    </div>
  )
}

export default LoginSignUpContainer