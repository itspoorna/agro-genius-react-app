import React, { useState } from 'react';

const OrderItem = ({ data }) => {

  const [order, setOrder] = useState(data);
      
  const{quantity = null, price= 0 } = order;
  const {name = '',category = '', brand = '', productImage = 'https://shj.org/wp-content/uploads/2018/04/no_product_image.jpg'} = order.productDto;     

  return (
    <div className="card shadow-0 border mb-4">
      <div className="card-body">
        <div className="row">
          <div className="col-md-2">
            <img
              src={productImage}
              className="img-fluid"
              alt="Phone"
            />
          </div>
          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
            <p className="text-muted mb-0">{name}</p>
          </div>
          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
            <p className="text-muted mb-0 small">{category}</p>
          </div>
          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
            <p className="text-muted mb-0 small">{brand}</p>
          </div>
          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
            <p className="text-muted mb-0 small">Qty: {quantity}</p>
          </div>
          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
            <p className="text-muted mb-0 small"> ₹ {price}</p>
          </div>
        </div>
        <hr
          className="mb-4"
          style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
        />
        <div className="row d-flex align-items-center">
          <div className="col-md-2">
            <p className="text-muted mb-0 small">Track Order</p>
          </div>
          <div className="col-md-10">
            <div
              className="progress"
              style={{ height: 6, borderRadius: 16 }}
            >
              <div
                className="progress-bar"
                role="progressbar"
                aria-label="Delivery status"
                style={{
                  width: "15%",
                  borderRadius: 16,
                  backgroundColor: "#a8729a",
                }}
                // aria-valuenow={15}
                // aria-valuemin={0}
                // aria-valuemax={100}
              />
            </div>
            <div className="d-flex justify-content-around mb-1">
              <p className="text-muted mt-1 mb-0 small ms-xl-5">
                Out for delivary
              </p>
              <p className="text-muted mt-1 mb-0 small ms-xl-5">
                Delivered
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(OrderItem);
