import React, { useState } from "react";
import axios from "axios";
import AdminSidebar from "../component/AdminSidebar";
import "../css file/employeesignup.css"; // Make sure the path is correct

function EmployeeSignup() {
  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    mobile: "",
    age: "",
    address: "",
    email: "",
    password: ""
  });

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
      const response = await axios.post("https://tours-backend-xlbv.onrender.com", formData);
      alert("Employee registered successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error registering employee:", error);
      alert("Failed to register employee.");
    }
  };

  return (
    <div className="empsb-main">
      <AdminSidebar />
      <div className="empsb-content">
        <div className="empsb-container">
          <h2>Employee Signup</h2>
          <form onSubmit={handleSubmit} className="empsb-form">
            <label>Employee ID:</label>
            <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} required />

            <label>Full Name:</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

            <label>Mobile Number:</label>
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />

            <label>Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />

            <label>Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />

            <label>Email ID:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployeeSignup;
