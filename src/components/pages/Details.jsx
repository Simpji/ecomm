import { useContext, useEffect, useState } from 'react'
import EcomContext from '../../context/EcomContext'
import { useParams } from 'react-router-dom'
import ProductImages from '../ProductImages';

function Details() {
  const {product, addToCart}  = useContext(EcomContext)
  const params = useParams();
  const showItems = params.id
  const productItems = product.find((items) => parseInt(items.id) === parseInt(showItems))
  const [selectedImages, setSelectedImages] = useState(productItems?.images?.[0].img)

  useEffect(() => {
    setSelectedImages(productItems?.images?.[0].img)
  }, [productItems])
  return (
    <div>
      <div className="container max-w-5xl mx-auto my-24">
      <h1 className='text-2xl my-5 uppercase font-bold text-center'>{productItems?.name} Details</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 align-center justify-center'>
          <div>
            <img src={selectedImages} alt=""/>
            {/* <img src={`http://localhost:3000/${productItems?.img}`} alt="" /> */}
          </div>
          <div>
              <div className='card-body'>
                  <h2 className='text-xl font-bold uppercase pt-3 pb-3'>{productItems?.name}</h2>
                  <h5 className='text-xl font-bold uppercase pt-3 pb-3'>#{productItems?.price}</h5>
                  <p className='pb-5'>{productItems?.description}</p>
                  <button onClick={() => addToCart({...productItems, quantity: 1})} type="submit" className='product-btn p-2 text-[#fff] rounded capitalize hover:bg-[#A42CD6] bg-[#502274]'>Add to Cart</button>
               </div>
               <div className="pack text-xl">
                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus recusandae nemo fugit neque! Inventore explicabo rem tempora magnam, optio nemo cum, perferendis eaque dignissimos nulla incidunt, error dolores. Iure officiis aut animi illo, iste, neque fugit dicta maiores incidunt quidem harum consectetur? Quaerat libero quae, nisi labore perferendis iusto voluptate? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi neque omnis quae deserunt nam! Nisi cum sed temporibus recusandae error reprehenderit quia eos repellat, earum perspiciatis accusantium ex ipsam odit, natus voluptatibus ad aut nihil libero quibusdam a, asperiores voluptatem ipsa? Sed, sint inventore quidem iusto nostrum aperiam dolore culpa.</p> */}
               </div>
               <ProductImages images={productItems?.images} setSelectedImages={setSelectedImages} />
              </div>
           </div>
        </div>
      </div>
  )
}

export default Details;