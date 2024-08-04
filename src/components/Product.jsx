import { useContext } from 'react'
import ProductItems from './ProductItems'
import EcomContext from '../context/EcomContext'

function Product() {
  const {product} = useContext(EcomContext)
  return (
    <div>
       <div className="mx-[5%] max-w-6xl mx-auto">
        <h1 className="py-[10px] text-xl font-bold">All Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {product.map((items, index) => (
                <ProductItems key={index} product_item_prop={items}/>
            ))}
        </div>
    </div>
    </div>
  )
}

export default Product