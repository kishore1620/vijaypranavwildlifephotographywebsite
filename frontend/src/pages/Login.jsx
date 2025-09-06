import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // ✅ Backend should return full user object
      const userObj = { _id: data.userId, name: data.name, email: data.email };

      // Save in context + localStorage
      loginUser(userObj);

      setMessage("Login successful ✅");
      setTimeout(() => navigate("/store"), 1000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center text-warning mb-3">Login</h3>
        {message && <div className="alert alert-danger">{message}</div>}
        <form onSubmit={handleLogin}>
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
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-warning w-100">
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <span className="text-warning" style={{ cursor: "pointer" }} onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
