import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../component/sidebar";
import "../css file/customer_booking.css";

function Customer_Booking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [editBookingId, setEditBookingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [error, setError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    handleFilter(); // Apply search + status filter when anything changes
  }, [searchTerm, selectedStatus, bookings]);

  const fetchBookings = () => {
    axios
      .get("https://tours-backend-xlbv.onrender.com")
      .then((res) => {
        setBookings(res.data);
        setFilteredBookings(res.data);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setError("Could not fetch bookings");
      });
  };

  const handleFilter = () => {
    let filtered = bookings.filter((booking) => {
      const statusMatch =
        selectedStatus === "All" ||
        (booking.status &&
          booking.status.toLowerCase() === selectedStatus.toLowerCase());

      const searchMatch = Object.values(booking).some(
        (val) =>
          val &&
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

      return statusMatch && searchMatch;
    });

    setFilteredBookings(filtered);
    setError(filtered.length === 0 ? "No matching bookings found" : "");
  };

  const handleEditClick = (booking) => {
    setEditBookingId(booking.bookingId);
    setEditedData({ ...booking });
  };

  const handleInputChange = (e, field) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3000/bookings/${editBookingId}`, editedData)
      .then(() => {
        alert("Booking updated successfully");
        setEditBookingId(null);
        fetchBookings();
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("Update failed");
      });
  };

  const handleCancel = () => {
    setEditBookingId(null);
    setEditedData({});
  };

  const renderInput = (field, type = "text") => (
    <input
      type={type}
      value={editedData[field] || ""}
      onChange={(e) => handleInputChange(e, field)}
    />
  );

  const uniqueStatuses = [
    ...new Set(bookings.map((b) => b.status).filter(Boolean)),
  ];

  return (
    <div className="bookingdivbox">
      <Sidebar />
      <div className="customer-booking">
        <h2>Customer Bookings</h2>

        {/* Search and Filter */}
        <div className="filters" style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search by any field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="All">All Statuses</option>
            {uniqueStatuses.map((status, idx) => (
              <option key={idx} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="table-container" style={{ overflowX: "auto" }}>
          <table className="booking-table">
            <thead>
              <tr>
                {Object.keys(bookings[0] || {}).map((field) => (
                  <th key={field}>{field}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => {
                if (editBookingId && booking.bookingId !== editBookingId)
                  return null;

                return (
                  <tr key={booking.bookingId}>
                    {editBookingId === booking.bookingId ? (
                      Object.keys(booking).map((field) => (
                        <td key={field}>
                          {renderInput(
                            field,
                            field.toLowerCase().includes("date") ? "date" : "text"
                          )}
                        </td>
                      ))
                    ) : (
                      Object.values(booking).map((val, idx) => (
                        <td key={idx}>{val}</td>
                      ))
                    )}
                    <td>
                      {editBookingId === booking.bookingId ? (
                        <>
                          <button onClick={handleUpdate}>Update</button>
                          <button
                            onClick={handleCancel}
                            style={{ marginLeft: "5px" }}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button onClick={() => handleEditClick(booking)}>
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan="100%" style={{ textAlign: "center" }}>
                    No bookings available
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

export default Customer_Booking;
