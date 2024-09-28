import { useRef, useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    emailId: "",
    phoneNumber: "",
    gender: "",
    profilePic: "",
    password: "",
  });

  const [errors, setError] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");

  const [otp, setOtp] = useState("");

  const modalRef = useRef(null);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleOtp = (e) => {
    setOtp(e.target.value);
  };

  const [strength, setStrength] = useState({ percent: 0, level: "" });

  const calculateStrength = (password) => {
    let strengthValue = 0;
    if (password.length >= 8) {
      strengthValue += 25; // Password length
    }
    if (/[A-Z]/.test(password)) {
      strengthValue += 25; // Uppercase letter
    }
    if (/[0-9]/.test(password)) {
      strengthValue += 25; // Number
    }
    if (/[^A-Za-z0-9]/.test(password)) {
      strengthValue += 25; // Special character
    }

    let level;
    if (strengthValue <= 25) {
      level = "Weak";
    } else if (strengthValue <= 75) {
      level = "Moderate";
    } else {
      level = "Strong";
    }

    return {
      percent: strengthValue,
      level: level,
    };
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
 
  const emailVerify = async () => {
    console.log(form.checkValidity());
    if(validate()){
      console.log("validated");
    }
    if (user.password !== confirmPassword) {
      toast.warning("Please confirm your password");
    } else {
      try {
        const response = await axios
          .post("http://localhost:8081/api/v1/validator", {
            value: user?.emailId,
          })
          .catch(() =>
            toast.warning("Internal server error while generating otp")
          );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios
        .post("http://localhost:8081/api/v1/validator/verify", {
          value: user?.emailId,
          otp: otp,
        })
        .catch(() => toast.warning("Invalid otp enter valid otp"));
      if (response.status === 200) {
        setOtp("");
        toast.success(response?.data, {
          position: "top-right",
          autoClose: 1000,
        });
        const res = await axios.post(
          "http://localhost:8081/api/v1/user/signUp",
          user,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res) {
          toast.success(res?.data, {
            position: "top-right",
            autoClose: 3000,
          });
          setTimeout(() => {
            navigate("/signin");
            window.location.reload();
          }, 2000);
        } else {
          toast.warning("error in registration: ");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="container-fluid vh-100"
        style={{
          background: "url(login2.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="row p-4">
          <div className="col-md-6 offset-md-3 mt-md-5">
            <form
              className="row g-1 rounded-4 bg-light"
              onSubmit={() => emailVerify()}
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
                  pattern="[A-Za-z\s]+"
                  title="Full Name can only contain letters and spaces"
                  required
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
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address"
                  required
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
                  pattern="[0-9]{10}"
                  title="Phone number must be exactly 10 digits"
                  required
                />
              </div>
              <div className="col-md-10 offset-md-1 my-2">
                <label htmlFor="phone" className="form-label">
                  Gender
                </label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="male"
                      onChange={() =>
                        setUser((prevUser) => ({ ...prevUser, gender: "Male" }))
                      }
                    />
                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="female"
                      onChange={() =>
                        setUser((prevUser) => ({
                          ...prevUser,
                          gender: "Female",
                        }))
                      }
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="others"
                      onChange={() =>
                        setUser((prevUser) => ({
                          ...prevUser,
                          gender: "Others",
                        }))
                      }
                    />
                    <label className="form-check-label" htmlFor="others">
                      Others
                    </label>
                  </div>
                </div>
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
                  onChange={(e) => {
                    handleChange(e);
                    setStrength(calculateStrength(e.target.value));
                  }}
                  title="Password must be at least 8 characters, and include an uppercase letter, lowercase letter, number, and special character"
                  required
                />
              </div>
              <div className="col-md-5 me-auto">
                <label htmlFor="password2" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="ms-1 form-control"
                  id="password2"
                  placeholder="Enter strong password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (user?.password !== e.target.value) {
                      setError("Passwords do not match");
                    }else{
                      setError(false);
                    }
                
                  }}
                  required
                />
                {errors && (
                <p className="text-danger">{errors}</p>
                )}
              </div>
              <div className="col-md-10 offset-md-1">
                {user?.password.length > 0 && (
                  <div className="strength-bar mt-2">
                    <div className="progress">
                      <div
                        className={`progress-bar ${
                          strength.level === "Weak"
                            ? "bg-danger"
                            : strength.level === "Moderate"
                            ? "bg-warning"
                            : "bg-success"
                        }`}
                        role="progressbar"
                        style={{ width: `${strength.percent}%` }}
                        aria-valuenow={strength.percent}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                    <small className="form-text">
                      {strength.level} ({strength.percent}%)
                    </small>
                  </div>
                )}
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
                  required
                />
              </div>
              <div className="col-md-10 offset-md-1">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                    required
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
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}

      <div
        className="modal fade"
        id="myModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Verify your Email
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <p>
                Before completing the registration process please enter the otp
                which has been sent your <b> '{user?.emailId}'</b>
              </p>
              <input type="text" value={otp} onChange={(e) => handleOtp(e)} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => verifyOtp()}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
