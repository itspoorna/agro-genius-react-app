import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../../context/Auth";
import { useEffect, useState } from "react";

const Header = () => {

  const [auth] = useAuth();
  // console.log(auth);

  const profileUrl =
    "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png";

  return (
    <>
      <nav className="navbar navbar-custom navbar-expand-md navbar-text ">
        <div className="container">
          <Link className="navbar-link-white navbar-brand h1" to="/">
            Agro Genius
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ">
              <li className="nav-item">
                <b>
                  <Link
                    className="h1 navbar-link-white nav-link  active"
                    aria-current="page"
                    to="/"
                  >
                    HOME
                  </Link>
                </b>
              </li>
              <li className="nav-item">
                <b>
                  <Link
                    className="h1 navbar-link-white nav-link "
                    aria-current="page"
                    to="/crop"
                  >
                    CROP-RECOMMEDATION
                  </Link>
                </b>
              </li>
              <li className="nav-item">
                <b>
                  <Link
                    className="h1 navbar-link-white nav-link "
                    aria-current="page"
                    to="/product"
                  >
                    PRODUCTS
                  </Link>
                </b>
              </li>
              <li className="nav-item">
                <b>
                  <Link
                    className="h1 navbar-link-white nav-link "
                    aria-current="page"
                    to="/about"
                  >
                    ABOUT
                  </Link>
                </b>
              </li>
              <li className="nav-item">
                <b>
                  <Link
                    className="h1 navbar-link-white nav-link "
                    aria-current="page"
                    to="/contact"
                  >
                    CONTACT
                  </Link>
                </b>
              </li>
              {!auth?.token && (
                <li className="nav-item">
                  <b>
                    <Link
                      className="h1 navbar-link-white nav-link "
                      aria-current="page"
                      to="/signin"
                    >
                      SIGN IN
                    </Link>
                  </b>
                </li>
              )}
              {auth?.token && (
                <li className="nav-item">
                  <b>
                    <a
                      className="h1 navbar-link-white nav-link "
                      aria-current="page"
                      href={auth?.role === "user" ? "/user" : "/admin"}
                    >
                      <img
                        src={profileUrl}
                        className="img-fluid rounded"
                        alt="Profile"
                        width={25}
                      />
                    </a>
                  </b>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
