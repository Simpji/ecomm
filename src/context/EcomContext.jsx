import {createContext, useEffect, useState } from "react";
import useAlert from "../hooks/useAlert";


const EcomContext = createContext();

export const EcomProvider = ({children}) => {
const [product, setProduct] = useState([])
const {alertInfo,  showHide} = useAlert()
const [cartItems, setCartItems] = useState([])

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


// adding items to cart
const addToCart = (prod) => {
    const existingItems = cartItems.findIndex( (items) => items.id === prod.id);

    if (existingItems !== -1) {
        const itemsInCart = [...cartItems]
        const updateCartItems = itemsInCart[existingItems]
        updateCartItems.quantity += prod.quantity
        updateCartItems.amount = updateCartItems.price * updateCartItems.quantity
        setCartItems(itemsInCart)
        showHide("error",  "Item already exist" )
    }else{
        setCartItems([
            ...cartItems,
           { ...prod, amount: prod.price * prod.quantity}
        ])
        showHide("success",  "added to cart successfully" )
    }
};

//UP DATE CART ITEM
const updateCartItems  = (id, newQuantity) =>{
    const existingItems = cartItems.findIndex((items) => items.id === id);
    const itemsInCart = [...cartItems]
    const updateCartItems = itemsInCart[existingItems]
    updateCartItems.quantity = parseInt(newQuantity, 10)
    updateCartItems.amount = updateCartItems.price * updateCartItems.quantity
    setCartItems(itemsInCart)
}



// calculate subtotal
const calculateSubTotal = () => {
    return cartItems.reduce((acc, curr) => acc + curr.amount, 0)
}

//calculate vat

const calculateVat = ( vat=0.075) => {
    const subtotal = calculateSubTotal()
    return subtotal * vat;
}

// calculate total amount
const calculateTotalAmount = () =>{
    const subtotal = calculateSubTotal()
    const vat = calculateVat()
    return subtotal + vat;
}

//remove cart item
const removeCartItems = (id) =>{
    if(window,confirm("Are your sure you want to delete?..")){
         const deleteItems = cartItems.filter((items) => items.id !== id);
         setCartItems(deleteItems);
         showHide("success", "Product deleted Successfully")
    }
}


return(
    <EcomContext.Provider value={{
        product,
        alertInfo,
        cartItems,
        featuredProduct,
        topSelling,
        addToCart,
        showHide,
        calculateSubTotal,
        calculateVat,
        calculateTotalAmount ,
        removeCartItems,
        updateCartItems,
    }}>
        {children}
    </EcomContext.Provider>
)

}

export default EcomContext;
