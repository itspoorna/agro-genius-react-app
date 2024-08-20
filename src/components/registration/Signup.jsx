import { useState } from "react";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    emailId: "",
    phoneNumber: "",
    area: "",
    city: "",
    pincode: "",
    profilePic: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const states = ["Karnataka", "Andra"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== confirmPassword) {
      window.alert("Please confirm your password");
    }

    try {
      const response = await fetch("http://localhost:8080/api/v1/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });

      if (response) {
        // const data = await response.json();
        console.log(response);
      } else {
        alert("error in registration: ");
      }
    } catch (error) {
      console.error("Error:", error);
      // setResponseMessage('Error occurred while creating user');
    }
  };

  return (
    <>
      <div
        className="container-fluid "
        style={{
          background: "url(login.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="row p-4">
          <div className="col-md-5 offset-md-3">
            <form
              className="row g-2 rounded-4 bg-light"
              onSubmit={(e) => handleSubmit(e)}
            >
              <h2 className="text-center mt-3">Registration Form</h2>
              <div className="col-md-10 offset-md-1">
                <label htmlFor="fullName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  id="fullName"
                  value={user.fullName}
                  placeholder="Enter your name"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="col-md-10 offset-md-1">
                <label htmlFor="emailId" className="form-label">
                  Email ID
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="emailId"
                  value={user.emailId}
                  placeholder="Enter your email ID"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="col-md-10 offset-md-1">
                <label htmlFor="phone" className="form-label">
                  Mobile No
                </label>
                <input
                  type="tel"
                  className="form-control"
                  name="phoneNumber"
                  id="phone"
                  value={user.phoneNumber}
                  placeholder="Enter your Mobile number"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="col-md-5 ms-auto">
                <label htmlFor="password1" className="form-label">
                  Set Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="password1"
                  name="password"
                  value={user.password}
                  placeholder="Enter strong password"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="col-md-5 me-auto">
                <label htmlFor="password2" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  placeholder="Enter strong password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="col-md-10 offset-md-1">
                <label htmlFor="inputAddress2" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="area"
                  value={user.area}
                  id="inputAddress2"
                  placeholder="Apartment no, colony"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="col-md-5 ms-auto">
                <label htmlFor="inputCity" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={user.city}
                  id="inputCity"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="inputState" className="form-label">
                  State
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  value={user.state}
                  onChange={(e) => handleChange(e)}
                >
                  {states.map((option) => (
                    <option key={option} value={user.option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2 me-auto">
                <label htmlFor="inputZip" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  value={user.pincode}
                  id="inputZip"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="col-md-10 offset-md-1">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label className="form-check-label" htmlFor="gridCheck">
                    I agree <a href="#">terms and condition</a>
                  </label>
                </div>
              </div>
              <div className="col-md-10 offset-md-1">
                <div className="d-grid mb-4">
                  <button
                    className="btn btn-primary btn-lg w-100"
                    type="submit"
                    onClick={() => handleSubmit}
                  >
                    Register
                  </button>
                </div>
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
                  <i className="fab fa-facebook-f me-2" /> Sign in with Facebook
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
