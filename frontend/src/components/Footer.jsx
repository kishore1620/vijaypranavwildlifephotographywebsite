import React from "react";
import "../styles/Footer.css";
import logo from "/img/headerlogo1.jpg";
import instaLogo from "/img/instalogo.png";
import fbLogo from "/img/fblogo.png";
import gmailLogo from "/img/gmaillogo.png";

export default function Footer() {
  return (
    <footer className="footer navbar-custom-dark py-4">
      <div className="container">
        <div className="row align-items-center text-center text-md-start">
          
          {/* Logo */}
          <div className="col-md-4 mb-3 mb-md-0 d-flex justify-content-center justify-content-md-start">
            <img src={logo} alt="Website Logo" className="footer-logo" />
          </div>

          {/* Copyright */}
          <div className="col-md-4 mb-3 mb-md-0 text-center footer-text">
            &copy; Vijay Pranav Photography 2025. All Rights Reserved.
          </div>

          {/* Social Links */}
          <div className="col-md-4 d-flex justify-content-center justify-content-md-end">
            <a
              href="https://www.instagram.com/vijaypranav_photography"
              className="social-icon"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instaLogo} alt="Instagram" />
            </a>
            <a
              href="https://www.facebook.com/vijaypranav3888"
              className="social-icon"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={fbLogo} alt="Facebook" />
            </a>
            <a
              href="mailto:kishoreragul0@gmail.com"
              className="social-icon"
              aria-label="Gmail"
            >
              <img src={gmailLogo} alt="Gmail" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
