import React from 'react'
import { useContext } from 'react'
import EcomContext from '../../context/EcomContext'
import { Navigate } from 'react-router-dom'

function Checkouts() {
  const {cartItems, calculateTotalAmount, isAuthenticated} = useContext(EcomContext)

  if(!isAuthenticated){
    return <Navigate to="/login" />
  }

  const handlePayment = async (e) => {
    e.preventDefault();

    const amount = calculateTotalAmount().toFixed(2);
    const firstName = e.target.elements.firstName.value;
    const lastName = e.target.elements.lastName.value;
    const email = e.target.elements.email.value;
    const phone = e.target.elements.phone.value;
    const address = e.target.elements.address.value;
    const currency = e.target.elements.currency.value;


    try {
      const res = await fetch("http://localhost:8000/api/payment/inititate", {
        method: "POST",
        header: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`
        },
        body: JSON.stringify({
          firstName,
          lastName,
          amount,
          email,
          currency,
          address,
          phone
        })
      })
      const data = await res.json();
      if (res.ok){
        window.location.href = data.link;
        console.log(data.link);
      }else{
        res.json("something went wrong")
      }
    } catch (error) {
      console.log(error);
    }
  }
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
                <th>Quantity</th>
                <th>Amount</th>
              </thead>

              <tbody>
                {cartItems?.products?.map((item) =>(
                  <>
                  <tr key={item.product?._id}>
                  <td>{item.product?.name}</td>
                  <td className="flex align-center justify-center">
                    <img src={item.product?.images[0]?.img} alt="" width="50px" />
                    
                  </td>
                  <td>{item.quantity}</td>
                  <td>NGN{item.amount}</td>
                </tr>
                </>
                ))}
                
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  {/* <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td> */}
                  <td className="">Total:  #{calculateTotalAmount().toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <div className="cform">
              <h1 className="text-end text-xl font-bold border-b pb-3">Delivery Details</h1>
              <form onSubmit={(e) => handlePayment(e)}>
                <div>
                  <label htmlFor="">firstName</label>
                  <input type="text" name="firstName" id="" placeholder="firstName"/>
                </div>
                <div>
                  <label htmlFor="">lastName</label>
                  <input type="text" name="lastName" id="" placeholder="lastName"/>
                </div>
                <div>
                  <label htmlFor="">Email Address</label>
                  <input type="text" name="email" id="" placeholder="Email"/>
                </div>
                <div>
                  <label htmlFor="">Phone Number</label>
                  <input type="text" name="phone" id="" placeholder="phone"/>
                </div>
                <div className='flex flex-wrap gap-2 border-2 outline-0 p-rounded-xl'>
                  <select name="currency" id="currency">
                    <option value="NGN">NGN</option>
                    <option value="USD">USD</option>
                  </select>
                  <h2 className="text-xl font-semibold" name="amount">{calculateTotalAmount().toFixed(2)}</h2>
                  {/* <input type="text" name="phone" id="" placeholder="phone"/> */}
                </div>
                <div>
                  <label htmlFor="">Address</label>
                  <input type="text" name="address" id="" placeholder="Address"/>
                </div>

                <div>
                  <button className="product-btn p-2 text-[#fff] rounded capitalize  hover:bg-[#A42CD6] bg-[#502274]" type="submit">Pay Now</button>
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