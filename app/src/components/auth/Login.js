import React, { useState, useContext } from 'react'
import { FbContext } from '../../store/fbContext';
import { login, logout } from '../../store/actions'

const Login = () => {

  const { user } = useContext(FbContext)
  const [creds, setCreds] = useState({
    email: '',
    pass: ''
  })

  const logoutClick = (e) => {
    logout();
  }

  if(user){
    return(
      <button onClick={logoutClick} className="btn">Logout</button>
    )
  }

  const submit = (e) => {
    e.preventDefault();
    login(creds.email, creds.pass)
    setCreds({
      email: '',
      pass: ''
    })
  }

  const handleChange = (e) => {
    setCreds({
      ...creds,
      [e.target.id] : e.target.value
    })
  }

  return ( 
    <div>
      <form onSubmit={submit}>
        <input onChange={handleChange} value={creds.email} id="email" className="formInput" type="email"></input>
        <input onChange={handleChange} value={creds.pass} id="pass" className="formInput" type="password"></input>
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
   );
}
 
export default Login;