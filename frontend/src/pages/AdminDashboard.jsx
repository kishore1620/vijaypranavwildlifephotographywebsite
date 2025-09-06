// src/pages/AdminLayout.jsx
import React from "react";
import { FaUsers, FaBox, FaSignOutAlt } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
        <h3 className="text-center mb-4">Admin Panel</h3>
        <ul className="nav flex-column">
          <li className="nav-item">
            <button
              className="nav-link text-white"
              onClick={() => navigate("/admin/dashboard/products")}
            >
              <FaBox className="me-2" /> Products
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link text-white"
              onClick={() => navigate("/admin/dashboard/users")}
            >
              <FaUsers className="me-2" /> Users
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link text-white" onClick={handleLogout}>
              <FaSignOutAlt className="me-2" /> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main content (outlet for children routes) */}
      <div className="container-fluid p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
