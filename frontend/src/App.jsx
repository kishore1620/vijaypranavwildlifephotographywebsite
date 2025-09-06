// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Store from "./pages/Store";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";
import MonthlyImage from "./pages/Monthlyimage";
import { UserProvider } from "./context/UserContext";


// 🔹 Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminLayout from "./pages/AdminLayout"; // Layout with sidebar
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AddProduct";
import ProfileForm from "./pages/ProfileForm";

// import AdminUsers from "./pages/AdminUsers"; // create this if you need Users page

// 🔹 Private Admin Route
const PrivateAdminRoute = ({ children }) => {
  const admin = localStorage.getItem("admin");
  return admin ? children : <Navigate to="/admin/login" />;
};

function Layout() {
  const location = useLocation();

  // Hide Navbar & Footer on all admin routes
  const hideNavbarFooter = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/monthlyimage" element={<MonthlyImage />} />
        <Route path="/store" element={<Store />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<ProfileForm />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        {/* Admin Dashboard with Sidebar */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateAdminRoute>
              <AdminLayout />
            </PrivateAdminRoute>
          }
        >
          {/* Nested routes inside AdminLayout */}
          <Route index element={<h3>Welcome to Admin Dashboard</h3>} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          {/* <Route path="users" element={<AdminUsers />} /> */}
        </Route>

      </Routes>

      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <UserProvider>
        <Layout />
      </UserProvider>
    </Router>
  );
}
