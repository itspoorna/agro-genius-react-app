import React, { useState, useEffect } from "react";
import "./Cart.css";
import axios from "axios";
import CartItem from "./CartItem";
import { useAuth } from "../../context/Auth";
import { ToastContainer } from "react-toastify";
import CartOrderButton from "./CartOrderButton";
import { Link } from "react-router-dom";
// import axios from "axios";

const Cart = () => {
  const [auth, updateAuth] = useAuth();

  const userId = auth.userId || null;

  const token = auth.token || null;

  const [cartData, setCartData] = useState(null);
  const [numberOfItems, setNumberOfItems] = useState();
  const [totalPrice, setTotal] = useState();
  const [amountToBePaid, setPay] = useState();
  const [message, setMessage] = useState("");
  const [error, setError] = useState();

  const url = import.meta.env.VITE_AGRO_GENIUS_URL;

  useEffect(() => {
    const calculate = async () => {
      if (cartData != null && cartData != undefined) {
        const total = cartData?.cartProducts.reduce(
          (accumulator, currentValue) => accumulator + currentValue.price,
          0
        );
        setTotal(total);
        setPay(total + 50);
        setNumberOfItems(cartData?.cartProducts?.length);
      }
    };
    calculate();
  }, [cartData]);

  // console.log(axios.defaults.headers.common["Authorization"]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(`${url}/cart/user/${userId}`, {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data;
        // console.log(data);
        setCartData(data);
      };

      fetchData();
    } catch (error) {
      setError(error);
    }
  }, [numberOfItems]);

  const handleOrder = (event) => {
    event.preventDefault();

    try {
      const placeOrder = async () => {
        const response = await axios.post(`${url}/order/user/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        });
        const data = await response.json();
        setMessage(data);
      };

      placeOrder();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <section
        className="vh-100 h-custom"
        style={{ backgroundColor: "rgb(214 226 220)" }}
      >
        <ToastContainer/>
        {!cartData ? (
          <>
            <div className="container">
              <div className="text-center">
                <Link to={'/'}>
                <img
                  src="https://img.freepik.com/premium-vector/empty-card-concept_637684-1.jpg?w=2000"
                  alt="Empty Cart..!!"
                  className="img-fluid mt-5"
                  width={500}
                />
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="container py-5">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12">
                <div
                  className="card card-registration card-registration-2"
                  style={{ borderRadius: 15 }}
                >
                  <div className="card-body p-0">
                    <div className="row g-0">
                      <div className="col-lg-8">
                        <div className="p-5">
                          <div className="d-flex justify-content-between align-items-center mb-5">
                            <h1 className="fw-bold mb-0">Shopping Cart</h1>
                            <h6 className="mb-0 text-muted">
                              No of Items :<b>{numberOfItems}</b>
                            </h6>
                          </div>
                          <hr className="my-4" />

                          {/* Cart Items */}
                          {cartData &&
                            cartData.cartProducts.map((item) => (
                              <CartItem key={item.product.id} data={item} />
                            ))}

                          <hr className="my-4" />

                          {/* End of Cart Items */}
                          {/* <hr className="my-4" /> */}
                          {/* <div className="pt-5">
                            <h6 className="mb-0">
                              <Link href="#!" className="text-body">
                                <i className="fas fa-long-arrow-alt-left me-2" />
                                Back to shop
                              </Link>
                            </h6>
                          </div> */}
                        </div>
                      </div>

                      {/* Summary section */}
                      <div className="col-lg-4 bg-body-tertiary">
                        <div className="p-5">
                          <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                          <hr className="my-4" />
                          <div className="d-flex justify-content-between mb-4">
                            <h5 className="text-uppercase">
                              Items : {numberOfItems}
                            </h5>
                            <h5> ₹ {totalPrice}</h5>
                          </div>
                          <h5 className="text-uppercase mb-3">Shipping</h5>
                          <div className="mb-4 pb-2">
                            <select
                              data-mdb-select-init
                              className="form-select"
                            >
                              <option value={1}>
                                Standard-Delivery- ₹50.00
                              </option>
                              {/* <option value={2}>Two</option>
                              <option value={3}>Three</option>
                              <option value={4}>Four</option> */}
                            </select>
                          </div>
                          <h5 className="text-uppercase mb-3">Give code</h5>
                          <div className="mb-5">
                            <div data-mdb-input-init className="form-outline">
                              <input
                                type="text"
                                id="form3Examplea2"
                                className="form-control form-control-lg"
                                placeholder="Enter your code"
                              />
                            </div>
                          </div>
                          <hr className="my-4" />
                          <div className="d-flex justify-content-between mb-5">
                            <h5 className="text-uppercase">Total Price</h5>
                            <h5>₹ {amountToBePaid}</h5>
                          </div>
                          <div className="d-grid">
                            <CartOrderButton
                              data={cartData?.cartProducts}
                              price={amountToBePaid}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Cart;
