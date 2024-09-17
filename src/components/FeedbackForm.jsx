import axios from "axios";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const FeedbackForm = () => {

  const captchaRef = useRef(null);

  const [disableSubmit, setSubmitbutton] = useState(true);

  const [contact, setUser] = useState({
    name: "",
    emailId: "",
    subject: "",
    comment: "",
    token:""
  });

  const handleChange = async(event) => {
    const { name, value } = event.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const tokenValue = captchaRef.current.getValue();
    setUser((prevData) => ({ ...prevData, token: tokenValue }));
    console.log(contact,);

    const url = import.meta.env.VITE_AGRO_GENIUS_URL;

    try {
      const  response = await axios.post(`${url}/contact`, contact)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    // captchaRef.current.reset();

  }


  return (
    <div className="container-fluid bg-light rounded p-3">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <form className="row g-3">
            <h2 className="text-center mt-3">Keep In Touch</h2>
            <div className="col-sm-6">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                value={contact.name}
                placeholder="Enter your name"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="emailId" className="form-label">
                Email ID
              </label>
              <input
                type="email"
                className="form-control"
                name="emailId"
                id="emailId"
                  value={contact.emailId}
                placeholder="Enter your email ID"
                  onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <input
                type="textl"
                className="form-control"
                name="subject"
                id="subject"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="comment" className="form-label">
                Comment
              </label>
              <textarea
                className="form-control"
                aria-label="Comment"
                id="comment"
                name="comment"
                defaultValue={""}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-sm-12">
            <ReCAPTCHA
              sitekey="6LewSj4qAAAAAPZ18SCnvRHDzXM4UarIi3GXgt4l"
              ref={captchaRef}
              onChange={() => setSubmitbutton(false)}
            />
            </div>
            <div className="col-sm-12">
              <button
                type="submit"
                className="btn btn-primary col-sm-12"
                onClick={(e) => handleSubmit(e)}
                disabled={disableSubmit}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
