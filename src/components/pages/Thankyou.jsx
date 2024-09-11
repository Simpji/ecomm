import { useContext, useEffect } from "react";
import { Link, Navigate, useSearchParams} from "react-router-dom";
import EcomContext  from "../../context/EcomContext";

function Thankyou() {
  const { createOrder, order, isAuthenticated } = useContext(EcomContext);
  const [ searchParams ] = useSearchParams();
  const tx_ref = searchParams.get("tx_ref");
  const transaction_id = searchParams.get("transaction_id ");

  if(!isAuthenticated) {
    return <Navigate to="/login"/>
  }

  useEffect(() => {
      if(transaction_id && tx_ref ){
        createOrder(transaction_id, tx_ref)
      }
    }, [transaction_id, tx_ref, createOrder])

  return (
    <div className="py-[5%] px-[10%] md bg-cover bg-no-repeat bg-enter" style={{backgroundImage: `url(/img/thanks.jpeg)`, height: `100vh`}}>
        <img src="" alt="" />
       <div className="bg-white py-[20px] opacity-80 text-center">
         <p className="text-xl">Thank you for your purchase. A representative will contact you shorty, Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio odit, saepe ut voluptatem eius officiis voluptate delectus dolores placeat harum.</p>
        <Link to="/products">
        <button className="bg-blue-950 p-[10px] rounded-lg text-white mt-[10px]">Back to products</button>
        </Link>
       </div>
    </div>
  )
}

export default Thankyou