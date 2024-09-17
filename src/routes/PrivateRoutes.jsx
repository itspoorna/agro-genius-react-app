import React from "react";
import { Navigate } from "react-router-dom";
import UserDashboard from "../components/User/UserDashboard";
import { useAuth } from "../context/Auth";

const PrivateRoute = () => {
  
  const [auth] = useAuth(); // Get authentication status from context

  return auth ? (
    <UserDashboard/>
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoute;



























// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../context/auth';

// const PrivateRoute = ({ path, element: Element, ...rest }) => {
//   const [auth] = useAuth();

//   return auth.token ? (
//     <Route {...rest} path={path} element={<Element />} />
//   ) : (
//     <Navigate to="/signin" replace />
//   );
// };

// export default PrivateRoute;