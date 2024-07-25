import { useContext } from 'react'
import ProductItems from './ProductItems'
import EcomContext from '../context/EcomContext'

function FeaturedProduct() {
  const {featuredProduct}= useContext(EcomContext)
  return (
     <div>
     <h1 className='text-2xl  my-5 uppercase font-bold text-center'>Featured Product</h1>
    <div className='container max-w-6xl flex'>
        <div className='flex gap-3 items'>
            {featuredProduct.map((items, index) => (
                <ProductItems key={index} product_item_prop={items}/>
            ))}
           </div>
        </div>
    </div>
  )
}

export default FeaturedProduct