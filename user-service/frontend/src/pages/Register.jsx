import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const[user, setUser]=useState({
    email:"",
    password:""
  });

  const navigate = useNavigate()

  const handleChange= (e) => {
    setUser(prev=>({...prev, [e.target.name]: e.target.value}));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/users", user);
      navigate("/");
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='form'>
      <h1>Register</h1>
      <input type="text" placeholder='email' onChange={handleChange} name="email"/>
      <input type="text" placeholder='password' onChange={handleChange} name="password"/>
      <button onClick={handleClick}>Register</button>
    </div>
  )
}

export default Register