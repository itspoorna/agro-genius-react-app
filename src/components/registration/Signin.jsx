import { useState } from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  const [user, setUser] = useState({
    emailId: "",
    phoneNumber: "",
    password: "",
  });
  return (
    <section className="vh-100" style={{ background: "url(login.jpg)",backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Sign in</h3>
                <div className="form-outline mb-4 ">
                  <input
                    type="email"
                    id="typeEmailX-2"
                    value={user.emailId}
                    className="form-control form-control-lg"
                    placeholder="Email"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="typePasswordX-2"
                    value={user.password}
                    className="form-control form-control-lg"
                    placeholder="Password"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {/* Checkbox */}
                {/* <div className="form-check d-flex justify-content-start mb-4"> */}
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
                {/* </div> */}
                {/* Full-width button */}
                <div className="d-grid mb-4">
                  <button
                    className="btn btn-primary btn-lg w-100"
                    type="submit"
                    onClick={() => handleSubmit}
                  >
                    Login
                  </button>
                </div>
                <hr className="my-4" />
                {/* Full-width buttons */}
                <div className="d-grid mb-2">
                  <button
                    className="btn btn-lg w-100"
                    style={{ backgroundColor: "#dd4b39" }}
                    type="submit"
                  >
                    <i className="fab fa-google me-2" /> Sign in with Google
                  </button>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-lg w-100"
                    style={{ backgroundColor: "#3b5998" }}
                    type="submit"
                    onClick={() => console.log("Facebook")}
                  >
                    <i className="fab fa-facebook-f me-2" /> Sign in with
                    Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;

// <div className="container-sm-fluid m-3 p-3">
//   <div className="row ">
//     <div className="col-md-5 offset-md-3">
//       <form className="row g-3" onSubmit={(e) => handleSubmit(e)}>
//         <h2 className="text-center mt-3">Login Form</h2>

//         <div className="col-md-10 offset-md-1">
//           <label htmlFor="emailId" className="form-label">
//             Email ID
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             name="emailId"
//             value={user.emailId}
//             placeholder="Enter your email ID"
//             onChange={(e) => handleChange(e)}
//           />
//         </div>

//         <div className="col-md-10 offset-md-1">
//           <label htmlFor="password2" className="form-label">
//             Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="password2"
//             placeholder="Enter your password"
//           />
//         </div>

//         <div className="col-md-10 offset-md-1">
//           <button
//             type="submit"
//             className="btn btn-primary col-md-12"
//             onClick={() => handleSubmit}
//           >
//             Sign in
//           </button>
//           <br /> <br />
//           <div className="row">
//             <div className="col-md-5">
//               <p>
//                 Don't have an account? <a href="/signup">Click here</a>
//               </p>
//             </div>
//             <div className="col-md-4 ms-auto">
//               <p>
//                 <a href="#">Forgot password ?</a>
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="row g-0">
//           <div className="col-md-5 ms-md-auto">
//             <a href="#" class="btn btn-outline-secondary">
//               <img src="google.svg" alt="" width={"20px"} /> Continue with
//               Google
//             </a>
//           </div>
//           <div className="col-md-5 ms-md-auto">
//             <a href="#" class="btn btn-outline-primary">
//               <img src="facebook.svg" alt="" width={"20px"} /> Continue with
//               Facebook
//             </a>
//           </div>
//         </div>
//       </form>
//       <br />
//     </div>
//   </div>
// </div>
