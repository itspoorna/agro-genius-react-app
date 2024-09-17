import React, { useEffect, useState } from "react";
import Item from "./Item";
import ProductLoading from "./ProductLoading";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import search from "../../assets/search.svg";
import { ToastContainer } from "react-toastify";

const Products = () => {
  const [auth, updateAuth] = useAuth();

  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  const url = import.meta.env.VITE_AGRO_GENIUS_URL;

  const token = auth ? auth.token : null;

  useEffect(() => {
    // const result = parseJwt(token);
    // console.log(result);
    try {
      async function fetchData() {
        const response = await axios.get(`${url}/products/getAll`);
        console.log(response);
        setProducts(response.data);
      }

      fetchData();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleSearch = (e) =>{
    e.preventDefault();
    console.log("search");
  }

  return (
    <div className="container vh-100">
      {products && (
        <>
          <div className="row">
            <div className="col-md-7 offset-md-2 my-3">
              <div className="input-group flex-nowrap">
                {/* <span className="input-group-text" id="addon-wrapping">
                  <img src={search} width={40} />
                </span> */}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Product Name or Brand"
                  aria-label="Search by Product Name or Brand"
                  aria-describedby="addon-wrapping"
                />
                <span className="input-group-text" id="addon-wrapping" onClick={handleSearch}>
                  <img src={search} width={40} />
                </span>
              </div>
            </div>
            <div className="col-md-3 my-4">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-success dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="row">
        <ToastContainer/>
        {error && <h4>{error}</h4>}
        {!products && !error && <ProductLoading />}
        {products &&
          products.map((product) => (
            <div key={product.id} className="col-md-3 col-sm-12 my-3">
              <Item product={product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
