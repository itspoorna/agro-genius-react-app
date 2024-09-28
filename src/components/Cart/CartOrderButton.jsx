import React, { useState } from "react";
import Razorpay from "razorpay";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import { toast } from "react-toastify";

const CartOrderButton = ({ data, price }) => {
  const [auth] = useAuth();
  const [orderId, setId] = useState(0);
  const token = auth?.token || null;

  const url = import.meta.env.VITE_AGRO_GENIUS_URL;

  const order = {
    amount: price,
    orderProducts: data,
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${url}/order/create-order/${auth.userId}`,
        order,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.data;
      // console.log("order creation completed", data);
      if (res) {
        setId(res.id);
        console.log(orderId);
        proceedOrder(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const proceedOrder = (orderData) => {
    try {
      const options = {
        //pass order details
        key_id: "rzp_test_t3ROS51DwZEOli",
        amount: orderData.amount,
        currency: "INR",
        name: "payment_demo",
        description: "Online Payment",
        order_id: orderData.razorPayOrderID,
        receipt: auth.userId + "_order_receipt",
        prefill: {
          name: auth.username,
          email: auth.userId,
        },
        theme: {
          color: "#3399cc",
        },
        handler: async function (res) {
          order["razorPayOrderID"] = res.razorpay_order_id;

          // You can send this data to your backend for further processing or verification
          const response = await axios.post(`${url}/order/handle-payment-callback`, order, {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }).catch((error) => {
              toast.warning("Payment verification failed: ", error, {
                position: "top-right",
                autoClose: 3000,
              });
            });
            
            const deleteCart = await axios.delete(`${url}/cart/user/${auth?.userId}`, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: auth?.token,
                },
              }).catch((error) => {
                console.log(error);
                  toast.warning("Payment verification failed: ", error, {
                    position: "top-right",
                    autoClose: 3000,
                  });
                });

                toast.success("Order placed successfully", {
                    position: "top-right",
                    autoClose: 3000,
                  });
                  window.location.reload()
        },
        modal: {
          // Detect when the user dismisses the modal (without completing payment)
          ondismiss: () => handleCancelPayment(false),
        },
      };

      const rzp1 = new window.Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        toast.warning(response.error.reason, {
          position: "top-right",
          autoClose: 3000,
        });
      });

      rzp1.open();
    } catch (error) {
      console.log(error);
      toast.warning("Internal Server", {
        position: "top-right",
        autoClose: 3000,
      });
    }
    // e.preventDefault();
  };

  async function handleCancelPayment() {
    try {
      await axios
        .delete(`${url}/order/${orderId}`, {
          headers: {
            Authorization: token,
          },
        })
        .catch((err) => {
          toast.warning(err, {
            position: "top-right",
            autoClose: 3000,
          });
        });

      toast.warning("Payment was cancelled by User", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.warning("Internal Server", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }

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

export default CartOrderButton;
