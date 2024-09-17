import React, { useEffect, useState } from "react";
import Item from "../Product/Item";
import ProductLoading from "../Product/ProductLoading";
import { useAuth } from "../../context/Auth";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Wishlist = () => {
  const [auth, updateAuth] = useAuth();

  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const url = import.meta.env.VITE_AGRO_GENIUS_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get(`${url}/wishlist/user/${auth?.userId}`, {
            headers: {
              Authorization: auth?.token,
            },
          })
          .catch(() => setError("Failed to Fetch!!"));
        if (response?.status === 200) {
          setProducts(response.data);
          setLoading(false);
        }else if(response?.status === 204){
          setProducts([]);
          setLoading(false);
        }
      } catch (error) {
        // Handle server or network errors
        console.log(error);
        if (error.response && error.response.status === 400) {
          setProducts([]);
          setLoading(false);
          setError(error);
        } else {
          console.log(error);
          toast.warning("Internal server error..! Try again later", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container vh-100">
        <ToastContainer />
        <div className="row">
          {error && <h4>{error}</h4>}
          {loading && !error && <ProductLoading />}
          {!loading && !error && products.length < 1 && (
            <>
              <div className="text-center my-5">
                <img
                  src="https://img.freepik.com/premium-vector/no-favorites-concept_637684-5.jpg"
                  alt="Empty wishlist"
                  className="img-fluid"
                  width={600}
                />
              </div>
            </>
          )}
          {products.length > 0 &&
            products.map((product) => (
              <div key={product.id} className="col-md-3 col-sm-12 my-3">
                <Item product={product} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
