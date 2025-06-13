import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../component/sidebar";
import "../css file/statusresponsive.css";

function Status() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios
      .get("https://tours-backend-xlbv.onrender.com")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  const uniqueStatuses = [
    ...new Set(bookings.map((b) => b.status).filter(Boolean)),
  ];

  const filteredBookings = bookings.filter((booking) => {
    const nameMatch = booking.customerName
      .toLowerCase()
      .includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "All" ||
      (booking.status &&
        booking.status.toLowerCase() === statusFilter.toLowerCase());

    return nameMatch && statusMatch;
  });

  return (
    <div className="status-main-container">
      <Sidebar />
      <div className="status-content-container">
        <h2 className="status-heading">Booking Status Report</h2>

        <div className="status-filter-row">
          <input
            type="text"
            placeholder="Search by Customer Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="status-search-input"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-select"
          >
            <option value="All">All Statuses</option>
            {uniqueStatuses.map((status, idx) => (
              <option key={idx} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="status-table-wrapper">
          <table className="status-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer Name</th>
                <th>Contact Number</th>
                <th>Trip Type</th>
                <th>Vehicle Type</th>
                <th>AC Type</th>
                <th>Status</th>
                <th>Handled By</th>
                <th>Driver Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.bookingId}>
                    <td>{booking.bookingId}</td>
                    <td>{booking.customerName}</td>
                    <td>{booking.contactNumber}</td>
                    <td>{booking.tripType}</td>
                    <td>{booking.vehicleType}</td>
                    <td>{booking.acType}</td>
                    <td>{booking.status}</td>
                    <td>{booking.handledBy}</td>
                    <td>{booking.driverName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="status-no-data">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Status;
