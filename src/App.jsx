import Header from "./components/Header"
import { BrowserRouter as Router , Routes, Route } from "react-router-dom"
import Product from "./components/Product"
import TopSelling from "./components/TopSelling"
import Banner from "./components/Banner"
import FeaturedProduct from "./components/FeaturedProduct"
import Footer from "./components/Footer"
import Checkouts from "./components/pages/Checkouts"
import Details from "./components/pages/Details"
import Cart from "./components/pages/Cart"
import Login from "./components/pages/Login"
import Register from "./components/pages/Register"
import About from "./components/pages/About"
import { EcomProvider } from "./context/EcomContext"
import Alert from "./components/Alert"
import Loader from "./components/pages/Loader"
import {  useEffect, useState } from "react"




function App() {
const [loader, setLoader] = useState(true)

useEffect(() => {
  const timer = setTimeout(() => {
    setLoader(false)
  }, 4000)

  return () => timer;
}, [])
  return (
    <>
    {loader ? <Loader /> : (
    <EcomProvider>
    <Router>
      <Alert />
       <Header/>
       <Routes>
        <Route path="/" element={
          <>
           <Banner/>
            <FeaturedProduct /> 
             <TopSelling /> 
          </>
        } />
        <Route path="/product" element={
          <>
             <Banner/> 
             <Product/>
             <Banner/> 
          </>
        } />

        {/* <Route path="/product" element={<Product />}/> */}
        <Route path="/details/:id" element={<Details />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/checkouts" element={<Checkouts />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
      <Footer/>
    </Router>
    </EcomProvider>
     )}
    </>

  )
}

export default App;
