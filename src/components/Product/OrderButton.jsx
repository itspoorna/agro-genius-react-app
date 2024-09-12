import React from "react";
import Razorpay from "razorpay";

const OrderButton = ({ data }) => {
  const { quantity, price, productId } = data;

  const url = import.meta.env.VITE_AGRO_GENIUS_URL;

  const userId = 1;

  const placeOrder = async (event) => {
    event.preventDefault();

    const order = {
      amount: price,
      orderProducts: [
        {
          price: price,
          quantity: quantity,
          productId: productId,
        },
      ],
    };

    try {
      const response = await fetch(`${url}/order/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      console.log(response);
      const data = await response.json();
      console.log("order creation completed", data);
      if (data) {
        proceedOrder(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const proceedOrder = (orderData) => {
    const options = {
      //pass order details
      key_id: "rzp_test_t3ROS51DwZEOli",
      amount: orderData.amount,
      currency: "INR",
      name: "payment_demo",
      description: "Course Payment",
      order_id: orderData.razorPayOrderID,
      receipt: "order_receipt",
      callback_url: "http://localhost:8081/handle-payment-callback",
      prefill: {
        name: 'username',
        email: 'user@gmail.com',
        contact: '8973426866',
      },
      theme: {
        color: "#3399cc",
      }
    };

    let rzp1 = new window.Razorpay(options);
    rzp1.open();
    // e.preventDefault();
  };

  return (
    <button
      className="btn btn-outline-primary"
      type="button"
      onClick={placeOrder}
    >
      Buy
    </button>
  );
};

export default OrderButton;
