import React, { useEffect, useState } from "react";
import Item from "./Item";
import ProductLoading from "./ProductLoading";

const Products = () => {
  const [products, setProducts] = useState();
  const [error, setError] = useState();

  const url = import.meta.env.VITE_AGRO_GENIUS_URL;

  useEffect(() => {
    try {
      fetch(`${url}/products`)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch(() => setError("Failed to Fetch!!"));
    } catch (err) {}
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-sm-12 my-3 ">
          {error && <h4>{error}</h4>}
          {!products && !error && <ProductLoading />}
          {products &&
            products.map((product) => (
              <Item key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
