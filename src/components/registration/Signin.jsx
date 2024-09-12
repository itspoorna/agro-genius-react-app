import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Signin = ({ path }) => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    emailId: "",
    password: "",
  });

//Google sign in'
const handleGoogleSignIn = () => {
  try {
      const signInURL = `${import.meta.env.VITE_GOOGLE_SIGNIN_URL}?response_type=code&client_id=${import.meta.env.VITE_CLIENT_ID}&kc_idp_hint=google`;
      const signInWindow = window.open(
          signInURL,
          "google login",
          "toolbar=no, menubar=no, width=700, height=700, top=100, left=300"
      );

      if (signInWindow) {
          const interval = setInterval(() => {
              if (signInWindow.closed) {
                  clearInterval(interval);
                  navigate('/about');
              }
          }, 1000);
      }

  } catch (error) {
      console.error('Error during Google sign-in:', error);
      alert('An error occurred during Google sign-in. Please try again.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user);
    try {
      delete axios.defaults.headers.common["Authorization"];
      const response = await axios.post("http://localhost:8081/api/v1/user/signIn", user,{
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response) {
        localStorage.setItem("token", response.data);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
        console.log(axios.defaults.headers.common["Authorization"]);
        // const token = response.config.headers.Authorization;
        // console.log(token);
      } else {
        alert("error in registration: ");
      }
    } catch (error) {
      console.error("Error:", error);
      // setResponseMessage('Error occurred while creating user');
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
                        onClick={handleGoogleSignIn}
                      >
                        <i className="fab fa-google me-2" /> Sign in with Google
                      </button>
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