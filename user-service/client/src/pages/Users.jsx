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
            setUsers((prevList) => prevList.filter(user => user.userId !== id));
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>PeerPrep users</h1>
            <div className='users'>
                {users.map((value, key)=>(
                    <div className="user" key={value.userId}>
                        <p>{value.userId}</p>
                        <p>{value.username}</p>
                        <p>{value.email}</p>
                        <button className='deleteButton' onClick={() => handleDelete(value.userId)}>Delete</button>
                        <button className='updateButton'><Link to={`/update/${value.userId}`}>Update</Link></button>
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