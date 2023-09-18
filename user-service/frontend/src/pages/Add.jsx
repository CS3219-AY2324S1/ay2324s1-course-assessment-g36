import React from 'react'

const Add = () => {
  const[user, setUser]=useState({
    email:"",
    password:""
  })
  return (
    <div className='form'>
      <h1>Add new user</h1>
      <input type="text" placeholder='email'/>
      <input type="text" placeholder='password'/>
    </div>
  )
}

export default Add