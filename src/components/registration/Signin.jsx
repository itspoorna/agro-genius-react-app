import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../context/Auth";
import { useGoogleLogin } from "@react-oauth/google";

const Signin = () => {
  const [auth, updateAuth] = useAuth();

  const navigate = useNavigate();

  const [user, setUser] = useState({
    emailId: "",
    password: "",
  });

  //Google sign in'
  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => signWithGoogle(codeResponse),
    onError: (error) => toast.error("Google login failed. Please try again."),
  });

  const signWithGoogle = async (codeResponse) => {
    try {
      const requestBody = {
        accessToken: codeResponse?.access_token,
      };
      const response = await axios
        .post(`http://localhost:8081/api/v1/user/signInWithGoogle`, requestBody)
        .catch((err) => {
          console.error(err);
          toast.error("An error occurred during login. Please try again.");
        });

      if (response?.status === 200) {
        console.log(response);
        toast.success("Logged in Successfully.", {
          position: "top-right",
          autoClose: 3000,
        });
        const token = response.headers["access_token"];
        localStorage.setItem("token", token);
        // Update auth context state
        updateAuth({
          token: token,
          username: "",
          role: "",
        });
        setTimeout(() => {
          setUser(null);
          navigate("/");
        }, 3000);
      } else if (response?.status === 401) {
        toast.warning("Enter valid Credentials...!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      delete axios.defaults.headers.common["Authorization"];
      const response = await axios
        .post("http://localhost:8081/api/v1/user/signIn", user, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .catch((err) => err);

      if (response.status === 200) {
        console.log(response);
        toast.success("Logged in Successfully.", {
          position: "top-right",
          autoClose: 3000,
        });
        const token = response.headers["access_token"];
        localStorage.setItem("token", token);
        // Update auth context state
        updateAuth({
          token: token,
          username: "",
          role: "",
        });
        setTimeout(() => {
          setUser(null);
          navigate("/");
        }, 3000);
      } else if (response.status === 401) {
        toast.warning("Enter valid Credentials...!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      // Handle server or network errors
      if (error.response && error.response.status === 401) {
        toast.error("Enter valid Credentials...!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.warning("Internal server error..! Try again later", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <section
      className="vh-100"
      style={{
        background: "url(bg.jpg)",
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
      }}
    >
      <ToastContainer />
      <div className="container py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">
                <h3 className="mb-4">Sign in</h3>
                <div className="form-outline mb-3 ">
                  <input
                    type="email"
                    id="typeEmailX-2"
                    value={user.emailId}
                    className="form-control form-control-md"
                    placeholder="Email"
                    name="emailId"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="typePasswordX-2"
                    name="password"
                    value={user.password}
                    className="form-control form-control-md"
                    placeholder="Password"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {/* Checkbox */}
                {/* <div className="form-check d-flex justify-content-start mb-4"> */}

                {/* </div> */}
                {/* Full-width button */}
                <div className="d-grid mb-4">
                  <button
                    className="btn btn-primary btn-md w-100"
                    type="submit"
                    onClick={(event) => handleSubmit(event)}
                  >
                    Login
                  </button>
                </div>
                <hr className="my-4" />
                <div className="row">
                  <div className="col-md-5">
                    <p>
                      New User? <a href="/signup">Click here</a>
                    </p>
                  </div>
                  <div className="col-md-5 ms-auto">
                    <p>
                      <Link to="/forgot-password">Forgot password ?</Link>
                    </p>
                  </div>
                </div>
                {/* Full-width buttons */}
                <div className="row">
                  <div className="col">
                    <div className="d-grid mb-2">
                      <button
                        className="btn btn-md w-100"
                        style={{ backgroundColor: "#dd4b39" }}
                        onClick={() => googleLogin()}
                      >
                        <i className="fab fa-google me-2" /> Sign in with Google
                      </button>
                      {/* <GoogleLogin
                        onSuccess={responseMessage}
                        onError={errorMessage}
                      /> */}
                    </div>
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-md w-100"
                      style={{ backgroundColor: "#3b5998" }}
                      type="submit"
                      onClick={() => console.log("Facebook")}
                    >
                      <i className="fab fa-facebook-f me-2" /> Sign in with
                      Facebook
                    </button>
                  </div>
                </div>
                <div className="d-grid"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
