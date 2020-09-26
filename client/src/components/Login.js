import React from "react";
import {   useQuery } from "@apollo/client";
import { LoginUser } from "../gql/queries";
import Cookies from 'universal-cookie'
import {Link} from 'react-router-dom'

function Login() {
  const [email, setEmail] = React.useState(null);
  const [password, setPwd] = React.useState(null);
  const [error, setError] = React.useState(false)
  // Login
  const  { data}  = useQuery(LoginUser, {variables: {email,password}})

  const submitHandle =   e => {
    e.preventDefault()
    console.log(data)
    if(data ===null || data === undefined ) {
        // window.location.href="/login"
        setError(true)
    }else {
        const cookies = new Cookies()
        cookies.set("userId", data.login.user.id)
        window.location.href="/home"
    }
  };

  return (
    <div className='login-form'>
      <h3>Login Form</h3>
      <form onSubmit={submitHandle}>
      {error ? <h4 className='err'>Please try again 😃 </h4> : null}
        <div>
          <label>Email:</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" onChange={(e) => setPwd(e.target.value)} required/>
        </div>
        <button>Login</button>
      </form>

    <div>
    <div className='linkToSingup'><Link to='/signup'>Don't have account?Sign up</Link> </div>
    </div>
   
    </div>
  );
}

export default Login;
