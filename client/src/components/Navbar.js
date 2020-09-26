import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { getUserName} from '../gql/queries'
import {useQuery} from '@apollo/client'

const cookies = new Cookies()
const getCookies = cookies.get('userId')
function Navbar() {
    const { data } = useQuery(getUserName, {variables: {id : getCookies}})
    const sectionStyle = {
        textDecoration: 'none',
        color:'#fff' ,
        padding: "10px",
        backgroundColor: 'rgba(0,0,0,.05)',
      };
    return (
        <nav>
            <div><Link to='/home' style={{ textDecoration: 'none', color:'#fff', fontWeight:"750" }}>ToDoWhat?</Link></div>
   
            { getCookies ? (
                <ul>
                <li className='username'>Welcome, { data ? data.user.name : null } </li>
                <li><Link to="/login"  style={sectionStyle} onClick={e => {  cookies.remove('userId')}}>Logout</Link></li>
                </ul>
            ) :(
                <ul>
                <li><Link to="/login" style={{ textDecoration: 'none', color:'#fff' }}>Login</Link></li>
                <li><Link to='/signup' style={{ textDecoration: 'none', color:'#fff' }}>Sign Up</Link></li>
                </ul>
            )
            
            }
    
   

        </nav>
    )
}

export default Navbar
