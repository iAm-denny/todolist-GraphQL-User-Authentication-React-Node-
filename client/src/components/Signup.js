import React from "react";
import { useMutation } from "@apollo/client";
import { AddUser } from "../gql/queries";
import {Link} from 'react-router-dom'

function Signup() {
  const [user, setUser] = React.useState({
    email: "",
    name: "",
    password: "",
  });
  const [existUser, setExistUser] = React.useState(null);
  const [bug, setBug] = React.useState(null);
  const [success, setSuccess] = React.useState(null)
  const [validateError, setValidateError] = React.useState({
    email: true,
    name:true,
    password:true
  })

  // Add User Mutation
  const [addUserMut, { loading }] = useMutation(AddUser);
  function display() {
    if (loading) return <h4 align='center'>Loading...</h4>;
    if (existUser) return <h4 className='err'>{existUser}</h4>;
    if (bug) return <h4 className='err'>{bug}</h4>;
  if(success) return <h4 className='suss'>{success}<Link to="/login"> Login Here</Link></h4>
  }

  //RegeEx
  const emailPatterns =/^[\w]{5,}@[a-zA-Z]{3,}\.[a-zA-Z]{2,}(\.[\w]{2,})?$/
  const passwordPatterns = /^[\w@-]{2,}$/
  //submit Form
  const submitHandle = (e) => {
    e.preventDefault();
    const { email, name, password } = user;
    //validation Error
    if(!emailPatterns.test(email)) {
      return setValidateError({email: false})
    }else if(!passwordPatterns.test(password)) {
      return setValidateError({password: false})
    }
else {
  addUserMut({
    variables: { email, name, password },
  })
    .then(() =>  {return setSuccess("Success Fully Created")})
    .catch((err) => {
      const arrErr = Object.values(err);
      console.log(arrErr)
      if(arrErr[2].includes("E11000")) {
        return setExistUser("User does already exist");
      }
    });
}

  };

  return (
    <div className='signup-form'>

<h3>Signup Form</h3>
{display()}
      <form onSubmit={submitHandle}>
      {validateError.email ?  null : <p className='errTxt'>Please enter validation email</p>}
        <div>
         
          <label>Email:</label>
          <input
            type="text" required
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
            className = { validateError.email ? null : 'emailErrorActive' }
          />
        </div>
        <div>
          <label>DIsplayname:</label>
          <input
            type="text" required
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        {validateError.password ?  null : <p className='errTxt'>Please enter password at least 5 characters.</p>}
        <div>
          <label>Password:</label>
          <input
            type="password" required
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className = { validateError.password ? null : 'passwordErrorActive' }
          />
        </div>
        <button>Create Account</button>
      </form>

      <div><Link to='/login'>Already have an acoount?Login</Link></div>
      
    </div>
  );
}

export default Signup;
