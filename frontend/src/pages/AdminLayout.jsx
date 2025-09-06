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
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3"
        style={{
          width: "250px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3 className="text-center mb-4">Admin Panel</h3>
        <ul className="nav flex-column flex-grow-1">
          <li className="nav-item">
            <button
              className="nav-link text-white text-start"
              onClick={() => navigate("products")}
            >
              <FaBox className="me-2" /> Products
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link text-white text-start"
              onClick={() => navigate("users")}
            >
              <FaUsers className="me-2" /> Users
            </button>
          </li>
        </ul>
        <div>
          <button
            className="nav-link text-white text-start w-100"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-2" /> Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow-1 bg-light p-4" style={{ overflowY: "auto" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
