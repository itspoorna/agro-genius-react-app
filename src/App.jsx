import { Routes, Route } from "react-router-dom";
import Home from "./components/layout/Home/Home";
import About from "./components/layout/About";
import Contact from "./components/layout/Contact";
import Signin from "./components/registration/Signin";
import Signup from "./components/registration/Signup";
import Layout from "./components/layout/Layout";
import Products from "./components/Product/Products";
import ForgotPassword from "./components/registration/ForgotPassword";
import Cart from "./components/Cart/Cart";
import Order from "./components/Order/Order";
import CropModel from "./components/Crop/CropModel";
import CropInputForm from "./components/Crop/CropInputForm";
import AddProductForm from "./components/Product/AddProductForm";

//KEYCLOAK
import keycloak from "./keycloak";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { useEffect } from "react";
import PrivateRoute from "./routes/PrivateRoutes";

const App = () => {
  useEffect(() => {
    if (window.opener) {
      // send them to the opening window
      window.focus();
      window.opener.location.href = "/";
      window.close();
    }
  }, []);

  return (
    <>
      <ReactKeycloakProvider authClient={keycloak}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/crop" element={<CropInputForm />} />
            <Route path="/crop-result" element={<CropModel />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/user" element={<PrivateRoute />}>
              <Route path="cart" element={<Cart />} />
              <Route path="order" element={<Order />} />
              <Route path="add-product" element={<AddProductForm />} />
              <Route path="order" element={<Order />} />
            </Route>
          </Routes>
        </Layout>
      </ReactKeycloakProvider>
    </>
  );
};

export default App;
