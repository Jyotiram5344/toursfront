import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../component/sidebar";
import "../css file/report.css"; // renamed CSS

function Report() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const tableRef = useRef();

  useEffect(() => {
    axios
      .get("https://tours-backend-xlbv.onrender.com")
      .then((res) => setBookings(res.data))
      .catch((err) => {
        console.error("Error fetching booking report:", err);
        setError("Could not load report data.");
      });
  }, []);

  const filterByDate = (data) => {
    if (!startDate && !endDate) return data;
    return data.filter((booking) => {
      const tripDate = new Date(booking.tripStartDate);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      if (start && end) return tripDate >= start && tripDate <= end;
      if (start) return tripDate >= start;
      if (end) return tripDate <= end;
      return true;
    });
  };

  const exportToCSV = () => {
    const filtered = filterByDate(bookings);
    if (filtered.length === 0) {
      alert("No data available for the selected date range.");
      return;
    }

    const headers = Object.keys(filtered[0]);
    const rows = filtered.map((booking) =>
      headers.map((key) => `"${(booking[key] || "").toString().replace(/"/g, '""')}"`)
    );

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "booking_report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setStartDate("");
    setEndDate("");
  };

  const handlePrint = () => {
    const printContents = tableRef.current.innerHTML;
    const newWindow = window.open("", "", "height=600,width=1000");
    newWindow.document.write("<html><head><title>Print Report</title>");
    newWindow.document.write(
      "<style>table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #000; padding: 4px; text-align: left; }</style>"
    );
    newWindow.document.write("</head><body>");
    newWindow.document.write(printContents);
    newWindow.document.write("</body></html>");
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    newWindow.close();
  };

  const displayedBookings = filterByDate(bookings);

  return (
    <div className="report-page-container">
      <Sidebar />
      <div className="report-content">
        <h2 className="report-title">Booking Report</h2>
        {error && <p className="report-error">{error}</p>}

        <div className="report-filters">
          <label>
            Start Date:
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </label>
          <label>
            End Date:
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </label>
          <button className="report-button" onClick={exportToCSV}>Download CSV</button>
          <button className="report-button" onClick={handlePrint}>Print</button>
        </div>

        <div className="report-table-wrapper" ref={tableRef}>
          <table className="report-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer Name</th>
                <th>Contact Number</th>
                <th>Trip Start Date</th>
                <th>Pickup Time</th>
                <th>Pickup Location</th>
                <th>Vehicle Type</th>
                <th>AC Type</th>
                <th>Capacity</th>
                <th>Carrier</th>
                <th>Day 1 Date</th>
                <th>Day 1 Itinerary</th>
                <th>Day 2 Date</th>
                <th>Day 2 Itinerary</th>
                <th>Day 3 Date</th>
                <th>Day 3 Itinerary</th>
                <th>Day 4 Date</th>
                <th>Day 4 Itinerary</th>
                <th>Trip Type</th>
                <th>Budget</th>
                <th>Rate</th>
                <th>Rate/Km</th>
                <th>Enquiry Date</th>
                <th>Source</th>
                <th>Follow-Up 1</th>
                <th>Outcome 1</th>
                <th>Follow-Up 2</th>
                <th>Outcome 2</th>
                <th>Follow-Up 3</th>
                <th>Outcome 3</th>
                <th>Follow-Up 4</th>
                <th>Outcome 4</th>
                <th>Status</th>
                <th>Handled By</th>
                <th>Driver Name</th>
                <th>Vehicle</th>
                <th>Vehicle Condition</th>
              </tr>
            </thead>
            <tbody>
              {displayedBookings.map((booking) => (
                <tr key={booking.bookingId}>
                  <td>{booking.bookingId}</td>
                  <td>{booking.customerName}</td>
                  <td>{booking.contactNumber}</td>
                  <td>{booking.tripStartDate}</td>
                  <td>{booking.pickupTime}</td>
                  <td>{booking.pickupLocation}</td>
                  <td>{booking.vehicleType}</td>
                  <td>{booking.acType}</td>
                  <td>{booking.capacity}</td>
                  <td>{booking.carrier}</td>
                  <td>{booking.dayOneDate}</td>
                  <td>{booking.dayOneTinarary}</td>
                  <td>{booking.dayTwoDate}</td>
                  <td>{booking.dayTwoTinarary}</td>
                  <td>{booking.dayThreeDate}</td>
                  <td>{booking.dayThreeTinarary}</td>
                  <td>{booking.dayFourDate}</td>
                  <td>{booking.dayFourTinarary}</td>
                  <td>{booking.tripType}</td>
                  <td>{booking.budgets}</td>
                  <td>{booking.rate}</td>
                  <td>{booking.ratePerKm}</td>
                  <td>{booking.enquiryDate}</td>
                  <td>{booking.source}</td>
                  <td>{booking.followUpSchedule1}</td>
                  <td>{booking.OutecomeOfSchedule1}</td>
                  <td>{booking.followUpSchedule2}</td>
                  <td>{booking.OutecomeOfSchedule2}</td>
                  <td>{booking.followUpSchedule3}</td>
                  <td>{booking.OutecomeOfSchedule3}</td>
                  <td>{booking.followUpSchedule4}</td>
                  <td>{booking.OutecomeOfSchedule4}</td>
                  <td>{booking.status}</td>
                  <td>{booking.handledBy}</td>
                  <td>{booking.driverName}</td>
                  <td>{booking.vehicle}</td>
                  <td>{booking.vehicleCondition}</td>
                </tr>
              ))}
              {displayedBookings.length === 0 && (
                <tr>
                  <td colSpan="37" style={{ textAlign: "center" }}>
                    No data available
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

export default Report;
