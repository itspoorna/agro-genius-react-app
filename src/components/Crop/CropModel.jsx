import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import papaya from "../../assets/papaya.jpeg"

const CropModel = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);

  return (
    <div className="container vh-100">
      <div className="row">
        <div className="col-md-6 my-3 m-auto">
          {data && (
            <div className="card" style={{ width: "18rem" }}>
              <img src={papaya} className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text text-center">{data.result}</p>
              </div>
            </div>
          )}
          {!data && <h2>Internal server Error!!</h2>}
        </div>
      </div>
    </div>
  );
};

export default CropModel;
