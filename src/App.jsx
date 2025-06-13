import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import HomeBooking from './pages/HomeBooking';
import Login from './pages/Login';
import MainHome from './pages/MainHome';
import Sidebar from "./component/sidebar";
import Booking from './pages/Booking';
import Customer_Booking from './pages/Customer_Booking';
import Enquiry from './pages/Enquiry';
import Status from './pages/Status';
import Report from './pages/Report';
import HomeEnquiry from "./pages/HomeEnquiry";
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeSignup from './pages/EmployeeSignup';
import AdminSignup from './pages/AdminSignup';
import AdminDetails from './pages/AdminDetails';
import EmployeeDetails from './pages/EmployeeDetails';
import AdminCustomerBooking from './pages/AdminCustomerBooking';
import AdminEnquiry from './pages/AdminEnquiry';
import AdminReport from './pages/AdminReport';
import HomeEnquiryData from './pages/HomeEnquiryData';
import AdminHomeEnquiry from './pages/AdminHomeEnquiry';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/homebooking" element={<HomeBooking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/MainHome" element={<MainHome />} />
          <Route path="/Booking" element={<Booking />} />
          <Route path="/Customer_Booking" element={<Customer_Booking />} />
          <Route path="/Enquiry" element={<Enquiry />} />
          <Route path="/Status" element={<Status/>} />
          <Route path="/report" element={<Report/>} />
          <Route path="/homeenquiry" element={<HomeEnquiry />} />
          <Route path="/homeenquirydata" element={<HomeEnquiryData />} />
          {/* Admin page routes */}
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/employeesignup" element={<EmployeeSignup />} />
          <Route path="/adminsignup" element={<AdminSignup />} />
          <Route path="/admindetails" element={<AdminDetails />} />
          <Route path="/employeedetails" element={<EmployeeDetails />} />
          <Route path="/adminhomeenquiry" element={<AdminHomeEnquiry />} />

          <Route path="/admincustomerbooking" element={<AdminCustomerBooking />} />
          <Route path="/adminenquiry" element={<AdminEnquiry />} />
          <Route path="/adminreport" element={<AdminReport />} />

        
      </Routes>
    </Router>
  );
}

export default App; // ✅ This line is required for default import
