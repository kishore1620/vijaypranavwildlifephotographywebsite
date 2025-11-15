// src/pages/AdminLayout.jsx
import React from "react";
import { FaUsers, FaBox, FaShoppingBag, FaSignOutAlt } from "react-icons/fa";
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
      <div
        className="bg-dark text-white p-3"
        style={{
          width: "250px",
          minHeight: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          overflowY: "auto",
        }}
      >
        <h3 className="text-center mb-4">Admin Panel</h3>

        <ul className="nav flex-column">

          {/* Products */}
          <li className="nav-item">
            <button
              className="nav-link text-white text-start w-100"
              onClick={() => navigate("/admin/dashboard/products")}
            >
              <FaBox className="me-2" /> Products
            </button>
          </li>

          {/* Users */}
          <li className="nav-item">
            <button
              className="nav-link text-white text-start w-100"
              onClick={() => navigate("/admin/dashboard/users")}
            >
              <FaUsers className="me-2" /> Users
            </button>
          </li>

          {/* Orders */}
          <li className="nav-item">
            <button
              className="nav-link text-white text-start w-100"
              onClick={() => navigate("/admin/dashboard/orders")}
            >
              <FaShoppingBag className="me-2" /> Orders
            </button>
          </li>

          {/* Logout */}
          <li className="nav-item mt-3">
            <button
              className="nav-link text-white text-start w-100"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="me-2" /> Logout
            </button>
          </li>

        </ul>
      </div>

      {/* Main content */}
      <div
        className="container-fluid p-4"
        style={{ marginLeft: "250px", minHeight: "100vh" }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
