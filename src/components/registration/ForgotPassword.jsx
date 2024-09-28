import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isVerified, setVerified] = useState(false);

  const navigate = useNavigate();

  const emailVerify = async (e) => {
    if (email.length < 3) {
      toast.warning("Please Enter your email");
    } else {
      try {
        const response = await axios
          .post("http://localhost:8081/api/v1/validator/forgot-password", {
            value: email,
          });
          
        console.log(response);
        if (response.status === 200) {
          toast.success("Otp is sent to "+email);
        }
      } catch (error) {
        if (error.status === 400) {
          toast.warning("Email Id not found");
        }else{
          toast.warning("Internal server error while generating otp");
        }
      }
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios
        .post("http://localhost:8081/api/v1/validator/verify", {
          value: email,
          otp: otp,
        })
        .catch(() => toast.warning("Invalid otp enter valid otp"));
      if (response.status === 200) {
        setOtp("");
        setVerified(true);
        toast.success(response?.data, {
          position: "top-right",
          autoClose: 1000,
        });
      }
    }catch(error){
      console.log(error);
      if (error.status === 400) {
        toast.warning("Invalid OTP");
      }else{
        toast.warning("Internal server error while verifing otp");
      }
    }
  }
    
  const updatePassword = async (e) => {
    try {
      const response = await axios
        .put(`http://localhost:8081/api/v1/user/${email}`, {
          password: password,
        })
        .catch(() => toast.warning("Error while updating password"));
      if (response.status === 200) {
        setOtp("");
        toast.success("Password updated successfully", {
          position: "top-right",
          autoClose: 1000,
        });
        navigate('/signin')
      }
    }catch(error){
      console.log(error);
      if (error.status === 400) {
        toast.warning("Error while updating password");
      }else{
        toast.warning("Internal server error while verifing otp");
      }
    }
  };

  return (
    <div className="container vh-100">
      <div className="row">
        <ToastContainer />
        <div className="col mt-5">
          <div className="card text-center m-auto" style={{ width: 400 }}>
            <div className="card-header h5 text-white bg-primary">
              Password Reset
            </div>
            <div className="card-body px-5">
              {!isVerified && (
                <>
                  <p className="card-text py-2">
                    Enter your email address and we'll send you an OTP to reset
                    your password.
                  </p>
                  <div data-mdb-input-init className="form-outline">
                    <input
                      type="email"
                      id="typeEmail"
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control my-3"
                      placeholder="Enter your email Id"
                    />
                  </div>
                  <button
                    onClick={() => emailVerify()}
                    data-mdb-ripple-init
                    className="btn btn-primary w-100"
                  >
                    Get Otp
                  </button>
                  <div data-mdb-input-init className="form-outline">
                    <input
                      type="text"
                      id="otp"
                      onChange={(e) => setOtp(e.target.value)}
                      className="form-control my-3"
                      placeholder="Enter Otp"
                    />
                  </div>
                  <button
                    onClick={() => verifyOtp()}
                    data-mdb-ripple-init
                    className="btn btn-primary w-100"
                  >
                    Verify Otp
                  </button>
                </>
              )}
              {isVerified && (
                <>
                  <p className="card-text py-2">
                    <h6 className="text-success">
                      Your Email Verified Successfully.
                    </h6>
                    Set Your Password
                  </p>
                  <div data-mdb-input-init className="form-outline">
                    <input
                      type="text"
                      id="password"
                      value={password}
                      onChange={(e) => SetPassword(e.target.value)}
                      className="form-control my-3"
                      placeholder="set password"
                    />
                    <input
                      type="text"
                      id="confirmPassword"
                      password={confirmPassword}
                      onChange={(e) => SetConfirmPassword(e.target.value)}
                      className="form-control my-3"
                      placeholder="confirm password"
                    />
                  </div>
                  <button
                    onClick={() => updatePassword()}
                    data-mdb-ripple-init
                    className="btn btn-primary w-100"
                  >
                    Set Password
                  </button>
                </>
              )}
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
