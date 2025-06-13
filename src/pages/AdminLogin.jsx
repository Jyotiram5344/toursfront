import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "../css file/login.css";

function AdminLogin() {
  const [formData, setFormData] = useState({
    identifier: "admin",     // Default ID/email
    password: "admin",       // Default password
  });

  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://tours-backend-xlbv.onrender.com", // ✅ ensure correct backend endpoint
        formData
      );

      if (response.data.success) {
        alert("Login successful!");
        console.log("Admin Info:", response.data.admin);
        navigate("/admindashboard");
      } else {
        alert("Login failed. Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error during login.");
    }
  };

  return (
    <div className="admin-dashboard-main">
      <div className="admin-dashboard-content">
        <div className="signup-container">
          <h2>Admin Login</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <label>Admin ID or Email:</label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
            />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit">Login</button>
            {loginStatus && <p style={{ color: "red", marginTop: "10px" }}>{loginStatus}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
