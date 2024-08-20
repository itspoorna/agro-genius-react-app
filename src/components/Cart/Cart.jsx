import React, { useState, useEffect } from "react";
import "./Cart.css";
import axios from "axios";
import CartItem from "./CartItem";
// import axios from "axios";

const Cart = () => {
  const [cartData, setCartData] = useState();
  const [numberOfItems, setNumberOfItems] = useState();
  const [totalPrice, setTotal] = useState();
  const [error, setError] = useState();

  const url = import.meta.env.VITE_AGRO_GENIUS_URL;

  const userId = 1;

  
  const calculate = async () => {
    const cartItems = await cartData.cartIitems;
      const total = cartItems.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.product.price,
        0
      );
      setTotal(total);
      setNumberOfItems(cartItems.length);
  }

  useEffect(() => {
    try {    
      
      const fetchData = async () =>{
        const response = await fetch(`${url}/cart/user/${userId}`)
        const data = await response.json();
        setCartData(data);
      }
      
      fetchData();

    } catch (error) {
      setError(error)
    }
  }, []);
  
  calculate();

  return (
    <>
      <section
        className="h-100 h-custom"
        style={{ backgroundColor: "rgb(214 226 220)" }}
      >
        <div className="container py-5 h-100">
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
                          <h6 className="mb-0 text-muted">{numberOfItems}</h6>
                        </div>
                        <hr className="my-4" />

                        {/* Cart Items */}
                        {cartData !== undefined &&
                          cartData.cartIitems.map((item) => (
                            <CartItem key={item.id} data={item}/>
                          ))}

                        <hr className="my-4" />

                        {/* End of Cart Items */}
                        <hr className="my-4" />
                        <div className="pt-5">
                          <h6 className="mb-0">
                            <a href="#!" className="text-body">
                              <i className="fas fa-long-arrow-alt-left me-2" />
                              Back to shop
                            </a>
                          </h6>
                        </div>
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
                          <select data-mdb-select-init className="form-select">
                            <option value={1}>Standard-Delivery- ₹50.00</option>
                            <option value={2}>Two</option>
                            <option value={3}>Three</option>
                            <option value={4}>Four</option>
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
                          <h5>₹ {totalPrice}</h5>
                        </div>
                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-dark btn-block btn-lg"
                          data-mdb-ripple-color="dark"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
