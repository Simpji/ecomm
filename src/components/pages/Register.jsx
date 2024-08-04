import React from 'react'

function Register() {
  return (
   
     <div className="text-center mb-[2%]">
        <div className="">
        <h1 className="mt-[3%] mb-[1%] mx-[30%] bg-blue-950 text-white rounded p-[10px]"><marquee  direction="rights">
        Register Here
       </marquee></h1>
        <form action="">
            <div className="mb-3">
                <input type="text" placeholder="First Name" className="outline outline-1 p-[10px] w-[30%]"/>
            </div>
            <div className="mb-3">
                <input type="text" placeholder="Last Name" className="outline outline-1 p-[10px] w-[30%]"/>
            </div>
            <div className="mb-3">
                <input type="text" placeholder="Phone" className="outline outline-1  p-[10px] w-[30%]"/>
            </div>
            <div className="mb-3">
                <input type="text" placeholder="Email Address" className="outline outline-1  p-[10px] w-[30%]"/>
            </div>
            <div>
                <button className="bg-blue-950 p-[10px] text-white rounded-lg">Register Now</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Register