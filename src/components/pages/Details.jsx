import { useContext } from 'react'
import EcomContext from '../../context/EcomContext'
import { useParams } from 'react-router-dom'

function Details() {
  const {product}  = useContext(EcomContext)
  const param = useParams();
  // const showIttems = params.id
  // const ProductItems = product.find((items) => parseInt(items.id) === parseInt(showIttems))
  const showItems = param.name
  const productItems = product.find((items) => items.name === showItems)
  return (
    <div>
      <div className="container max-w-5xl mx-auto my-24">
      <h1 className='text-2xl my-5 uppercase font-bold text-center'>{productItems.name} Details</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 align-center justify-center'>
          <div>
            <img src={`http://localhost:3000/${productItems.img}`} alt="" />
            {/* <img src={productItems.img} alt="" /> */}
          </div>
          <div>
              <div className='card-body'>
                  <h2 className='text-xl font-bold uppercase pt-3 pb-3'>{productItems.name}</h2>
                  <h5 className='text-xl font-bold uppercase pt-3 pb-3'>#{productItems.price}</h5>
                  <p className='pb-5'>{productItems.description}</p>
                  <button type="submit" className='product-btn p-2 text-[#fff] rounded capitalize hover:bg-[#A42CD6] bg-[#502274]'>Add to Cart</button>
               </div>
              </div>
           </div>
        </div>
      </div>
  )
}

export default Details