import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import AdminDashboard from "../components/Admin/AdminDashboard";

export default function AdminPrivateRoute() {
  
  const [auth] = useAuth();

  return auth?.role && auth.role.includes("admin") ? <AdminDashboard /> : <Navigate to="/unauthorized" />;
}