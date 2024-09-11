import React from 'react'
import EcomContext from '../../context/EcomContext'
import useLocalStorage from '../../hooks/useLocalStorage';
import AuthContext from '../../context/AuthContext'
import { Link, useNavigate,  Navigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import { useState } from 'react';
import { useContext } from 'react';


function Login() {;
   const [password, setPassword] = useState("")
   const[message, setMessage] =useState("");
   const[ShowPassword, setShowPassword] = useState(false);
   const[btnDisabled, setBtnDisabled] =useState(true);
   const [email, setEmail] = useState("");
   const { setItem, getItem, deleteItem } = useLocalStorage("auth-token");
   const [state, dispatch] = useContext(AuthContext)
   const redirect = useNavigate();
   const {showHide, isAuthenticated, setCartItems, fetchCart } = useContext(EcomContext)

 
     const validatePassword = (e) => {
          if (password === "") {
              setBtnDisabled(true);
              setMessage("Enter your password");
          } else if (password !== "" && password.trim().length < 8) {
              setBtnDisabled(true);
              setMessage("Your Password must be at least 8 letters");
          } else {
              setBtnDisabled(false);
              setMessage("Valid password");
          }
          // setPassword(inputPassword)
          setPassword(e.target.value);
          e.preventDefault();
     }

     if (isAuthenticated) {
      return <Navigate to="/"/>

     }


      const loginHandler = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            showHide("error", "Username and Password is required")
            return;
        }
        try {
            const res = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            }); 
            const data = await res.json();
            if (data.message) {
              showHide("error", data.message)
            }else{
              dispatch({ type: "setToken", payload: data.token });
              setItem(data.token);
              const cartDataItem = json.parse(getItem("cart"));
              if (cartDataItem) {
                await Promise.all(cartDataItem?.products.map(async(item) => {
                  const response = await fetch("http://localhost:8000/api/add-to-cart", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "auth-token": getItem("auth-token")
                    },
                    body: JSON.stringify({ productId: item.product._id, quantity: item.quantity }),
                  });

                  const cartData = await response.json();
                  if (res.ok) {
                    setCartItems(cartData && cartData.products);
                    fetchCart();
                    showHide("success", "added to cart successfully")
                  }else {
                    console.log("Failed to add items to the backend cart");
                  }
                }))
                deleteItem("cart");
              }

              redirect("/")
              showHide("success", "you are now logged in")
            }
        } catch (error) {
           console.log(error); 
        }
    };

  return (
    <div>
         <div className="text-center  border-y-2 border-blue-950 w-[600px] mx-auto m-6 p-5  logins-login">
        <div className="">
        <h1 className="mt-[3%] mb-[2%] mx-[0%] w-[100%] bg-blue-950 text-white p-[10px]">
          <marquee  direction="rights">
        Login Here
       </marquee></h1>
        <form onSubmit={loginHandler}>
            <div className="mb-3 login">
                <input type="email" placeholder="Your Name or Email Address" id="" className="outline outline-1 p-[10px] w-[80%]" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3 login">
                <div className="relative eyes">
                <input value={password} type={ShowPassword ? "text": "password"}  onChangeCapture={(e) => setPassword(e.target.value)} onChange={validatePassword} placeholder="Password"  className="outline outline-1 p-[10px] w-[80%]"  />
                <div className='mt-4'>
                    <label htmlFor="checkbox">Show Password</label>
                    <input type="checkbox" onClick={() => setShowPassword(!ShowPassword)}/>
                </div>
             {message && <p>{message}</p>}
          </div>
         
        </div>
            <div>
                <button type="submit" className="bg-blue-950 p-[10px] text-white rounded-lg">Login Now</button>
            </div>
        </form>
        <div className='mb-3 flex justify-between items-center'>
          <Link to="/register">Don't have an account?...</Link>
          <Link to="">Forgot password?...</Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login