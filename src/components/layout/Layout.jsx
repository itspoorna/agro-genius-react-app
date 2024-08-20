import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{background: "#e2eaef"}}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
