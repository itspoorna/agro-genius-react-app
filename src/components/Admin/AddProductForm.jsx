import React, { useEffect, useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {

  const [auth] = useAuth();
  const navigate = useNavigate();

  const [productData, setData] = useState({
    "name": "",
    brand: "",
    price: "",
    quantity: 40,
    category: "",
    productImage: "",
  });

  const [categories, setCategories] = useState([]);

  const [response, setResponse] = useState();
  const [error, setError] = useState();

  const url = import.meta.env.VITE_AGRO_GENIUS_URL;

  //Upload Image
  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];
      await uploadProfilePicture(file); // Call the function to upload the file
    } catch (error) {
      console.log(error);
    }
  };

  const uploadProfilePicture = async (file) => {
    if (!file) return;

    const storageRef = ref(storage, `profile_pics/${file.name}`);
    try {
      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, file);
      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      console.log("File available at", downloadURL);
      setData((prevUser) => ({ ...prevUser, productImage: downloadURL }));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(productData);

    try {

      const res = await axios.post(`${url}/products`,productData,{
        headers : {
          "Content-Type" : "application/json",
          Authorization : auth?.token
        }
      })
      const data = await res.data;
      console.log(data);
      toast.success(data);
      setData({
        "name": "",
        brand: "",
        price: 0,
        quantity: 40,
        category: "",
        productImage: "",
      });
    } catch (error) {
        toast.warning("Failed to add product");
        console.log(error);
    }
  };

  useEffect(() => {
    async function fetchCategories() {
      const response = await axios.get(`${url}/products/get-categories`,{
        headers : {
          Authorization : auth?.token
        }
      });
      setCategories(response.data.categories);
    }
    fetchCategories();
  }, []);

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
                value={productData?.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12 mb-4">
              <input
                type="text"
                className="form-control"
                name="brand"
                placeholder="Enter Brand Name"
                value={productData?.brand}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12 mb-4">
              <input
                type="number"
                className="form-control"
                name="price"
                placeholder="Enter the price /kg"
                value={productData?.price}
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
                {categories.length > 0 && categories.map((category) => (
                  <option value={category.name} key={category.id}>{category.name}</option>
                ))}
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
                onChange={(e) => handleFileChange(e)}
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
        <button className="btn btn-info" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </>
  );
};

export default AddProductForm;
