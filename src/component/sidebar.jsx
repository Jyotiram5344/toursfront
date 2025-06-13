import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css"; 

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className={`sidebar-wrapper ${collapsed ? "collapsed" : ""}`}>
      {/* Top Navbar */}
      <div className="sidebar-navbar">
        <div className="sidebar-logo">
          <h2>Tours & Travels</h2>
        </div>
        <div className="sidebar-logout">
          <button className="sidebar-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

     

      {/* Side Navigation */}
      <nav className="sidebar-navigation">
        <Link to="/MainHome">Home</Link>
        <Link to="/Booking">Booking</Link>
        <Link to="/Customer_Booking">Customer Booking</Link>
        <Link to="/Enquiry">Enquiry</Link>
        <Link to="/homeenquirydata">Home Enquiry</Link>
        <Link to="/Status">Status</Link>
        <Link to="/report">Report</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
