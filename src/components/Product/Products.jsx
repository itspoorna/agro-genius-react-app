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
    <div className="container vh-100">
      <div className="row">
          {error && <h4>{error}</h4>}
          {!products && !error && <ProductLoading />}
          {products &&
            products.map((product) => (
              <div key={product.id} className="col-md-3 col-sm-12 my-3 ">
                <Item product={product} />
             </div>
            ))}
      </div>
    </div>
  );
};

export default Products;
