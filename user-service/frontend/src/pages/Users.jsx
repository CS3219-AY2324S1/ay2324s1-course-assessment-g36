import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await axios.get("http://localhost:8000/users")
                setUsers(res.data)
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllUsers()
    }, [])
    return (
        <div>
            <h1>PeerPrep users</h1>
            <div className='users'>
                {users.map(user=>(
                    <div className="user" key={user.id}>
                        <p>{user.id}</p>
                        <p>{user.email}</p>
                        <button className='deleteButton'>Delete</button>
                        <button className='updateButton'>Update</button>
                    </div>
                ))}
            </div>
            <button>
                <Link to="/register">Register now</Link>
            </button>
        </div>
    )
}

export default Users