import React from 'react'
import { Link } from 'react-router-dom'
import { FaCheck } from "react-icons/fa";
import { MdOutlinePlaylistRemove } from "react-icons/md";
import { useContext } from 'react';
import EcomContext from '../../context/EcomContext';


function Cart() {
     const { cartItems, calculateSubTotal, calculateVat, calculateTotalAmount,  removeCartItems, updateCartItems }=useContext(EcomContext)

     const cartTable = (
        <div>
        <div className="container max-w-5xl mx-auto my-24">
            <div className="grid grid-cols-1">
                <div className="p-3 table">
                    <table>
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Amount</th>
                            <th>Quantity</th>
                            {/* <th>Update</th> */}
                            <th>Remove</th>
                            </tr>
                        </thead>

                  

                    <tbody>
                        {cartItems.map((items, index)=>(
                            <tr key={index}>
                                <td>{items.name}</td>
                                <td className="flex align-center justify-center"><img src={items.img} width="50px" alt="" /></td>
                                <td>#{items.price}</td>
                                <td>#{items.amount}</td>
                                <td>
                                    <input type="number" value={items.quantity} className="outline outline-1"min={1} onChange={(e) => updateCartItems(items.id, e.target.value)}   name="" id=""/>
                                    <button type="submit"><FaCheck /></button>
                                </td>
                                <td>
                                    <button type="submit" onClick={() => removeCartItems(items.id)}><MdOutlinePlaylistRemove /></button>
                                </td>
                            </tr>
                    ))}
                   
                   
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
                            <td className="">Subtotal: # {calculateSubTotal().toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="">VAT (7.5%): #{calculateVat().toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="">Total:  #{calculateTotalAmount().toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><Link to="/checkouts" className="product-btn p-2 text-[#fff] rounded capitalize  hover:bg-[#A42CD6] bg-[#502274]">Checkout</Link></td>
                        </tr>
                    </tbody>
                 </table>
                </div>
            </div>
        </div>
    </div>
     )
  return (
     <div className="my-[5%] mx-[7%]">
       <h1 className="text-center font-bold text-3xl mb-[5%]">Your Shop Cart</h1>
       {cartItems.length > 0 ? cartTable : <p className="text-center">No Items in Cart</p>}
     </div>
  )
}

export default Cart