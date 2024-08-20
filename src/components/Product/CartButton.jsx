import React, { useState } from "react";

const CartButton = ({ id }) => {
  const [message, setMessage] = useState();
  const userId = 1;

  const url = import.meta.env.VITE_AGRO_GENIUS_URL;

  const addToCart = async (e) => {
    try {
      const response = await fetch(`${url}/cart/user/${userId}/product/${id}`, {
        method: "POST"
      });
      console.log(response);
      
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
