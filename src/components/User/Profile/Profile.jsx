import React, { useState, useEffect } from "react";
import "./Profile.css"; // Import your CSS for styling
import axios from "axios";
import { useAuth } from "../../../context/Auth";

const Profile = () => {
  const [auth, updateAuth] = useAuth();

  const url = import.meta.env.VITE_AGRO_GENIUS_URL;

  const [user, setUser] = useState({
    fullName: "",
    emailId: "",
    phoneNumber: "",
    profilePic: null,
  }); // Initially null to handle loading state

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    emailId: "",
    phoneNumber: "",
    profilePic: "",
  });

  const [loading, setLoading] = useState(true); // Handle loading state

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${url}/user/${auth?.userId}`, {
          headers: {
            Authorization: auth?.token,
          },
        });
        const data = response.data;
        setUser(data);

        setLoading(false); // Stop loading once the data is fetched
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user,loading]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(user); // Reset form data on cancel
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send updated user data to the server

      const response = await axios.put(`${url}/user/${auth?.userId}`,formData, {
          headers: {
            "Content-Type": "application/json",
             Authorization: auth?.token
          },
        }
      );

      if (response.ok) {
        setUser(formData); // Update the user state with new data

        setIsEditing(false);
      } else {
        console.error("Error updating user profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <div className="vh-100">Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div
      className="profile-page-container"
      style={{ backgroundColor: "rgb(241, 243, 244)" }}
    >
      <div className="profile-card">
        <div className="profile-header">
          <h2>{isEditing ? "Edit Profile" : "Profile Overview"}</h2>
        </div>

        <div className="profile-content">
          <div className="profile-pic">
            <img
              src={
                user.profilePic
                  ? user.profilePic
                  : "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"
              }
            />
          </div>

          {!isEditing ? (
            <div className="profile-details">
              <h3>{user ? user.fullName : "user"}</h3>

              <br />

              <p className="profile-email">
                <strong>Email :</strong>{" "}
                {user ? user.emailId : "user@gmail.com"}
              </p>
              <p className="profile-phoneNumber">
                <strong>Mobile :</strong>{" "}
                {user ? user.phoneNumber : "phoneNumber data"}
              </p>

              <button className="edit-btn" onClick={() => handleEdit}>
                Edit Profile
              </button>
            </div>
          ) : (
            <form className="edit-form" onSubmit={() => handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Name:</label>

                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  defaultValue={user.fullName}
                  onChange={() => handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>

                <input
                  type="email"
                  id="email"
                  name="emailId"
                  defaultValue={user.emailId}
                  onChange={() => handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Bio:</label>

                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  defaultValue={user.phoneNumber}
                  onChange={() => handleChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="profile-save-btn">
                  Save
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

