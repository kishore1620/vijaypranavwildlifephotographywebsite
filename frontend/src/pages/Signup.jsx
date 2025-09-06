import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Password strength logic
  const checkStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 1) setStrength("Weak");
    else if (score === 2 || score === 3) setStrength("Medium");
    else setStrength("Strong");
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    checkStrength(pwd);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });
      setMessage(data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center text-warning mb-3">Sign Up</h3>
        {message && <div className="alert alert-danger">{message}</div>}
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                cursor: "pointer",
                transform: "translateY(-50%)",
                color: "#ff6b00",
                fontWeight: "bold",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
            {password && (
              <small className={`d-block mt-1 text-${strength === "Strong" ? "success" : strength === "Medium" ? "warning" : "danger"}`}>
                Strength: {strength}
              </small>
            )}
          </div>
          <button type="submit" className="btn btn-warning w-100">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account?{" "}
          <span
            className="text-warning"
            style={{ cursor: "pointer" }}
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
