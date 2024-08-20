import CartButton from "./CartButton";
import Favourite from "./Favourite";
import OrderButton from "./OrderButton";

const Item = ({ product }) => {
  const { name, quantity, price, brand, productImage } = product;

  return (
    <div className="container">
      <div className="card" style={{ width: "18rem" }}>
        <div className="m-3 ms-auto">
          <Favourite />
        </div>
        <img
          src="fertilizer.webp"
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
              <select className="form-control" id="size">
                <option>{quantity}</option>
                <option>{quantity}</option>
                <option>{quantity}</option>
                <option>{quantity}</option>
                <option>{quantity}</option>
              </select>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md d-grid gap-2">
              <CartButton id={product.id}/>
            </div>
            <div className="col-md d-grid gap-2">
              <OrderButton product={product}/>
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

{
  /* <div className="container p-3">
        <div className="row">
            <div className="card bg-info">
              <div className="card-header bg-info">
                <div className="row">
                  <div className="col-md-6">
                    <h5 className="card-title">32% OFF</h5>
                  </div>
                  <div className="col-md-6">
                    <i className="fa fa-heart" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <img
                src="fertilizer.webp"
                className="card-img-top p-3 bg-warning"
                width={10}
                alt="..."
              />
              <div className="card-body p-3 bg-success">
                <h5 className="card-title">SAAHO TOMATO SEEDS</h5>
                <p className="card-text">Syngenta</p>
                <p className="card-text">₹983 ₹1450</p>
                <p className="card-text">
                  <i className="fa fa-percent" aria-hidden="true" /> Saved Price
                  ₹467
                </p>
                <div className="form-group">
                  <label htmlFor="size">Size</label>
                  <select className="form-control" id="size">
                    <option>3500 seeds</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>
            </div>
        </div>
      </div> */
}
