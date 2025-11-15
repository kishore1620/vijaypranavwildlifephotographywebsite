import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [strength, setStrength] = useState("");
  const navigate = useNavigate();

  // Password Strength Check
  const checkStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) setStrength("Weak");
    else if (score <= 3) setStrength("Medium");
    else setStrength("Strong");
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    checkStrength(pwd);
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      setMessage("Signup successful 🎉");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed ❌");
    }
  };

  return (
    <div className="signup-wrapper container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4 signup-card">
        <h3 className="text-center text-warning mb-3">Sign Up</h3>

        {message && <div className="custom-alert">{message}</div>}

        <form onSubmit={handleSignup}>
          {/* Full Name */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              className="form-control custom-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control password-input"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />

              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {password && (
              <small
                className={`mt-1 d-block strength-text ${strength === "Strong"
                    ? "strong"
                    : strength === "Medium"
                      ? "medium"
                      : "weak"
                  }`}
              >
                Strength: {strength}
              </small>
            )}
          </div>


          <button type="submit" className="btn btn-warning w-100 signup-btn">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <span
            className="text-warning login-link"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
