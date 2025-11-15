// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// User Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";
import MonthlyImage from "./pages/Monthlyimage";
import ProfileForm from "./pages/ProfileForm";
import OrderDetails from "./pages/OrderDetails";

// Context
import { UserProvider } from "./context/UserContext";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminLayout from "./pages/AdminLayout";
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AddProduct";
import AllUsers from "./pages/AllUsers";
import AdminOrders from "./pages/AdminOrders";

// Private Admin Route
const PrivateAdminRoute = ({ children }) => {
  const admin = localStorage.getItem("admin");
  return admin ? children : <Navigate to="/admin/login" />;
};

function Layout() {
  const location = useLocation();

  // Hide Navbar & Footer on admin pages
  const hideNavbarFooter = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        {/* Public User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/monthlyimage" element={<MonthlyImage />} />
        <Route path="/store" element={<Store />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />

        {/* ⭐ Order details route for admin & user */}
        <Route path="/order/:id" element={<OrderDetails />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<ProfileForm />} />

        {/* Admin Auth Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />

        {/* Admin Dashboard Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateAdminRoute>
              <AdminLayout />
            </PrivateAdminRoute>
          }
        >
          <Route index element={<h3>Welcome to Admin Dashboard</h3>} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>

      {!hideNavbarFooter && <Footer />}

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={2000} />
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
