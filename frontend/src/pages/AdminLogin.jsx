import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/admin/login", form);

    // ✅ Save token and admin info
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("admin", JSON.stringify(res.data.admin));

    // ✅ Navigate after saving
    navigate("/admin/dashboard");
  } catch (err) {
    if (err.response?.status === 404) {
      navigate("/admin/signup");
    } else {
      alert(err.response?.data?.msg || "Login failed");
    }
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
        <h2 className="text-center mb-4 fw-bold">Admin Login</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control form-control-lg"
              placeholder="Enter password"
              onChange={handleChange}
              required
              style={{ borderRadius: "10px" }}
            />
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
            Login
          </button>
        </form>
        <p className="mt-3 text-center">
          Don’t have an account?{" "}
          <span
            style={{ color: "#ffb703", cursor: "pointer" }}
            onClick={() => navigate("/admin/signup")}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
