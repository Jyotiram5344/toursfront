import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css file/adminhomeenquiry.css'; 
import AdminSidebar from '../component/AdminSidebar';

function AdminHomeEnquiry() {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('https://tours-backend-xlbv.onrender.com')
      .then(res => setData(res.data))
      .catch(err => console.error("Error fetching data:", err));
  };

  const fields = [
    "customerName", "contactNumber", "enquiryDate", "pickupLocation", "destinationLocation",
    "tripStartDate", "vehicleType", "acType", "capacity", "tripType", "budget",
    "dayOneDate", "dayOneTinarary", "dayTwoDate", "dayTwoTinarary",
    "dayThreeDate", "dayThreeTinarary", "dayFourDate", "dayFourTinarary",
    "followUpSchedule1", "OutecomeOfSchedule1", "followUpSchedule2", "OutecomeOfSchedule2",
    "followUpSchedule3", "OutecomeOfSchedule3", "followUpSchedule4", "OutecomeOfSchedule4",
    "status", "handledBy", "driverName", "created_at"
  ];

  const formatHeader = (key) =>
    key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData({ ...data[index] });
  };

  const handleInputChange = (e, field) => {
    setEditData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = (id) => {
    axios.put(`http://localhost:3000/api/update-enquiry/${id}`, editData)
      .then(() => {
        alert("✅ Updated successfully");
        setEditIndex(null);
        fetchData();
      })
      .catch(err => {
        console.error("Update error:", err);
        alert("❌ Failed to update");
      });
  };

  return (
    <div className="admin-enquiry-container">
      <AdminSidebar />
      <h2 className="admin-enquiry-title">Home Enquiry Records</h2>
      <div className="admin-enquiry-table-wrapper">
        <table className="admin-enquiry-table">
          <thead>
            <tr>
              {fields.map((field, idx) => <th key={idx}>{formatHeader(field)}</th>)}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {fields.map((field, idx) => (
                  <td key={idx}>
                    {editIndex === i && field !== "created_at" ? (
                      <input
                        type="text"
                        value={editData[field] || ""}
                        onChange={(e) => handleInputChange(e, field)}
                        className="admin-enquiry-input"
                      />
                    ) : (
                      row[field] || "No Data Found"
                    )}
                  </td>
                ))}
                <td>
                  {editIndex === i ? (
                    <button onClick={() => handleSave(row.id)} className="admin-enquiry-btn save">Save</button>
                  ) : (
                    <button onClick={() => handleEdit(i)} className="admin-enquiry-btn edit">Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminHomeEnquiry;
