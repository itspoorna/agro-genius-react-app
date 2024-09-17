import React, { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import axios from "axios";
import { useAuth } from "../../context/Auth";

const Order = () => {
  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState();
  const [amount, setAmount] = useState(0);
  const [createdAt, setCreatedAt] = useState(null);
  const url = import.meta.env.VITE_AGRO_GENIUS_URL;

  const [auth, updateAuth] = useAuth();

  console.log(orderData);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(`${url}/order/user/${auth?.userId}`,{
          headers : {
            Authorization : auth?.token
          }
        });
        const data = await response.data;
        console.log(data);
        setOrderData(data);
        setAmount(data[0].amount);
        setCreatedAt(data[0].createdAt);
      };

      fetchData();
    } catch (error) {
      setError(error);
    }
  }, []);

  // console.log(orderData.orderProducts);

  return (
    <section className="vh-100">
      <div className="py-3">
        {!orderData ? (
          <>
            <div className="text-center">
              <img
                src="https://cdn.dribbble.com/users/3470232/screenshots/7776749/2.gif"
                className="img-fluid"
                alt="No Order found"
                width={800}
              />
            </div>
          </>
        ) : (
          <>
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-10 col-xl-8">
                <div className="card" style={{ borderRadius: 10 }}>
                  <div className="card-header px-4 py-5">
                    <h5 className="text-muted mb-0">
                      Thanks for your Order,{" "}
                      <span style={{ color: "#a8729a" }}>Customer Name</span>!
                    </h5>
                  </div>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <p
                        className="lead fw-normal mb-0"
                        style={{ color: "#a8729a" }}
                      >
                        Receipt
                      </p>
                      <p className="small text-muted mb-0">
                        Receipt Voucher : 1KAU9-84UIL
                      </p>
                    </div>

                    {/* Order Item details */}
                    {orderData.length > 0 &&
                      orderData[0].orderProducts.map((data) => (
                        <OrderItem key={orderData.id} data={data} />
                      ))}
                    {/* Order Item details */}

                    <div className="d-flex justify-content-between pt-2">
                      <p className="fw-bold mb-0">Order Details</p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">Total</span> ₹ {amount}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between pt-2">
                      <p className="text-muted mb-0">Invoice Number : 788152</p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">Discount</span> 10%
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="text-muted mb-0">
                        Invoice Date : {createdAt}
                      </p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">GST 18%</span> 123
                      </p>
                    </div>
                    <div className="d-flex justify-content-between mb-5">
                      <p className="text-muted mb-0">
                        Recepits Voucher : 18KU-62IIK
                      </p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">Delivery Charges</span>{" "}
                        Free
                      </p>
                    </div>
                  </div>
                  <div
                    className="card-footer border-0 px-4 py-5"
                    style={{
                      backgroundColor: "#a8729a",
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    }}
                  >
                    <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                      Total paid:{" "}
                      <span className="h2 mb-0 ms-2"> ₹ {amount}</span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default React.memo(Order);
