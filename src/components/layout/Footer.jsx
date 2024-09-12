import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer className="text-center text-lg-start bg-body-tertiary text-muted">
        {/* Section: Links  */}
        <section>
          <div className="container text-center text-md-start mt-5">
            {/* Grid row */}
            <div className="row mt-3">
              {/* Grid column */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* Content */}
                <h6 className="text-uppercase fw-bold mb-4">
                <img src="agroGeniusLogo.svg" alt="Logo" width={"30px"}/> {' '}
                  Agro Genius
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <Link to="#" className="text-reset">
                    Fertilizers
                  </Link>
                </p>
                <p>
                  <Link to="#" className="text-reset">
                    Seeds
                  </Link>
                </p>
                <p>
                  <Link to="#" className="text-reset">
                    Plants
                  </Link>
                </p>
                <p>
                  <Link to="#" className="text-reset">
                    Pesticides
                  </Link>
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <Link to="#" className="text-reset">
                    Pricing
                  </Link>
                </p>
                <p>
                  <Link to="#" className="text-reset">
                    Settings
                  </Link>
                </p>
                <p>
                  <Link to="#" className="text-reset">
                    Orders
                  </Link>
                </p>
                <p>
                  <Link to="#" className="text-reset">
                    Help
                  </Link>
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3" /> BVB Campus Hubli, Karnataka
                </p>
                <p>
                  <i className="fas fa-envelope me-3" />
                  agrogenius@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone me-3" /> +91 8660202938
                </p>
                <p>
                  <i className="fas fa-print me-3" /> +91 9019657790
                </p>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </div>
        </section>
        {/* Section: Links  */}
        {/* Copyright */}
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2021 Copyright:
          <Link className="text-reset fw-bold" to="https://mdbootstrap.com/">
            MDBootstrap.com
          </Link>
        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}
    </>
  );
};

export default Footer;
