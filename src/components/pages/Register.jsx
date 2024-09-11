import React, { useContext } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import EcomContext from '../../context/EcomContext'
import AuthContext from '../../context/AuthContext'
import { useState } from 'react'
import { Link ,  Navigate, useNavigate } from 'react-router-dom'
import { FaEyeSlash } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'



function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("client")
    const [confirmPassword, setConfirmPassword] = useState("")
    const { setItem } = useLocalStorage("auth-token");
    const {showHide, isAuthenticated} = useContext(EcomContext)
    const [state, dispatch] = useContext(AuthContext)
    const redirect = useNavigate()



    if (isAuthenticated) {
        return <Navigate to="/"/>
    }

    const registerHandler = async (e) => {
        e.preventDefault();
        console.log("submitted");


        
    try {
        const res = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                firstName,
                lastName,
                phone,
                role,
                password,
                confirmPassword
            })
        })

        const data = await res.json();
        if (data.message) {
            showHide("error", data.message);
        }else if (data === "Password do match") {
            showHide("error", "Password do match")
        }else if (data === "User already exists!...") {
            showHide("error", "User already exists!...");
        }else {
            dispatch({ type: "setToken", payload: data.token });
            setItem(data.token)
            redirect("/login")
            showHide("success", "You have successfully registered")
        }

    } catch (error) {
        console.log(error);
    }

    }
    
  return (
    <>
    <div className='mx-auto max-w-md bg-white logins-reg display m-6 p-2 rounded bg-[#fff] signup'>
           <form className="p-8" onSubmit={registerHandler}>
                <h5 className='text-center font-bold text-2xl pb-4 font-serif'>CREATE AN ACCOUNT</h5>
                <hr className='pb-4' />
              <div className="mb-3 logins">
                <label htmlFor="firstName">First Name*</label>
                <input type="text" name="" id="firstName" className="border-3" placeholder='Enter First Name' onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="mb-3 logins">
                <label htmlFor="lastName">Last Name*</label>
                <input type="text" name="lastName" id="lastName" placeholder='Enter Last Name' onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="mb-3 logins">
                <label htmlFor="email">Email Address*</label>
                <input type="email" name="" id="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-3 logins">
                <label htmlFor="phone">Phone number*</label>
                <input type="tel" name="" id="phone" placeholder='Enter Phone Number' onChange={(e) => setPhone(e.target.value)} />
              </div>
            
              <div className="mb-3 logins">
                <label htmlFor="password">Password*</label>
                <div className="relative">
                <input type={showPassword ? "text" : "password"} name="" id="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />

                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword (!showPassword)}
                 >
                {showPassword ? <FaEyeSlash/> : <FaEye/>}
             </div>
              </div>
            </div>
              <div className="mb-3 logins">
                <label htmlFor="confirmPassword">Confirm Password*</label>
                <div className="relative">
                <input type={showPassword ? "text" : "password"} name="" id="confirmPassword" placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)}
                />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword (!showPassword)}
                 >
                {showPassword ? <FaEyeSlash/> : <FaEye/>}
             </div>
            </div>
         </div>
              <div className='text-center'>
                 <button className={"text-center text-white font-bold  bg-[#502274]  text-l hover:bg-gray-500 hover:text-black"} type="submit">Create an Account</button>
                 <p>By signing up you accept our terms and conditions
                 & privacy policy</p>
              </div>
              
               <hr />
              
              <div className='text-center account'>
                <h1 className='pt-4 text-gray-500 pb-4'>Already have an Account ?</h1>
                <Link to="/login" className='border-solid border-black  log' type="submit">Login</Link>
              </div>
           </form>
       </div>
       </>
       
    //  <div className="text-center mb-[2%]">
    //     <div className="">
    //     <h1 className="mt-[3%] mb-[1%] mx-[30%] bg-blue-950 text-white rounded p-[10px]">
    //     Register Her</h1>
    //     <form onSubmit={registerHandler}>
    //         <div className="mb-3">
    //             <input type="text" placeholder="First Name" className="outline outline-1 p-[10px] w-[30%]" id="firstName" onChange={(e) => setFirstName(e.target.value)}
    //             />
    //         </div>
    //         <div className="mb-3">
    //             <input type="text" placeholder="Last Name" className="outline outline-1 p-[10px] w-[30%]" onChange={(e) => setLastName(e.target.value)}/>
    //         </div>
    //         <div className="mb-3">
    //             <input type="text" placeholder="Phone" className="outline outline-1  p-[10px] w-[30%] " onChange={(e) => setPhone(e.target.value)}/>
                
    //         </div>
    //         <div className="mb-3">
    //             <div className="relative">
    //             <input type={showPassword ? "text" : "password"}  className="outline outline-1  p- [10px] w-[30%]" id="password"   onChange={(e) => setPassword(e.target.value)}
    //             />
    //             <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword (!showPassword)}
    //             >
    //             {showPassword ? <FaEyeSlash/> : <FaEye/>}
    //         </div>
    //      </div>
    //     </div>
    //         <div className="mb-3">
    //             <input type="password" placeholder="confirm password" className="outline outline-1  p-[10px] w-[30%]" onChange={(e) => setConfirmPassword(e.target.value)}/>

    //             <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword (!showPassword)}>
    //             {showPassword ? <FaEyeSlash/> : <FaEye/>}</div>
    //         </div>
    //         <div className="mb-3">
    //             <input type="text" placeholder="Email Address" className="outline outline-1  p-[10px] w-[30%]" onChange={(e) => setEmail(e.target.value)}/>
    //         </div>
    //         <div>
    //             <button type="submit" className="bg-blue-950 p-[10px] text-white rounded-lg">Register Now</button>
    //         </div>
    //     </form>

    //     <d className="mb-3 text-end"></d>
    //     <Link to="/login">Already Have an account</Link>
    //   </div>
    // </div>

  )
}

export default Register