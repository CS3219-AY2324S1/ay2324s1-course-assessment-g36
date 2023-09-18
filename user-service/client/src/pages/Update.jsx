import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const Update = () => {
  const[user, setUser]=useState({});


  const navigate = useNavigate()
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/users/${id}`).then((res) => {
        setUser(res.data);
    });
  });


  const handleChange= (e) => {
    setUser(prev=>({...prev, [e.target.name]: e.target.value}));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/users/${id}`, user);
      navigate("/");
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='form'>
      <h1>Update {user.Username}</h1>
      <input type="text" placeholder='email' onChange={handleChange} name="email"/>
      <input type="text" placeholder='email' onChange={handleChange} name="email"/>
      <input type="text" placeholder='password' onChange={handleChange} name="password"/>
      <button className="formButton" onClick={handleClick}>Update</button>
      <Link to="/">See all users</Link>
    </div>
  )
}

export default Update