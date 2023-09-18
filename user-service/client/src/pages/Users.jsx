import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/users").then((res) => {
            setUsers(res.data)
        });
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:3001/users/"+id)
            setUsers((prevList) => prevList.filter(user => user.UserId !== id));
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>PeerPrep users</h1>
            <div className='users'>
                {users.map((value, key)=>(
                    <div className="user" key={value.UserId}>
                        <p>{value.UserId}</p>
                        <p>{value.Username}</p>
                        <p>{value.Email}</p>
                        <button className='deleteButton' onClick={() => handleDelete(value.UserId)}>Delete</button>
                        <button className='updateButton'><Link to={`/update/${value.UserId}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button>
                <Link to="/register">Register now</Link>
                {/* <Link to="/login">Login</Link> */}
            </button>
        </div>
    )
}

export default Users