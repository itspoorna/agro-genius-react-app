import React, { useState } from "react";
// import

const CartItem = ({ data}) => {

  const [item, setItem] = useState(data);
  
  const { price, quantity } = item;
  const { id, name, category, productImage,} = item.product;

  return (
    <>
    <div key={id} className="row mb-4 d-flex justify-content-between align-items-center">
      <div className="col-md-2 col-lg-2 col-xl-2">
        <img
          src={productImage}
          className="img-fluid rounded-3"
          alt="Product"
        />
      </div>
      <div className="col-md-3 col-lg-3 col-xl-3">
        <h6 className="text-muted">{category}</h6>
        <h6 className="mb-0">{name}</h6>
      </div>
      <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
        <h6>Quantity : {quantity}</h6>
      </div>
      {/* Update Quantity */}
      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
        <h6 className="mb-0">₹ {price}</h6>
      </div>
      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
        <a href="#!" className="text-muted">
          <i className="fas fa-times" />
        </a>
      </div>
    </div>
    </>
  );
};

export default CartItem;
