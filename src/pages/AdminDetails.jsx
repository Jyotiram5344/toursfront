import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../component/AdminSidebar";
import "../css file/admindetails.css";

function AdminDetails() {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get("https://tours-backend-xlbv.onrender.com");
      setAdmins(res.data);
    } catch (err) {
      alert("Failed to fetch admins");
      console.error(err);
    }
  };

  const handleView = (admin) => {
    setSelectedAdmin(selectedAdmin?.id === admin.id ? null : admin);
    setEditingAdmin(null);
  };

  const handleEdit = (admin) => {
    setEditingAdmin(editingAdmin?.id === admin.id ? null : admin);
    setSelectedAdmin(null);
    setFormData({ ...admin });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/admins/${editingAdmin.id}`, formData);
      alert("Admin updated successfully");
      setEditingAdmin(null);
      fetchAdmins();
    } catch (err) {
      alert("Failed to update admin");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/admins/${id}`);
      alert("Admin deleted successfully");
      if (selectedAdmin?.id === id) setSelectedAdmin(null);
      if (editingAdmin?.id === id) setEditingAdmin(null);
      fetchAdmins();
    } catch (err) {
      alert("Failed to delete admin");
      console.error(err);
    }
  };

  const showOnly = selectedAdmin || editingAdmin;

  return (
    <div className="admindetails-container">
      <AdminSidebar />
      <h2 className="admindetails-title">Admin Details</h2>

      <table className="admindetails-table">
        <thead>
          <tr>
            <th>Admin ID</th>
            <th>Full Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.length === 0 ? (
            <tr><td colSpan="5" className="admindetails-no-data">No admins found.</td></tr>
          ) : (
            admins
              .filter(admin =>
                !showOnly || admin.id === (selectedAdmin?.id || editingAdmin?.id)
              )
              .map(admin => (
                <tr key={admin.id}>
                  <td>{admin.adminId}</td>
                  <td>{admin.fullName}</td>
                  <td>{admin.mobile}</td>
                  <td>{admin.email}</td>
                  <td>
                    <button className="admindetails-btn view" onClick={() => handleView(admin)}>View</button>
                    <button className="admindetails-btn update" onClick={() => handleEdit(admin)}>Update</button>
                    <button className="admindetails-btn delete" onClick={() => handleDelete(admin.id)}>Delete</button>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>

      {/* View Admin */}
      {selectedAdmin && (
        <div className="admindetails-box">
          <h3>View Admin</h3>
          <p><strong>Admin ID:</strong> {selectedAdmin.adminId}</p>
          <p><strong>Full Name:</strong> {selectedAdmin.fullName}</p>
          <p><strong>Mobile:</strong> {selectedAdmin.mobile}</p>
          <p><strong>Age:</strong> {selectedAdmin.age || "N/A"}</p>
          <p><strong>Address:</strong> {selectedAdmin.address || "N/A"}</p>
          <p><strong>Email:</strong> {selectedAdmin.email}</p>
          <p><strong>Password:</strong> {selectedAdmin.password || "N/A"}</p>
          <button className="admindetails-btn-close" onClick={() => setSelectedAdmin(null)}>Close</button>
        </div>
      )}

      {/* Edit Admin */}
      {editingAdmin && (
        <div className="admindetails-box">
          <h3>Update Admin</h3>
          <form onSubmit={handleUpdateSubmit} className="admindetails-form">
            <label>Admin ID:</label>
            <input type="text" name="adminId" value={formData.adminId} readOnly />

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

            <div className="admindetails-form-actions">
              <button className="admindetails-btn-save" type="submit">Save Changes</button>
              <button className="admindetails-btn-cancel" type="button" onClick={() => setEditingAdmin(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminDetails;
