import {createContext, useContext, useEffect, useState } from "react";
import useAlert from "../hooks/useAlert";
import AuthContext from "./AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";


const EcomContext = createContext();

export const EcomProvider = ({children}) => {
const [product, setProduct] = useState([])
const {alertInfo,  showHide} = useAlert()
const [cartItems, setCartItems] = useState([])
const [order, setOrder] = useState(null)
const [state, dispatch] = useContext(AuthContext);
const isAuthenticated = state.accessToken  !== null;
const { setItem, getItem } =  useLocalStorage();

useEffect(() =>{
    fetchData();
    fetchCart();
}, [])

const fetchData = async () => {
    try {
        const res = await fetch("http://localhost:8000/api/product")
        const data = await res.json()
        setProduct(data)
    } catch (error) {
        console.log(error);
    }
}

const featuredProduct = product.filter((product) => product.featured === true)
const topSelling = product.filter((product) => product.topSelling === true)


// adding items to cart
const addToCart =  async (productId, quantity, product) => {
    if (isAuthenticated) {
        //if isAuthenticated
        try {
            const res = await fetch("http://localhost:8000/api/add-to-cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                },
                body: JSON.stringify({ productId, quantity })
            })
            const data = await res.json();
            if (res.ok) {
                setCartItems(data);
                showHide("success", "You have successfully added item to cart");
            }else{
                showHide("error", "product was not added to cart")
            }
        } catch (error) {
            console.log(error);
        }
          //if unauthenticated
    } else {
        const storedCart = JSON.parse(getItem("cart")) || { products: [] };
        const ItemIndex = storedCart.products.findIndex(
            (item) => item.product._id === productId
        );

        if (ItemIndex >= 0) {
            storedCart.products[ItemIndex].quantity += 1;
            storedCart.products[ItemIndex].amount = product.price * storedCart.products[ItemIndex].quantity;
        }else{
            storedCart.products.push({
                product,
                quantity: 1,
                amount: product.price * 1,
            })
            console.log(product);
        }

        localStorage.setItem("cart", JSON.stringify(storedCart));
        showHide("success", "product added to cart successfully");
        setCartItems(storedCart);
    }
    };


// fetch cart
const fetchCart = async () => {
   if (isAuthenticated) {
     const res = await fetch("http://localhost:8000/api/cart", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`
        }
    })
    const data = await res.json();
    if (res.ok) {
        setCartItems(data.products)
    }else{
        showHide("error", "Could not get cart")
    }
   } else {
    const localCart = getItem("cart");
    console.log(localCart);
    if (localCart) {
        setCartItems(JSON.parse(localCart));
    }else{
        setCartItems([]);
    }
   }
}

// const addToCart = (prod) => {
//     const existingItems = cartItems.findIndex( (items) => items.id === prod.id);

//     if (existingItems !== -1) {
//         const itemsInCart = [...cartItems]
//         const updateCartItems = itemsInCart[existingItems]
//         updateCartItems.quantity += prod.quantity
//         updateCartItems.amount = updateCartItems.price * updateCartItems.quantity
//         setCartItems(itemsInCart)
//         showHide("error",  "Item already exist" )
//     }else{
//         setCartItems([
//             ...cartItems,
//            { ...prod, amount: prod.price * prod.quantity}
//         ])
//         showHide("success",  "added to cart successfully" )
//     }
// };

//UP DATE CART ITEM
const updateCartItems  = async(productId, quantity) =>{
    if (isAuthenticated) {

        try {
        const res = await fetch("http://localhost:8000/api/update-cart", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": `${localStorage.getItem("auth-token")}`,
            },
            body: JSON.stringify({ productId, quantity })
        })
        const data = await res.json()
        if (res.status === 200){
        const existingItems = cartItems.products?.findIndex((items) => items.product._id === productId);
        if (existingItems !== -1) {
         const itemsInCart = [...cartItems.products]
         const updateCartItems = itemsInCart[existingItems]
         updateCartItems.quantity = parseInt(quantity, 10)
         updateCartItems.amount = updateCartItems.product.price * updateCartItems.quantity
         setCartItems({ ...cartItems, products: itemsInCart });
          showHide("success", "Cart updated successfully");
     }else{
        showHide("error",  "Could not update cart")
     }
        }
        
    } catch (error) {
        console.log(error);
    }
        
    } else {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || {
            products: [],
        }
        const ItemIndex = storedCart.products.findIndex(
            (item) => item.product._id === productId
        );

        if (ItemIndex >= 0) {
            if (quantity === 0) {
                storedCart.products.splice(ItemIndex, 1);
            } else {
                storedCart.products[ItemIndex].quantity = parseInt(quantity, 10);
                storedCart.products[ItemIndex].amount = storedCart.products[ItemIndex].product.price * storedCart.products[ItemIndex].quantity;
            }
            localStorage.setItem("cart", JSON.stringify(storedCart));
            setCartItems(storedCart.products);
            showHide("success", "cart updated successfully")
        }
    }
    
}

const createOrder = async( transaction_id, orderId) => {
    try {
        const res = await fetch("http://localhost:8000/api/payment/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": `${localStorage.getItem("auth-token")}`,
            },
            body: JSON.stringify({ transaction_id , orderId})
        })
        const data = await res.json()
        if (res.ok) {
            setOrder(data.order)
            console.log(data.order);
            setCartItems([])
        }else{
            showHide("error", "insufficient funds!...Credit your acct boss")
        }
    } catch (error) {
        console.log(error);
    }
}

// const existingItems = cartItems.findIndex((items) => items.id === id);
//     const itemsInCart = [...cartItems]
//     const updateCartItems = itemsInCart[existingItems]
//     updateCartItems.quantity = parseInt(newQuantity, 10)
//     updateCartItems.amount = updateCartItems.price * updateCartItems.quantity
//     setCartItems(itemsInCart)



// calculate subtotal
const calculateSubTotal = () => {
    return cartItems.products?.reduce((acc, curr) => acc + curr.amount, 0)
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
const removeCartItems =  async (productId) =>{
     if(window,confirm("Are your sure you want to delete?..")){
        if (isAuthenticated) {
           try {
         const res = await fetch("http://localhost:8000/api/delete-cart", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": `${localStorage.getItem("auth-token")}`
            },
            body: JSON.stringify({ productId })
         })
         const data = await res.json()
         if(res.ok){
            showHide("success", "Your product is successfully delete")
            setCartItems(data || data.product)
            }
        } catch (error) {
            console.log(error);
            
        } 
      } else {
         const storedCart = JSON.parse(localStorage.getItem("cart")) || {
            products: [],
         }
         const ItemIndex = storedCart.products.findIndex(
            (item) => item.product._id === productId
         );

         if (ItemIndex >= 0) {
            storedCart.products.splice(ItemIndex, 1)
            localStorage.setItem("cart", JSON.stringify(storedCart))
            setCartItems(storedCart);
            showHide("success", "Product removed from cart successfully")
         } else {
            showHide("error", "Product not found in cart..!")
         }
        }
        }
    
}

//  const deleteItems = cartItems.filter((items) => items.id !== id);
//          setCartItems(deleteItems);
//          showHide("success", "Product deleted Successfully")


return(
    <EcomContext.Provider value={{
        product,
        alertInfo,
        cartItems,
        featuredProduct,
        topSelling,
        isAuthenticated,
        addToCart,
        showHide,
        calculateSubTotal,
        calculateVat,
        calculateTotalAmount ,
        removeCartItems,
        updateCartItems,
        createOrder,
        order,
    }}>
        {children}
    </EcomContext.Provider>
)

}

export default EcomContext;
