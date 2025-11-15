import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // 👈 NEW
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/signup", form);
      alert("Signup successful! Please login.");
      navigate("/admin/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div
        className="card shadow-lg p-4"
        style={{
          width: "400px",
          borderRadius: "15px",
          background: "rgba(30, 30, 30, 0.9)",
          backdropFilter: "blur(8px)",
          color: "#fff",
        }}
      >
        <h2 className="text-center mb-4 fw-bold">Admin Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control form-control-lg"
              placeholder="Enter username"
              onChange={handleChange}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control form-control-lg"
              placeholder="Enter email"
              onChange={handleChange}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          {/* Password + Show/Hide Button */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"} // 👈 toggle type
                name="password"
                className="form-control form-control-lg"
                placeholder="Enter password"
                onChange={handleChange}
                required
                style={{ borderRadius: "10px", paddingRight: "50px" }}
              />

              {/* Show / Hide Button */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#ffb703",
                  fontWeight: "500",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100 py-2 fw-bold"
            style={{
              background: "linear-gradient(90deg, #ff8c00, #ffcc00)",
              border: "none",
              borderRadius: "10px",
              color: "#000",
            }}
          >
            Signup
          </button>
        </form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <span
            style={{ color: "#ffb703", cursor: "pointer" }}
            onClick={() => navigate("/admin/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
