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
  const [categories, setCategory] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

  const url = import.meta.env.VITE_AGRO_GENIUS_URL;

  categories?.map((c) => console.log(c.name));

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

  const handleSearch = (e) => {
    e.preventDefault();
    try {
      async function fetchData() {
        const response = await axios.get(`${url}/products/filter/${filter}`);
        console.log(response.data);
        setProducts(response.data);
      }

      fetchData();
    } catch (err) {
      console.error(err);
    }
    console.log(filter);
  };

  return (
    <div className="container vh-100">
      <div className="row">
        <div className="col-md-7 offset-md-2 my-3">
          <div className="input-group flex-nowrap">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Product Name , Brand or Category"
              aria-label="Search by Product Name, Brand or Category"
              aria-describedby="addon-wrapping"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <span
              className="input-group-text"
              id="addon-wrapping"
              onClick={handleSearch}
            >
              <img src={search} width={40} />
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        {error && <h4>{error}</h4>}
        {/* {!products && !error && <ProductLoading />} */}
        {products &&
          products.map((product) => (
            <div key={product.id} className="col-md-3 col-sm-12 my-3">
              <Item product={product} />
            </div>
          ))}
        {!products && products?.length < 1 && (<>
        <h2>No products found for results {filter}</h2>
        </>)}
      </div>
    </div>
  );
};

export default Products;
