import React from 'react'
import { Link } from 'react-router-dom'
import { BsCart4 } from "react-icons/bs";


function Header() {
  return (
    <div>
        <div className="bg-[#502274] text-[#fff] header">
            <div className="log">
              <Link to="">Simple Enterprise</Link>
            </div>
            <div className='navbar'>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/product">Product</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="">Sign up</Link></li>
                <li><Link to="/cart"><BsCart4 className="text-xl"/>Cart</Link></li>
              </ul>
            </div>
        </div>
    </div>
  )
}

export default Header