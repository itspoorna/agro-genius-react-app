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

const App = () => {
  return (
    <>
    <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user/cart" element={<Cart />} />
          <Route path="/user/order" element={<Order />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
    </Layout>
    </>
  );
};

export default App;
