import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { BsCart4 } from "react-icons/bs";
import { useContext } from 'react';
import { IoMenu } from "react-icons/io5";
import EcomContext from '../context/EcomContext';
import AuthContext from '../context/AuthContext';
import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage'

function Header() {
  const [open, setOpen] = useState(false)
  const {cartItems} = useContext(EcomContext)
  const { deleteItem } = useLocalStorage("auth-token");
   const [ state, dispatch ] = useContext(AuthContext);
   const redirect = useNavigate();
   const { isAuthenticated, showHide } = useContext(EcomContext);

   const logout = (e) => {
      e.preventDefault();
      dispatch({ type: "setToken", payload: null})
      deleteItem(null);
      redirect("/login");
      showHide("success", "You are now logged out!...")
   }

  return (
    <>
    <div className="mt-23 bg-[#502274] text-[#fff] header flex items-center justify-evenly py-[15px] px[30px]">
    <a href=""><h1 className="text-[24px] text-white font-bold">Simple Enterprise</h1></a>
 

  <nav className="hidden lg:flex space-x-4 text-white text-[15px]">
    <Link to="/">Home</Link>
    <Link to="/product">Products</Link>
    <Link to="/cart" className="relative">
      <i className="fa-solid fa-cart-shopping"></i>
      <BsCart4 className="text-xl"/>
      <div className="absolute bottom-2 font-bold left-2 bg-white text-center text-black rounded-full h-4 w-4 text-[10px]">
        {cartItems.length}
      </div>
        </Link>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
    {/* {isAuthenticated ? ( <> */}
    <Link onClick={logout}>Logout</Link> 
  </nav>
  
    <button onClick={()=> setOpen(!open)} className="flex items-center justify-center w-[35px] h-[35px] lg:hidden">
    <IoMenu  className="text-3xl text-white"/>
    </button>
    <div onClick={() => setOpen(!open)} className={`fixed lg:hidden top-0 w-full bg-black z-[20] ${open ? "opacity-100 pointer-events-auto" : "opacity-100 pointer-events-none"}`}>
    </div>
    <div className={`fixed lg:hidden left-0 top-0 w-[300px] h-screen overflow-auto z-[30] bg-white transition-all duration-200 ${open ? "translate-x-[0px]" : "translate-x-[-500px]"}`}>

        <nav className="flex flex-col lg:space-x-4 text-black text-[25px] pt-20 px-10">
        <Link to="/">Home</Link>
        <Link to="/product">Products</Link>
        <Link href="/cart" className="relative">
        <BsCart4 className="text-xl" />
        <div className="absolute bottom-2 font-bold left-2 text-white bg-blue-950  text-center rounded w-4 h-4 text-[15px]">
            4
        </div>
        </Link>
        <Link to="/login">Login</Link>
        <Link to="/">Register</Link>
        <Link to="">Logout</Link>
    </nav>
    </div>
    </div>
    </>
  
    
    
  )
}

export default Header