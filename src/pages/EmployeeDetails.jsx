import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../component/AdminSidebar";
import "../css file/employeedetails.css";

function EmployeeDetails() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("https://tours-backend-xlbv.onrender.com");
      setEmployees(res.data);
    } catch (err) {
      alert("Failed to fetch employees");
      console.error(err);
    }
  };

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setEditingEmployee(null);
    setEmployees(prev => prev.map(emp => emp.id === employee.id ? emp : { ...emp, hidden: true }));
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setSelectedEmployee(null);
    setFormData({ ...employee });
    setEmployees(prev => prev.map(emp => emp.id === employee.id ? emp : { ...emp, hidden: true }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/employees/${editingEmployee.id}`, formData);
      alert("Employee updated successfully");
      setEditingEmployee(null);
      fetchEmployees();
    } catch (err) {
      alert("Failed to update employee");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/employees/${id}`);
      alert("Employee deleted successfully");
      setSelectedEmployee(null);
      setEditingEmployee(null);
      fetchEmployees();
    } catch (err) {
      alert("Failed to delete employee");
      console.error(err);
    }
  };

  return (
    <div className="employeedetails-container">
      <AdminSidebar />
      <h2 className="employeedetails-title">Employee Details</h2>

      <table className="employeedetails-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Full Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr><td colSpan="5" className="employeedetails-no-data">No employees found.</td></tr>
          ) : (
            employees.map(employee => (
              <tr key={employee.id} style={{ display: employee.hidden ? 'none' : '' }}>
                <td>{employee.employeeId}</td>
                <td>{employee.fullName}</td>
                <td>{employee.mobile}</td>
                <td>{employee.email}</td>
                <td>
                  <button className="employeedetails-btn view" onClick={() => handleView(employee)}>View</button>
                  <button className="employeedetails-btn update" onClick={() => handleEdit(employee)}>Update</button>
                  <button className="employeedetails-btn delete" onClick={() => handleDelete(employee.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedEmployee && (
        <div className="employeedetails-box">
          <h3>View Employee</h3>
          <p><strong>Employee ID:</strong> {selectedEmployee.employeeId}</p>
          <p><strong>Full Name:</strong> {selectedEmployee.fullName}</p>
          <p><strong>Mobile:</strong> {selectedEmployee.mobile}</p>
          <p><strong>Age:</strong> {selectedEmployee.age || "N/A"}</p>
          <p><strong>Address:</strong> {selectedEmployee.address || "N/A"}</p>
          <p><strong>Email:</strong> {selectedEmployee.email}</p>
          <p><strong>Password:</strong> {showPassword ? selectedEmployee.password : "••••••••"}</p>
          <button className="employeedetails-btn show" onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? "Hide Password" : "Show Password"}
          </button>
          <button className="employeedetails-btn close" onClick={() => {
            setSelectedEmployee(null);
            setEmployees(prev => prev.map(emp => ({ ...emp, hidden: false })));
          }}>Close</button>
        </div>
      )}

      {editingEmployee && (
        <div className="employeedetails-box">
          <h3>Update Employee</h3>
          <form onSubmit={handleUpdateSubmit} className="employeedetails-form">
            <label>Employee ID:</label>
            <input type="text" name="employeeId" value={formData.employeeId} readOnly />

            <label>Full Name:</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

            <label>Mobile:</label>
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />

            <label>Age:</label>
            <input type="number" name="age" value={formData.age || ""} onChange={handleChange} />

            <label>Address:</label>
            <input type="text" name="address" value={formData.address || ""} onChange={handleChange} />

            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Password:</label>
            <input type="text" name="password" value={formData.password} onChange={handleChange} required />

            <div className="employeedetails-form-actions">
              <button className="employeedetails-btn save" type="submit">Save Changes</button>
              <button className="employeedetails-btn cancel" type="button" onClick={() => {
                setEditingEmployee(null);
                setEmployees(prev => prev.map(emp => ({ ...emp, hidden: false })));
              }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default EmployeeDetails;
