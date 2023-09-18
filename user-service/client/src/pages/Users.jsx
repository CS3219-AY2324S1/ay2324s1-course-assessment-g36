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
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllUsers()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8000/users/"+id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>PeerPrep users</h1>
            <div className='users'>
                {users.map(user=>(
                    <div className="user" key={user.id}>
                        <p>{user.id}</p>
                        <p>{user.email}</p>
                        <button className='deleteButton' onClick={() => handleDelete(user.id)}>Delete</button>
                        <button className='updateButton'><Link to={`/update/${user.id}`}>Update</Link></button>
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