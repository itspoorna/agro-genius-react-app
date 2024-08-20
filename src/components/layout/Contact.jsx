import FeedbackForm from "../FeedbackForm";

const Contact = () => {
  return (
    <>
      {/* Contact Intro */}
      <div className="container-fluid bg-light">
        <div className="row m-5 h-50 g-0  position-relative">
          <div className="col-md-6 p-4 ps-md-0">
            <h4 className="mt-4 text-center">
               <b>Contact To Agro Genius</b>
            </h4>
            <p className="text-start m-4">
              With a passion for excellence and a commitment to innovation, we
              proudly supply the finest inspection instrumentation available on
              the market. If you have any questions or need more information
              about our products, feel free to reach out. Our customer support
              team is here to assist you in Kannada, English, Hindi, or Telugu.
            </p>
            <a href="#contact" className="stretched-link ms-4">
              Get in Touch
            </a>
          </div>
          <div className="col-md-6 mb-md-0 p-md-4" id="contact">
            <img src="contact.avif" className="w-100" alt="..." />
          </div>
        </div>
      </div>

      {/* Contact data */}
      <div className="d-sm-flex justify-content-center m-5" >
        <div className="container ">
          <div className="row">
            <div className="col-md-8">
              <div className="card text-bg-light m-2 p-2 flex-fill mb-sm-5 mt-sm-5">
                <div className="card-header">
                  <h5 className="card-title">Email ID</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    agrogenius@gmail.com, poornap687@gmail.com
                  </p>
                </div>
              </div>
              <div className="card text-bg-light m-2 p-2 flex-fill mb-sm-5 mt-sm-5">
                <div className="card-header">
                  <h5 className="card-title">Mobile No </h5>
                </div>
                <div className="card-body">
                  <p className="card-text ">+91 8660202938, +91 9019657790</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Feedback Form */}
        <div className="p-2 flex-fill">
          <FeedbackForm />
        </div>
      </div>
    </>
  );
};

export default Contact;
