import React from "react";
import './ProductPage.css'
import apple from '../../../assets/apple.jpg'

const EditProduct = () => {
  return (
    <>
      <div className="container vh-100 tm-mt-big tm-mb-big">
        <div className="row">
          <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
            <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
              <div className="row">
                <div className="col-12">
                  <h2 className="tm-block-title d-inline-block">
                    Edit Product
                  </h2>
                </div>
              </div>
              <div className="row tm-edit-product-row">
                <div className="col-xl-6 col-lg-6 col-md-12">
                  <form action method="post" className="tm-edit-product-form">
                    <div className="form-group mb-3">
                      <label htmlFor="name">Product Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        defaultValue="Lorem Ipsum Product"
                        className="form-control validate"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="description">Description</label>
                      <textarea
                        className="form-control validate tm-small"
                        rows={5}
                        required
                        defaultValue={
                          "Lorem ipsum dolor amet gentrify glossier locavore messenger bag chillwave hashtag irony migas wolf kale chips small batch kogi direct trade shaman."
                        }
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="category">Category</label>
                      <select
                        className="custom-select tm-select-accounts"
                        id="category"
                      >
                        <option>Select category</option>
                        <option value={1} selected>
                          New Arrival
                        </option>
                        <option value={2}>Most Popular</option>
                        <option value={3}>Trending</option>
                      </select>
                    </div>
                    <div className="row">
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <label htmlFor="expire_date">Expire Date</label>
                        <input
                          id="expire_date"
                          name="expire_date"
                          type="text"
                          defaultValue="22 Oct, 2020"
                          className="form-control validate"
                          data-large-mode="true"
                        />
                      </div>
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <label htmlFor="stock">Units In Stock</label>
                        <input
                          id="stock"
                          name="stock"
                          type="text"
                          defaultValue="19,765"
                          className="form-control validate"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
                  <div className="tm-product-img-edit mx-auto">
                    <img
                      src={apple}
                      alt="Product image"
                      className="img-fluid d-block mx-auto"
                    />
                    <i
                      className="fas fa-cloud-upload-alt tm-upload-icon"
                      onclick="document.getElementById('fileInput').click();"
                    />
                  </div>
                  <div className="custom-file mt-3 mb-3">
                    <input
                      id="fileInput"
                      type="file"
                      style={{ display: "none" }}
                    />
                    <input
                      type="button"
                      className="btn btn-primary btn-block mx-auto"
                      defaultValue="CHANGE IMAGE NOW"
                      onclick="document.getElementById('fileInput').click();"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block text-uppercase"
                  >
                    Update Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
