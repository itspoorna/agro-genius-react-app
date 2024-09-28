import { useState } from "react";
import CartButton from "./CartButton";
import Favourite from "./Favourite";
import OrderButton from "./OrderButton";

const Item = ({ product }) => {

  const { id,name, quantity, price, brand, productImage } = product;
  
  const [orderData, setOrderData] = useState([{
    quantity : 1,
    price : price,
    productId : id
  }]);

  const handleChange = (event) => {
    setOrderData( (prevData) => ({...prevData, 
                                price : event.target.value * price,
                                quantity : event.target.value}));
  };
  return (
    <div className="container">
      <div className="card" style={{ width: "18rem" }}>
        <div className="m-3 ms-auto">
          <Favourite id={id}/>
        </div>
        <img
          src={productImage}
          className="img-fluid rounded mx-auto d-block w-50 p-2"
          alt={name}
        />
        <div className="card-body p-3">
          <h5 className="card-title text-center">{name}</h5>
          <p className="card-text">{brand}</p>
          <p className="card-text">₹{price}</p>
          <p className="card-text">
            <i className="fa fa-percent" aria-hidden="true" /> Saved Price ₹467
          </p>
          <div className="row align-items-center">
            <div className="col-4 text-center">
              <label htmlFor="size" className="col-form-label">
                Size
              </label>
            </div>
            <div className="col-8">
              <select className="form-control" id="size" onChange={handleChange}>
                <option value={1}>1kg</option>
                <option value={2}>2kg</option>
                <option value={5}>5kg</option>
                <option value={10}>10kg</option>
              </select>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md d-grid gap-2">
              <CartButton data={orderData}/>
            </div>
            <div className="col-md d-grid gap-2">
              <OrderButton data={orderData} price={price}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;

//desing:
//  1-overflow


