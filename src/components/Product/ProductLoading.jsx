import React from "react";

const ProductLoading = () => {
  return (
    <div>
      <div className="card" aria-hidden="true">
        <div className="p-5 bg-secondary">
          <div className="p-5 "></div>
        </div>
        <div className="card-body">
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-6" />
          </h5>
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7" />
            <span className="placeholder col-4" />
            <span className="placeholder col-4" />
            <span className="placeholder col-6" />
            <span className="placeholder col-8" />
          </p>
          <a
            className="btn btn-primary disabled placeholder col-6"
            aria-disabled="true"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductLoading;
