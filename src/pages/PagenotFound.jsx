import React from "react";
import image404 from "../assets/error.svg";
import { Link } from "react-router-dom";

const PagenotFound = () => {
  return (
    <div style={{ minHeight: "90vh" }}>
      <div className="container">
        <div className="row mx-auto w-50">
          <Link to="/">
            <img
              src={image404}
              alt="Page Not Found"
              className="img-fluid m-5"
              width={500}
            />
            <p className="btn btn-primary mx-5">Go to Homepage</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PagenotFound;
