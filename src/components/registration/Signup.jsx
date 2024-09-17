import { useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
      setUser((prevUser) => ({ ...prevUser, profilePic: downloadURL }));
    } catch (error) {
      console.error("Error uploading file:", error);
      }
  };

  console.log(user);

  const states = ["Karnataka", "Andra"];

  //Google sign in'
  const signInWithGoogle = () => {
    window.open(
      "http://localhost:8080/realms/AGROGENIUS/protocol/openid-connect/auth?response_type=code&client_id=AGFE&kc_idp_hint=google",
      "google login",
      "toolbar=no, menubar=no, width=700, height=700, top=100, left=300"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== confirmPassword) {
      window.alert("Please confirm your password");
    }

    try {
      const response = await fetch("http://localhost:8081/api/v1/user/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
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
          background: "url(login2.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="row p-4">
          <div className="col-md-6 offset-md-3">
            <form
              className="row g-1 rounded-4 bg-light"
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
                  Zipcode
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
                <label htmlFor="profilePic" className="form-label">
                  Profile Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="profilePic"
                  id="profilePic"
                  placeholder="Upload your profile imae"
                  onChange={(e) => handleFileChange(e)}
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
                    className="btn btn-primary btn-md w-100"
                    type="submit"
                    onClick={() => handleSubmit}
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
