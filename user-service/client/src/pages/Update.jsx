import React, {useState} from 'react'
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
  const[user, setUser]=useState({
    email:"",
    password:""
  });

  const navigate = useNavigate()
  const location = useLocation()

  const userId = location.pathname.split("/")[2];

  const handleChange= (e) => {
    setUser(prev=>({...prev, [e.target.name]: e.target.value}));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/users/${userId}`, user);
      navigate("/");
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='form'>
      <h1>Update User</h1>
      <input type="text" placeholder='email' onChange={handleChange} name="email"/>
      <input type="text" placeholder='password' onChange={handleChange} name="password"/>
      <button className="formButton" onClick={handleClick}>Update</button>
      <Link to="/">See all users</Link>
    </div>
  )
}

export default Update