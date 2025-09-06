import React from "react";
import { Navigate } from "react-router-dom";

const PrivateAdminRoute = ({ children }) => {
  const admin = localStorage.getItem("admin"); // check if admin is logged in
  return admin ? children : <Navigate to="/admin/login" />;
};

export default PrivateAdminRoute;
