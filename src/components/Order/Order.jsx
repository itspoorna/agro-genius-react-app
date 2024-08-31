import React, { useEffect, useState } from "react";
import OrderItem from "./OrderItem";

// const data = [
//   {
//     "id": 1,
//     "amount": 1000.0,
//     "orderStatus": null,
//     "createdAt": "2024-08-20T19:36:54.741287",
//     "orderProducts": [
//       {
//         "price": 1000,
//         "quantity": 20,
//         "orderId": 1,
//         "productDto": {
//           "id": 1,
//           "name": "TOMATO SEEDS",
//           "brand": "Syngenta",
//           "quantity": 20,
//           "price": 1000,
//           "category": "Seeds",
//           "productImage": "url//veggies"
//         }
//       }
//     ]
//   }
// ];
const Order = () => {

  const [orderData, setOrderData] = useState();
  const [error, setError] = useState();

  const url = import.meta.env.VITE_AGRO_GENIUS_URL;

  const userId = 1;

  useEffect(() => {
    try {    
      
      const fetchData = async () =>{
        const response = await fetch(`${url}/order/user/${userId}`)
        const data = await response.json();
        console.log(data[0]);
        setOrderData(data[0]);
      }
      
      fetchData();

    } catch (error) {
      setError(error)
    }
  }, []);

  // console.log(orderData[0].orderProducts);

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5">
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
                {orderData && orderData.orderProducts.map( (data) => <OrderItem key={orderData.id} data={data} />)}
                {/* Order Item details */}

                <div className="d-flex justify-content-between pt-2">
                  <p className="fw-bold mb-0">Order Details</p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">Total</span> ₹ Total Price
                  </p>
                </div>
                <div className="d-flex justify-content-between pt-2">
                  <p className="text-muted mb-0">Invoice Number : 788152</p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">Discount</span> $19.00
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="text-muted mb-0">Invoice Date : 22 Dec,2019</p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">GST 18%</span> 123
                  </p>
                </div>
                <div className="d-flex justify-content-between mb-5">
                  <p className="text-muted mb-0">
                    Recepits Voucher : 18KU-62IIK
                  </p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">Delivery Charges</span> Free
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
                  Total paid: <span className="h2 mb-0 ms-2"> ₹ Total Price</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Order);
