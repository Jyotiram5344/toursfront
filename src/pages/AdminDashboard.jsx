import React from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../component/AdminSidebar";
// import "../css file/admindashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/admin-login");
  };

  return (
    <div className="admin-dashboard-container">
      
      <div className="admin-dashboard-main">
        <AdminSidebar />
        <div className="admin-dashboard-content">
          <h2>Welcome to Admin Dashboard</h2>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
