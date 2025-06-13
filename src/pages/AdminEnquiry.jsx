import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../component/AdminSidebar";
import "../css file/adminenquiry.css";

function AdminEnquiry() {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    fetchAllEnquiries();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [searchTerm, startDate, endDate, filterStatus, enquiries]);

  const fetchAllEnquiries = () => {
    axios
      .get("https://tours-backend-xlbv.onrender.com")
      .then((res) => {
        setEnquiries(res.data);
        setFilteredEnquiries(res.data);
      })
      .catch((err) => console.error("Error fetching enquiries:", err));
  };

  const handleFilter = () => {
    let filtered = enquiries.filter((entry) => {
      const searchMatch = Object.values(entry).some(
        (val) =>
          val &&
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

      const entryDate = new Date(entry.enquiryDate);
      const from = startDate ? new Date(startDate) : null;
      const to = endDate ? new Date(endDate) : null;
      const dateMatch =
        (!from || entryDate >= from) && (!to || entryDate <= to);

      const statusMatch =
        filterStatus === "All" ||
        (entry.status &&
          entry.status.toLowerCase() === filterStatus.toLowerCase());

      return searchMatch && dateMatch && statusMatch;
    });

    setFilteredEnquiries(filtered);
  };

  const handleEdit = (enquiry) => {
    setEditRowId(enquiry.bookingId);
    setEditedData({ ...enquiry });
  };

  const handleChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:3000/bookings/${editRowId}`, editedData)
      .then(() => {
        setEditRowId(null);
        fetchAllEnquiries();
      })
      .catch((err) => console.error("Error updating booking:", err));
  };

  const uniqueStatuses = [
    ...new Set(enquiries.map((e) => e.status).filter(Boolean)),
  ];

  return (
    <div className="admin-enquiry-wrapper">
      <AdminSidebar />
      <div className="admin-enquiry-container">
        <h2 className="admin-enquiry-title">Customer Enquiries</h2>

        <div className="admin-enquiry-filters">
          <input
            type="text"
            placeholder="Search any field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            {uniqueStatuses.map((status, idx) => (
              <option key={idx} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-enquiry-table-wrapper">
          <table className="admin-enquiry-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer Name</th>
                <th>Contact Number</th>
                <th>Enquiry Date</th>
                <th>Trip Type</th>
                <th>Status</th>
                <th>Follow-Up 1</th>
                <th>Outcome 1</th>
                <th>Follow-Up 2</th>
                <th>Outcome 2</th>
                <th>Follow-Up 3</th>
                <th>Outcome 3</th>
                <th>Follow-Up 4</th>
                <th>Outcome 4</th>
                <th>Handled By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnquiries.map((enquiry) =>
                editRowId === enquiry.bookingId ? (
                  <tr key={enquiry.bookingId}>
                    {[
                      "bookingId",
                      "customerName",
                      "contactNumber",
                      "enquiryDate",
                      "tripType",
                      "status",
                      "followUpSchedule1",
                      "OutecomeOfSchedule1",
                      "followUpSchedule2",
                      "OutecomeOfSchedule2",
                      "followUpSchedule3",
                      "OutecomeOfSchedule3",
                      "followUpSchedule4",
                      "OutecomeOfSchedule4",
                      "handledBy",
                    ].map((field, idx) =>
                      field === "bookingId" ? (
                        <td key={idx}>{editedData[field]}</td>
                      ) : (
                        <td key={idx}>
                          <input
                            className="admin-enquiry-input"
                            value={editedData[field] || ""}
                            onChange={(e) => handleChange(field, e.target.value)}
                          />
                        </td>
                      )
                    )}
                    <td>
                      <button onClick={handleSave}>Save</button>{" "}
                      <button onClick={() => setEditRowId(null)}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={enquiry.bookingId}>
                    <td>{enquiry.bookingId}</td>
                    <td>{enquiry.customerName}</td>
                    <td>{enquiry.contactNumber}</td>
                    <td>{enquiry.enquiryDate}</td>
                    <td>{enquiry.tripType}</td>
                    <td>{enquiry.status}</td>
                    <td>{enquiry.followUpSchedule1}</td>
                    <td>{enquiry.OutecomeOfSchedule1}</td>
                    <td>{enquiry.followUpSchedule2}</td>
                    <td>{enquiry.OutecomeOfSchedule2}</td>
                    <td>{enquiry.followUpSchedule3}</td>
                    <td>{enquiry.OutecomeOfSchedule3}</td>
                    <td>{enquiry.followUpSchedule4}</td>
                    <td>{enquiry.OutecomeOfSchedule4}</td>
                    <td>{enquiry.handledBy}</td>
                    <td>
                      <button
                        onClick={() => {
                          alert("You are now editing this row");
                          handleEdit(enquiry);
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                )
              )}
              {filteredEnquiries.length === 0 && (
                <tr>
                  <td colSpan="16" className="admin-enquiry-empty">
                    No enquiries found
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

export default AdminEnquiry;
