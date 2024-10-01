import React, { useState } from "react";
import Razorpay from "razorpay";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderButton = ({ data, price }) => {
  const [auth] = useAuth();
  const [orderId, setId] = useState(0);
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");

  const navigate = useNavigate();

  const token = auth?.token || null;

  const url = import.meta.env.VITE_AGRO_GENIUS_URL;

  const order = {
    location,
    city,
    state,
    zipcode,
    amount: price,
    orderProducts: data,
  };

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Simple validation rules
    if (!zipcode.trim()) {
      newErrors.zipcode = "Zipcode is required";
    } else if (!/^\d{6}$/.test(zipcode)) {
      newErrors.zipcode = "Invalid Zipcode (must be 6 digits)";
    }

    if (!state.trim()) {
      newErrors.state = "State is required";
    }

    if (!city.trim()) {
      newErrors.city = "City is required";
    }

    if (!location.trim()) {
      newErrors.location = "Location details are required";
    }

    return newErrors;
  };

  const placeOrder = async (event) => {

    if(!auth?.token){
      navigate("/signin");
      window.location.reload();
      toast.warning("Login to place an order");
    }
    event.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
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
          const response = await axios
            .post(`${url}/order/handle-payment-callback`, order, {
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            })
            .catch((error) => {
              toast.warning("Payment verification failed: ", error, {
                position: "top-right",
                autoClose: 3000,
              });
            });

          toast.success(response.data, {
            position: "top-right",
            autoClose: 3000,
          });
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
    <>
      <button
        className="btn btn-outline-primary"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#myModal"
      >
        Buy
      </button>
      <div
        className="modal fade"
        id="myModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="row">
                <h1
                  className="modal-title fs-6 text-center"
                  id="exampleModalLabel"
                >
                  Enter the order location details
                </h1>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <p>Please enter the following details to place the order.</p>
              <div className="row m-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter zipcode"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  required
                />
                {errors.zipcode && (
                  <span className="text-danger">{errors.zipcode}</span>
                )}
              </div>

              <div className="row m-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
                {errors.state && (
                  <span className="text-danger">{errors.state}</span>
                )}
              </div>

              <div className="row m-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                {errors.city && (
                  <span className="text-danger">{errors.city}</span>
                )}
              </div>

              <div className="row m-2">
                <textarea
                  className="form-control"
                  id="exampleTextarea"
                  rows={4}
                  placeholder="Enter local area details"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
                {errors.location && (
                  <span className="text-danger">{errors.location}</span>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => placeOrder(e)}
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderButton;
