import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../component/sidebar";
import "../css file/enquiry.css"; // Changed to enquiry.css

function Enquiry() {
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
    <div className="enquiry-page">
      <Sidebar />
      <div className="enquiry-content">
        <h2>Customer Enquiries</h2>

        <div className="enquiry-filters">
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

        <div className="enquiry-table-container">
          <table className="enquiry-table">
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
                    {Object.keys(enquiry).slice(0, 15).map((key) => (
                      <td key={key}>
                        <input
                          value={editedData[key] || ""}
                          onChange={(e) => handleChange(key, e.target.value)}
                        />
                      </td>
                    ))}
                    <td>
                      <button onClick={handleSave}>Save</button>{" "}
                      <button onClick={() => setEditRowId(null)}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  editRowId === null && (
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
                )
              )}
              {filteredEnquiries.length === 0 && (
                <tr>
                  <td colSpan="16" className="no-data">
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

export default Enquiry;
