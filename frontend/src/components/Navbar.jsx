import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { user, logoutUser, cart } = useContext(UserContext);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const totalQty = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
    setCartCount(totalQty);
  }, [cart]);

  // Collapse navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const navCollapse = document.getElementById("navbarNav");
      if (window.scrollY > 50 && navCollapse.classList.contains("show")) {
        const bsCollapse = new window.bootstrap.Collapse(navCollapse, { toggle: false });
        bsCollapse.hide();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavLinkClick = () => {
    const navCollapse = document.getElementById("navbarNav");
    if (navCollapse.classList.contains("show")) {
      const bsCollapse = new window.bootstrap.Collapse(navCollapse, { toggle: false });
      bsCollapse.hide();
    }
  };

  const handleLogout = () => {
    if (logoutUser) {
      logoutUser();
      navigate("/login");
      handleNavLinkClick();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand" to="/store" onClick={handleNavLinkClick}>
          <img src="img/headerlogo1.jpg" alt="Logo" className="navbar-logo" />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav text-center text-black">
            <li className="nav-item px-3">
              <NavLink className="nav-link" to="/about" onClick={handleNavLinkClick}>
                ABOUT
              </NavLink>
            </li>
            <li className="nav-item px-3">
              <NavLink className="nav-link" to="/gallery" onClick={handleNavLinkClick}>
                MY GALLERY
              </NavLink>
            </li>
            <li className="nav-item px-3">
              <NavLink className="nav-link" to="/store" onClick={handleNavLinkClick}>
                STORE
              </NavLink>
            </li>
            <li className="nav-item px-3">
              <NavLink className="nav-link" to="/contact" onClick={handleNavLinkClick}>
                CONTACT
              </NavLink>
            </li>

            {/* Cart Icon */}
            <li className="nav-item px-3">
              <NavLink className="nav-link position-relative" to="/cart" onClick={handleNavLinkClick}>
                <i className="fa-solid fa-cart-shopping fa-lg"></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </NavLink>
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
                    <NavLink className="dropdown-item" to="/profile" onClick={handleNavLinkClick}>
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/orders" onClick={handleNavLinkClick}>
                      My Orders
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <span className="dropdown-item" onClick={handleLogout} style={{ cursor: "pointer" }}>
                      Logout
                    </span>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item px-3">
                <NavLink className="btn btn-outline-dark" to="/login" onClick={handleNavLinkClick}>
                  Login / Signup
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
