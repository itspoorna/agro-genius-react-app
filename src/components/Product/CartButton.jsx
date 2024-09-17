import React, { useState } from "react";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import { toast } from "react-toastify";

const CartButton = ({ data }) => {

  const [auth, updateAuth] = useAuth();
  
  const [message, setMessage] = useState();
  const userId = auth ? auth.userId : 0;
  const token = auth ? auth.token : null;

  const url = import.meta.env.VITE_AGRO_GENIUS_URL;

  const addToCart = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post(`${url}/cart/user/${userId}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
      });
      if(response.status === 200){
        console.log(response.status);
        const res = response.data;
        toast.success(res, {
          position: 'top-right',
          autoClose: 3000,
        });
      }else if(response.status === 401) {
        toast.warning(response.data, {
          position: 'top-right',
          autoClose: 3000,
        });
      }
      
    } catch (err) {
        toast.warning("Internal Server error Try again later..!", {
          position: 'top-right',
          autoClose: 3000,
        });
    }
  };

  return (
    <button
      className="btn btn-outline-secondary"
      type="button"
      onClick={addToCart}
    >
      Add to cart
    </button>
  );
};

export default CartButton;
