import { Outlet, Navigate } from "react-router-dom";

const Routes = () => {
    const isLogin = false;
    return isLogin ? <Outlet /> : <Navigate to="/signin" /> 
}

export default Routes;
