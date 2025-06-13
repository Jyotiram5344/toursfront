import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../component/sidebar';
import "../css file/booking.css";

function HomeEnquiry() {
  const [enquiryData, setEnquiryData] = useState({
    customerName: '',
    contactNumber: '',
    enquiryDate: '',
    pickupLocation: '',
    destinationLocation: '',
    tripStartDate: '',
    vehicleType: '',
    acType: '',
    capacity: '',
    tripType: '',
    budget: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnquiryData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsed = {
      ...enquiryData,
      capacity: parseInt(enquiryData.capacity) || 0,
      budget: parseFloat(enquiryData.budget) || 0
    };

    axios.post('https://tours-backend-xlbv.onrender.com', parsed)
      .then(res => {
        alert("✅ Enquiry submitted successfully");
        setEnquiryData({
          customerName: '',
          contactNumber: '',
          enquiryDate: '',
          pickupLocation: '',
          destinationLocation: '',
          tripStartDate: '',
          vehicleType: '',
          acType: '',
          capacity: '',
          tripType: '',
          budget: ''
        });
      })
      .catch(err => {
        console.error("Enquiry Error:", err);
        alert("❌ Failed to submit enquiry");
      });
  };

  return (
    <div className="bookingdivbox">
      <div className='navdivbox'>
        <div id='logoname'><h2>Tours & Travels</h2></div>
      </div>
      <form className="booking-form" onSubmit={handleSubmit}>
        <h2>Enquiry Form</h2>
        <div className="grid-container">
          {Object.entries(enquiryData).map(([key, value]) => (
            <div className="form-group" key={key}>
              <label>
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
              {key === 'vehicleType' ? (
                <select name={key} value={value} onChange={handleChange}>
                  <option value="">-- Select Vehicle Type --</option>
                  <option value="Car">Car</option>
                  <option value="Bus">Bus</option>
                  <option value="Van">Van</option>
                </select>
              ) : key === 'acType' ? (
                <select name={key} value={value} onChange={handleChange}>
                  <option value="">-- Select AC Type --</option>
                  <option value="AC">AC</option>
                  <option value="Non-AC">Non-AC</option>
                </select>
              ) : key === 'tripType' ? (
                <select name={key} value={value} onChange={handleChange}>
                  <option value="">-- Select Trip Type --</option>
                  <option value="One-way">One-way</option>
                  <option value="Round-trip">Round-trip</option>
                </select>
              ) : (
                <input
                  type={key.toLowerCase().includes('date') ? 'date' : 'text'}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={`Enter ${key}`}
                />
              )}
            </div>
          ))}
        </div>
        <button id='btnsub' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default HomeEnquiry;
