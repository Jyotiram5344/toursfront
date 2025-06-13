import React from "react";
import { Link } from "react-router-dom";
import "./adminsidebar.css";
function AdminSidebar() {
  return (
    <div className="adminsb-wrapper">
      <nav className="adminsb-navbar">
        <div className="adminsb-brand">Tours & Travels</div>
        <button
          className="adminsb-signout"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Sign Out
        </button>
      </nav>

      <aside className="adminsb-sidebar">
        <ul className="adminsb-menu">
          <li><Link to="/employeesignup">Employee Signup</Link></li>
          <li><Link to="/adminsignup">Admin Signup</Link></li>
          <li><Link to="/admindetails">Admin Details</Link></li>
          <li><Link to="/employeedetails">Employee Details</Link></li>
          <li><Link to="/adminhomeenquiry">Home Page Enquiry</Link></li>
          {/* <li><Link to="/home-booking">Home Page Booking</Link></li> */}
          <li><Link to="/admincustomerbooking">Customer Booking</Link></li>
          <li><Link to="/adminenquiry">Enquiry</Link></li>
          <li><Link to="/adminreport">Report</Link></li>
        </ul>
      </aside>
    </div>
  );
}

export default AdminSidebar;
