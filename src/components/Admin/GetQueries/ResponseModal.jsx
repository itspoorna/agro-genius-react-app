import React, { useState } from "react";
import "./ResponseModal.css";
import axios from "axios";

const ResponseModal = ({ show, query, handleClose }) => {
  const [subject, setSubject] = useState("Thank You for Your Inquiry");
  const [message, setMessage] = useState(`Dear ${query?.name || "User"},

Thank you for reaching out to us. We have received your inquiry and appreciate you taking the time to contact us.

Our team will review your message and respond as soon as possible. If you have any additional information to share, please feel free to reply to this email.

Thank you for your patience.

Best regards,
Agro Genius Team`);
  const [statusMessage, setStatusMessage] = useState("");

  if (!show) {
    return null;
  }

  if (!query) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Error</h2>
          <p>No query data available.</p>
          <button className="cancel-btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const contactData = {
      id: query.id,
      name: query.name,
      emailId: query.emailId,
      subject,
      comment: message,
      token: query.token,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8081/api/v1/contact/submit",
        contactData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Since axios throws an error on non-2xx responses, no need to check response.ok
      alert("Successfully sent mail.");
      setStatusMessage("Email sent successfully");

      setTimeout(() => {
        handleClose();
        setStatusMessage("");
      }, 2000);
    } catch (error) {
      setStatusMessage("Error sending email");
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Respond to {query.name}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Subject:
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </label>
          <label>
            Message:
            <textarea
              rows="10"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          {statusMessage && (
            <div className="status-message">{statusMessage}</div>
          )}
          <div className="modal-actions">
            <button type="submit" className="send-btn">
              Send
            </button>
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResponseModal;
