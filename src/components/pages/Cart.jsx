import React from 'react'
import { Link } from 'react-router-dom'
import { FaCheck } from "react-icons/fa";
import { MdOutlinePlaylistRemove } from "react-icons/md";


function Cart() {
  return (
    <div>
        <div className="container max-w-5xl mx-auto my-24">
            <div className="grid grid-cols-1">
                <div className="p-3 table">
                    <table>
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Product Images</th>
                            <th>Price</th>
                            <th>Quanitity</th>
                            <th>Amount</th>
                            <th>Update</th>
                            <th>Remove</th>
                            </tr>
                        </thead>

                    {/* </table> */}

                    <tbody>
                    <tr>
                        <td>Product 1</td>
                        <td className="flex align-center justify-center"><img src="/img/tekp.jpg" width="50px" alt="" /></td>
                        <td>#4657</td>
                        <td>67</td>
                        <td>#647675</td>
                        <td>
                           <form action="">
                                <input type="number"  value="1" name="" id=""/>
                                <button type="submit"><FaCheck/></button>
                           </form>
                        </td>
                        <td>
                           <form action="">
                                <input type="hidden"  value="1" name="" id=""/>
                                <button type="submit"><MdOutlinePlaylistRemove /></button>
                           </form>
                        </td>
                    </tr>
                    <tr>
                        <td>Product 1</td>
                        <td className="flex align-center justify-center"><img src="/img/tekp.jpg" width="50px" alt="" /></td>
                        <td>#4657</td>
                        <td>67</td>
                        <td>#647675</td>
                        <td>
                           <form action="">
                                <input type="number"  value="1" name="" id=""/>
                                <button type="submit"><FaCheck/></button>
                           </form>
                        </td>
                        <td>
                           <form action="">
                                <input type="hidden"  value="1" name="" id=""/>
                                <button type="submit"><MdOutlinePlaylistRemove /></button>
                           </form>
                        </td>
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
                            <td className="">Subtotal: # 4657</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="">VAT (7.5%): 4657.098</td>
                        </tr>
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
}

export default Cart