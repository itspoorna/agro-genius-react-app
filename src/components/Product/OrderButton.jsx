import React from "react";

const OrderButton = ({ product }) => {

  const {id, price} = product;

  const url = import.meta.env.VITE_AGRO_GENIUS_URL;

  const userId = 1;

  const placeOrder = async (e) =>{

    const order = {
      amount : price,
      productIds : [id]
    }

    try {
      const response = await fetch(`${url}/order/user/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(order)
      });
      console.log(response);
      
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <button className="btn btn-outline-primary" type="button" onClick={placeOrder}>
      Buy
    </button>
  );
};

export default OrderButton;
