import React, { useState } from "react";

const AddProductForm = () => {
  const [productData, setData] = useState({
    "name": "",
    brand: "",
    price: 0,
    quantity: 40,
    category: "",
    productImage: "//url/fertilizer",
  });

  const [response, setResponse] = useState();
  const [error, setError] = useState();

  const url = import.meta.env.VITE_AGRO_GENIUS_URL;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(productData);

    try {

      const res = await fetch(`${url}/products`,{
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(productData)
      })
      const data = await res.json();
      console.log(data);
      setResponse(data);

    } catch (error) {
        setError(error);
    }
  };

  return (
    <>
      <div className="container vh-100">
        <div className="row">
          <form className="col-md-6 offset-md-3 g-3 mt-5">
            <h4 className="text-center">Enter Product details</h4>
            <div className="col-md-12 mb-4">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter Product Name"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12 mb-4">
              <input
                type="text"
                className="form-control"
                name="brand"
                placeholder="Enter Brand Name"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12 mb-4">
              <input
                type="number"
                className="form-control"
                name="price"
                placeholder="Enter the price /kg"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12 mb-4">
                <label htmlFor="category" className="form-label">Category</label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="category"
                onChange={handleChange}
              >
                <option value={"Seeds"}>Seeds</option>
                <option value={"Fertilizers"}>Fertilizers</option>
              </select>
            </div>
            <div className="col-md-12 mb-4">
              <label htmlFor="productImage" className="form-label">
                <b>Upload product Image</b>
              </label>
              <input
                type="file"
                className="form-control"
                name="productImage"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12 mb-4 mt-2">
              <button
                type="submit"
                className="btn btn-primary col-sm-12"
                onClick={handleSubmit}
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
