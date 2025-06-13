import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css file/login.css";

function Login() {
  const [loginid, setLoginid] = useState(""); // Accepts email or employeeId
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!loginid || !password) {
      alert("⚠ Please enter both Login ID and Password.");
      return;
    }

    try {
      const response = await fetch("https://tours-backend-xlbv.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: loginid, password }), // match backend field
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("employeeInfo", JSON.stringify(data.employee)); // Save session if needed
        navigate("/MainHome", { replace: true }); // Redirect to main home page
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      console.error("❌ Login Error:", error);
      alert("🚨 Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-page-container">
        <h2>Employee Login</h2>

        <label>Login ID or Email:</label>
        <input
          type="text"
          value={loginid}
          onChange={(e) => setLoginid(e.target.value)}
          placeholder="Enter your employee ID or email"
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <button className="login-page-button" onClick={handleLogin}>
          Continue →
        </button>
      </div>
    </div>
  );
}

export default Login;
