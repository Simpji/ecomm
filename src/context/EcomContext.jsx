import {createContext, useEffect, useState } from "react";


const EcomContext = createContext();

export const EcomProvider = ({children}) => {
const [product, setProduct] = useState([])

useEffect(() =>{
    fetchData()
}, [])

const fetchData = async () => {
    try {
        const res = await fetch("http://localhost:3000/product")
        const data = await res.json()
        setProduct(data)
    } catch (error) {
        console.log(error);
    }
}

const featuredProduct = product.filter((product) => product.featured === true)
const topSelling = product.filter((product) => product.topSelling === true)


return(
    <EcomContext.Provider value={{
        product,
        featuredProduct,
        topSelling,
    }}>
        {children}
    </EcomContext.Provider>
)

}

export default EcomContext;
