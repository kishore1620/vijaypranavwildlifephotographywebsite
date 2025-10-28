import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { user, logoutUser, cart } = useContext(UserContext);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // ✅ track collapse

  useEffect(() => {
    const totalQty = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
    setCartCount(totalQty);
  }, [cart]);

  // Auto-close on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false); // ✅ close menu after navigating
  };

  const handleLogout = () => {
    if (logoutUser) {
      logoutUser();
      navigate("/login");
      setIsOpen(false);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container">
        {/* Brand logo */}
        <span
          className="navbar-brand"
          role="button"
          onClick={() => handleNavClick("/store")}
        >
          <img src="/img/headerlogo1.jpg" alt="Logo" className="navbar-logo" />
        </span>

        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)} // ✅ toggle state
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible menu */}
        <div
          className={`collapse navbar-collapse justify-content-end ${
            isOpen ? "show" : ""
          }`}
          id="navbarNav"
        >
          <ul className="navbar-nav text-center text-black">
            <li className="nav-item px-3">
              <span
                className="nav-link"
                role="button"
                onClick={() => handleNavClick("/about")}
              >
                ABOUT
              </span>
            </li>
            <li className="nav-item px-3">
              <span
                className="nav-link"
                role="button"
                onClick={() => handleNavClick("/gallery")}
              >
                MY GALLERY
              </span>
            </li>
            <li className="nav-item px-3">
              <span
                className="nav-link"
                role="button"
                onClick={() => handleNavClick("/store")}
              >
                STORE
              </span>
            </li>
            <li className="nav-item px-3">
              <span
                className="nav-link"
                role="button"
                onClick={() => handleNavClick("/contact")}
              >
                CONTACT
              </span>
            </li>

            {/* Cart */}
            <li className="nav-item px-3">
              <span
                className="nav-link position-relative"
                role="button"
                onClick={() => handleNavClick("/cart")}
              >
                <i className="fa-solid fa-cart-shopping fa-lg"></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </span>
            </li>

            {/* User Dropdown */}
            {user ? (
              <li className="nav-item dropdown px-3">
                <span
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ cursor: "pointer" }}
                >
                  Hi, {user._name}
                </span>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <span
                      className="dropdown-item"
                      role="button"
                      onClick={() => handleNavClick("/profile")}
                    >
                      Profile
                    </span>
                  </li>
                  <li>
                    <span
                      className="dropdown-item"
                      role="button"
                      onClick={() => handleNavClick("/orders")}
                    >
                      My Orders
                    </span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <span
                      className="dropdown-item"
                      role="button"
                      onClick={handleLogout}
                    >
                      Logout
                    </span>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item px-3">
                <span
                  className="btn btn-outline-dark"
                  role="button"
                  onClick={() => handleNavClick("/login")}
                >
                  Login / Signup
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
