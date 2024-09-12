import React from "react";
import "./ProductPage.css";
import { Link } from "react-router-dom";

const ProductPage = () => {
  return (
    <>
      <div className="container mt-5" style={{minHeight:"85vh"}}>
        <div className="row tm-content-row">
          <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-products">
              <div className="tm-product-table-container">
                <table className="table table-hover tm-table-small tm-product-table">
                  <thead>
                    <tr>
                      <th scope="col">&nbsp;</th>
                      <th scope="col">PRODUCT NAME</th>
                      <th scope="col">UNIT SOLD</th>
                      <th scope="col">IN STOCK</th>
                      <th scope="col">EXPIRE DATE</th>
                      <th scope="col">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <input type="checkbox" />
                      </th>
                      <td>Lorem Ipsum Product 1</td>
                      <td>1,450</td>
                      <td>550</td>
                      <td>28 March 2019</td>
                      <td>
                        <a href="#" className="tm-product-delete-link">
                          <i className="far fa-trash-alt tm-product-delete-icon" />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <input type="checkbox" />
                      </th>
                      <td className="tm-product-name">Lorem Ipsum Product 1</td>
                      <td>1,450</td>
                      <td>550</td>
                      <td>28 March 2019</td>
                      <td>
                        <a href="#" className="tm-product-delete-link">
                          <i className="far fa-trash-alt tm-product-delete-icon" />
                        </a>
                      </td>
                    </tr>
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
                    <tr>
                      <td className="tm-product-name">Product Category 1</td>
                      <td className="text-center">
                        <a href="#" className="tm-product-delete-link">
                          <i className="far fa-trash-alt tm-product-delete-icon" />
                        </a>
                      </td>
                    </tr>
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
