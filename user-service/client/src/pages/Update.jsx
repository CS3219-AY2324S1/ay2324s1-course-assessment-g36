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
  }, [id]);


  const handleChange= (e) => {
    setUser(prev=>({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const email = user.Email;
    axios.put(`http://localhost:3001/users/${id}`, { email }).then((res) => {
        navigate("/");
    });
  }

  return (
    <div className='form'>
      <h1>Update {user.Username}</h1>
      <input type="text" placeholder='email' onChange={handleChange} name="Email"/>
      <button className="formButton" onClick={handleClick}>Update</button>
      <Link to="/">See all users</Link>
    </div>
  )
}

export default Update