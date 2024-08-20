import React from "react";

const FeedbackForm = () => {
  return (
    <div className="container-fluid bg-light rounded p-3">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <form className="row g-3">
            <h2 className="text-center mt-3">Keep In Touch</h2>
            <div className="col-sm-6">
              <label htmlFor="fullName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                id="fullName"
                // value={user.fullName}
                placeholder="Enter your name"
                // onChange={(e) => handleChange(e)}
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
                //   value={user.emailId}
                placeholder="Enter your email ID"
                //   onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="phoneNumber" className="form-label">
                Mobile No
              </label>
              <input
                type="tel"
                className="form-control"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Enter your Mobile number"
                //   onChange={(e) => handleChange(e)}
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
              />
            </div>
            <div className="col-sm-12">
              <button
                type="submit"
                className="btn btn-primary col-sm-12"
                // onClick={() => handleSubmit}
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
