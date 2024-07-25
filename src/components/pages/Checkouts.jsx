import React from 'react'

function Checkouts() {
  return (
    <div>
      <div className="container max-w-6xl p-3 mx-auto my-24">
        <div className='grid grid-cols-1 md:grid-cols-2 shadow-xl'>
          <div className="p-3 table">
            <h1 className='text-2xl my-5 uppercase font-bold text-center'>Order Summary</h1>

            <table>
              <thead>
                <th>Name</th>
                <th>Product Image</th>
                <th>Quanitity</th>
                <th>Amount</th>
              </thead>

              <tbody>
                <tr>
                  <td>Product 1</td>
                  <td className="flex align-center justify-center">
                    <img src="/img/tekp.jpg" alt="" width="50px" />
                  </td>

                  <td>67</td>
                  <td>#64767567</td>
                </tr>
                <tr>
                  <td>Product 2</td>
                  <td className="flex align-center justify-center">
                    <img src="/img/tekp.jpg" alt="" width="50px" />
                  </td>

                  <td>67</td>
                  <td>#64767567</td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="">Total:  4657.098</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <div className="cform">
              <h1 className="text-end text-xl font-bold border-b pb-3">Delivery Details</h1>
              <form action="">
                <div>
                  <label htmlFor="">Full Name</label>
                  <input type="text" name="" id="" placeholder="Enter name"/>
                </div>
                <div>
                  <label htmlFor="">Email Address</label>
                  <input type="text" name="" id="" placeholder="Email address"/>
                </div>
                <div>
                  <label htmlFor="">Phone Number</label>
                  <input type="text" name="" id="" placeholder="Your number"/>
                </div>
                <div>
                  <label htmlFor="">Address</label>
                  <input type="text" name="" id="" placeholder="Address"/>
                </div>

                <div>
                  <button className="product-btn p-2 text-[#fff] rounded capitalize  hover:bg-[#A42CD6] bg-[#502274]">Pay Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkouts