import React from 'react'
import { Link } from 'react-router-dom'

function Banner() {
  return (
    <div>
        {/* <div className='steph'>
            <img src="/img/smart10.jpg" alt="" />
            <div className='like'></div>
            <div className='steph-container font-bold text-4xl uppercase text-[#fff]'>
                <h2>Welcome to Simple Stores</h2>
                <h2>Lorem ipsum dolor sit amet consectetur.</h2>
                <Link to="" className=''>See Products</Link>
            </div>
        </div> */}

    <div id="demo" className="carousel slide steph" data-bs-ride="carousel">

       
        <div className="carousel-indicators">
            <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
        </div>

        
        <div className="carousel-inner steph">
            <div className="carousel-item active steph">
                <img src="/img/ipoint9.jpg" alt="Los Angeles" className="d-block w-100"  />
                <div className='like'></div>
                <div className="carousel-caption steph-container font-bold text-4xl uppercase text-[#fff]">
                    <h2>Welcome to Simple Stores</h2>
                   <h2>Lorem ipsum dolor sit amet consectetur.</h2>
                  <Link to="" className=''>See Products</Link>
                </div>
            </div>
            <div className="carousel-item steph">
                <img src="/img/ipoint6.jpg" alt="Chicago" className="d-block w-100"  />
                <div className="carousel-caption steph-container font-bold text-4xl uppercase text-[#fff]">
                    <h2>Welcome to Simple Stores</h2>
                   <h2>Lorem ipsum dolor sit amet consectetur.</h2>
                  <Link to="" className=''>See Products</Link>
                </div>
            </div>
            <div className="carousel-item steph">
                <img src="/img/ipoint5.webp" alt="New York" className="d-block w-100" />
                <div className="carousel-caption steph-container font-bold text-4xl uppercase text-[#fff]">
                    <h2>Welcome to Simple Stores</h2>
                   <h2>Lorem ipsum dolor sit amet consectetur.</h2>
                  <Link to="" className=''>See Products</Link>
                </div>
            </div>
        </div>

     
        <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
        </button>
    </div>
  </div>

  )
}

export default Banner;