import React, { useState } from "react";
// import

const CartItem = ({ data}) => {

  const [item, setItem] = useState(data);
  
  const { name, category, productImage, price, quantity } = item.product;

  return (
    <div className="row mb-4 d-flex justify-content-between align-items-center">
      <div className="col-md-2 col-lg-2 col-xl-2">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
          className="img-fluid rounded-3"
          alt="Cotton T-shirt"
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
      {/* <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
        <button
          data-mdb-button-init
          data-mdb-ripple-init
          className="btn btn-link px-2"
        >
          <i className="fas fa-minus" />
        </button>
        <input
          id="form1"
          min={0}
          name="quantity"
          defaultValue={quantity}
          type="number"
          className="form-control-sm"
        />
        <button
          data-mdb-button-init
          data-mdb-ripple-init
          className="btn btn-link px-2"
        >
          <i className="fas fa-plus" />
        </button>
      </div> */}
      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
        <h6 className="mb-0">₹ {price}</h6>
      </div>
      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
        <a href="#!" className="text-muted">
          <i className="fas fa-times" />
        </a>
      </div>
    </div>
  );
};

export default CartItem;
