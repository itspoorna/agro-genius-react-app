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
import AddProductForm from "./components/Admin/AddProductForm";

import { useEffect } from "react";
import PrivateRoute from "./routes/PrivateRoutes";
import UserDashboard from "./components/User/UserDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Reports from "./components/Admin/Reports/Reports";
import Orders from "./components/Admin/Orders/Orders";
import Feedback from "./components/Admin/Feedback";
import Users from "./components/Admin/Users";
import ProductPage from "./components/Admin/ProductPage/ProductPage";
import Profile from "./components/User/Profile/Profile";
import Wishlist from "./components/User/Wishlist";
import PagenotFound from "./pages/PagenotFound";
import EditProduct from "./components/Admin/ProductPage/EditProduct";

const App = () => {
  
  return (
    <>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="product"
              element={<Products />}
            />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Signin />} />
            <Route path="crop" element={<CropInputForm />} />
            <Route path="crop-result" element={<CropModel />} />
            <Route path="forgot-password" element={<ForgotPassword />} />

            <Route path="user" element={<UserDashboard/>}>
              <Route index element={<Profile />} />
              <Route path="cart" element={<Cart />} />
              <Route path="order" element={<Order />} />
              <Route path="wishlist" element={<Wishlist/>} />
            </Route>
            <Route path="admin" element={<AdminDashboard />}>
              <Route index element={<Reports />}/>
              <Route path="orders" element={<Orders />}/>
              <Route path="feedback" element={<Feedback />}/>
              <Route path="users" element={<Users />}/>
              <Route path="products" element={<ProductPage />}/>
              <Route path="add-product" element={<AddProductForm />} />
              <Route path="edit-product" element={<EditProduct />} />
            </Route>
            <Route path="*" element={<PagenotFound/>}/>
          </Routes>
        </Layout>
    </>
  );
};

export default App;
