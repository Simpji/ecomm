import Header from "./components/Header"
import { BrowserRouter as Router , Routes, Route } from "react-router-dom"
import { useState } from "react"
import Product from "./components/Product"
import TopSelling from "./components/TopSelling"
import Banner from "./components/Banner"
import FeaturedProduct from "./components/FeaturedProduct"
import Footer from "./components/Footer"
import ProductData from "./data/productData"
import Checkouts from "./components/pages/Checkouts"
import Details from "./components/pages/Details"
import Cart from "./components/pages/Cart"
import Login from "./components/pages/Login"
import About from "./components/pages/About"
import { EcomProvider } from "./context/EcomContext"




function App() {
  return (
    <>
    <EcomProvider>
    <Router>
       <Header/>
        <Banner/>
       <Routes>
        <Route path="/" element={
          <>
              <FeaturedProduct /> 
             <TopSelling /> 
          </>
        } />

        <Route path="/product" element={<Product />}/>
        <Route path="/details/:name" element={<Details />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/checkouts" element={<Checkouts />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/about" element={<About />}/>
      </Routes>
      <Footer/>
    </Router>
    </EcomProvider>
    </>
  )
}

export default App;
