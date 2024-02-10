import React from 'react'
import {Routes,Route,Link} from 'react-router-dom'
import Homepage from './Homepage'
import Signup from './Signup'
import Login from './Login'
import Posts from './Posts'

const Navbar = () => {
  return (
    <div>
        <div>
            <Link to="/" >Home</Link>        <span> </span>
            <Link to="/signUp">SignUp</Link> <span> </span>
            <Link to="/login">Login</Link>  <span> </span>
            <Link to="/posts">Post</Link>   <span></span>
            <button>LogOut</button>

        </div>
        
    <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/signUp" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/posts" element={<Posts/>} />
        
    </Routes>
    </div>
  )
}

export default Navbar