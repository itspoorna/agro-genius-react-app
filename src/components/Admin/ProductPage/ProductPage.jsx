import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/Auth";

const ProductPage = () => {

  const [auth] = useAuth();
  const url = import.meta.env.VITE_AGRO_GENIUS_URL;
  const [product, setProducts] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      async function fetchData() {
        const response = await axios.get(`${url}/products/getAll`);
        setProducts(response.data);
        fetchCategories();
      }
      async function fetchCategories() {
        const response = await axios.get(`${url}/products/get-categories`,{
          headers : {
            Authorization : auth?.token
          }
        });
        setCategories(response.data.categories);
      }

      fetchData();
    } catch (err) {
      console.error(err);
    }
  }, []);

  console.log(categories);

  return (
    <>
      <div className="container mt-5" style={{ minHeight: "85vh" }}>
        <div className="row tm-content-row">
          <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-products">
              <div className="tm-product-table-container">
                <table className="table table-hover tm-table-small tm-product-table">
                  <thead>
                    <tr>
                      <th scope="col">&nbsp;</th>
                      <th scope="col">PRODUCT NAME</th>
                      <th scope="col">BRAND</th>
                      <th scope="col">CATEGORY</th>
                      <th scope="col">PRICE</th>
                      <th scope="col">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product &&
                      product?.map((item) => (
                        <tr key={item.id}>
                          {" "}
                          {/* Ensure you add a unique key for each element */}
                          <th scope="row">
                            <input type="checkbox" />
                          </th>
                          <td className="tm-product-name">{item.name}</td>
                          <td>{item.brand}</td>
                          <td>{item.category}</td>
                          <td>{item.price}</td>
                          <td>
                            <a href="#" className="tm-product-delete-link">
                              <i className="far fa-trash-alt tm-product-delete-icon" />
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {/* table container */}
              <div className="d-grid">
                <Link to="/admin/add-product" className="btn btn-primary mb-3">
                  ADD NEW PRODUCT
                </Link>
                <button className="btn btn-primary">
                  DELETE SELECTED PRODUCTS
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-product-categories">
              <h2 className="tm-block-title">Product Categories</h2>
              <div className="tm-product-table-container">
                <table className="table tm-table-small tm-product-table">
                  <tbody>
                    {categories?.length > 0 && categories.map((category) => (
                      <tr>
                      <td className="tm-product-name">{category.name}</td>
                      <td className="text-center">
                        <a href="#" className="tm-product-delete-link">
                          <i className="far fa-trash-alt tm-product-delete-icon" />
                        </a>
                      </td>
                    </tr>))}
                  </tbody>
                </table>
              </div>
              {/* table container */}
              <button className="btn btn-primary btn-block text-uppercase mb-3">
                Add new category
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
