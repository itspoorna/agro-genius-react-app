import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="container ">
      <div className="row">
        <div className="col m-5">
          <div className="card text-center m-auto" style={{ width: 300 }}>
            <div className="card-header h5 text-white bg-primary">
              Password Reset
            </div>
            <div className="card-body px-5">
              <p className="card-text py-2">
                Enter your email address and we'll send you an email with
                instructions to reset your password.
              </p>
              <div data-mdb-input-init className="form-outline">
                <input
                  type="email"
                  id="typeEmail"
                  className="form-control my-3"
                />
                <label className="form-label" htmlFor="typeEmail">
                  Email input
                </label>
              </div>
              <Link
                to="#"
                data-mdb-ripple-init
                className="btn btn-primary w-100"
              >
                Reset password
              </Link>
              <div className="d-flex justify-content-between mt-4">
                <Link className to="/signin">
                  Login
                </Link>
                <Link className to="/signup">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="m-auto"></div> */}
      </div>
    </div>
  );
};

export default ForgotPassword;
