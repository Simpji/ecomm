import React from 'react'

function Login() {
  return (
    <div>
         <div className="text-center border-y-2 border-blue-950 w-[600px] mx-auto m-6 p-5">
        <div className="">
        <h1 className="mt-[3%] mb-[2%] mx-[0%] w-[100%] bg-blue-950 text-white p-[10px]">
          <marquee  direction="rights">
        Login Here
       </marquee></h1>
        <form action="">
            <div className="mb-3 login">
                <input type="text" placeholder="Your Name or Email Address" className="outline outline-1 p-[10px] w-[80%]"/>
            </div>
            <div className="mb-3 login">
                <input type="text" placeholder="Password" className="outline outline-1 p-[10px] w-[80%]"/>
            </div>
            <div>
                <button className="bg-blue-950 p-[10px] text-white rounded-lg">Login Now</button>
            </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Login