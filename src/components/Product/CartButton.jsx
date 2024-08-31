import React, { useState } from "react";

const CartButton = ({ data }) => {

  const [message, setMessage] = useState();
  const userId = 1;

  const url = import.meta.env.VITE_AGRO_GENIUS_URL;

  const addToCart = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch(`${url}/cart/user/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(res);
      
    } catch (err) {
      console.log(err)
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
