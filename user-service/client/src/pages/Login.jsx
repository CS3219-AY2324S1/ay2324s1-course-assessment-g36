import React, {useState} from 'react'
import axios from 'axios';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        const data = {Email: email, Password: password}
        axios.post("http://localhost:3001/users/login", data).then((res) => {
            console.log(res.data)
        })
    }

  return (
    <div className='loginContainer'>
        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)}/>
        
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={login}>Login</button>
    </div>
  )
}

export default Login