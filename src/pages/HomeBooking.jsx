import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../component/sidebar';
// import "../css file/booking.css";

function HomeBooking() {
  const [formData, setFormData] = useState({
    bookingId: '',
    customerName: '',
    contactNumber: '',
    tripStartDate: '',
    pickupTime: '',
    pickupLocation: '',
    vehicleType: '',
    acType: '',
    capacity: '',
    carrier: '',
    dayOneDate: '',
    dayOneTinarary: '',
    dayTwoDate: '',
    dayTwoTinarary: '',
    dayThreeDate: '',
    dayThreeTinarary: '',
    dayFourDate: '',
    dayFourTinarary: '',
    tripType: '',
    budgets: '',
    rate: '',
    ratePerKm: '',
    enquiryDate: '',
    source: '',
    followUpSchedule1: '',
    OutecomeOfSchedule1: '',
    followUpSchedule2: '',
    OutecomeOfSchedule2: '',
    followUpSchedule3: '',
    OutecomeOfSchedule3: '',
    followUpSchedule4: '',
    OutecomeOfSchedule4: '',
    status: '',
    handledBy: '',
    driverName: '',
    vehicle: '',
    vehicleCondition: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  const { bookingId, ...submitData } = formData;

  const parsedData = {
    ...submitData,
    capacity: parseInt(submitData.capacity) || 0,
    rate: parseFloat(submitData.rate) || 0,
    ratePerKm: parseFloat(submitData.ratePerKm) || 0,
    budgets: parseFloat(submitData.budgets) || 0
  };

  axios.post('https://tours-backend-xlbv.onrender.com', parsedData)
    .then(response => {
      console.log('Booking saved:', response.data);
      alert('✅ Booking saved successfully');

      // Reset form fields after successful submission
      setFormData({
        bookingId: '',
        customerName: '',
        contactNumber: '',
        tripStartDate: '',
        pickupTime: '',
        pickupLocation: '',
        vehicleType: '',
        acType: '',
        capacity: '',
        carrier: '',
        dayOneDate: '',
        dayOneTinarary: '',
        dayTwoDate: '',
        dayTwoTinarary: '',
        dayThreeDate: '',
        dayThreeTinarary: '',
        dayFourDate: '',
        dayFourTinarary: '',
        tripType: '',
        budgets: '',
        rate: '',
        ratePerKm: '',
        enquiryDate: '',
        source: '',
        followUpSchedule1: '',
        OutecomeOfSchedule1: '',
        followUpSchedule2: '',
        OutecomeOfSchedule2: '',
        followUpSchedule3: '',
        OutecomeOfSchedule3: '',
        followUpSchedule4: '',
        OutecomeOfSchedule4: '',
        status: '',
        handledBy: '',
        driverName: '',
        vehicle: '',
        vehicleCondition: ''
      });
    })
    .catch(error => {
      console.error('Error saving booking:', error);
      alert('❌ Failed to save booking. Check console.');
    });
};


  return (
    <div className="bookingdivbox">
       <div className='navdivbox'>
                          <div  id='logoname'><h2>tours&travels</h2></div>
                          {/* <div id='btnlogout'><button id='lbtn' >Logout</button></div> */}
                  </div>
      <form className="booking-form" onSubmit={handleSubmit}>
        <h2>Booking Form</h2>
        <div className="grid-container">
          <div className="form-group">
            <label>Booking ID</label>
            <input
              type="text"
              name="bookingId"
              value={formData.bookingId}
              readOnly
              className="readonly-input"
              placeholder="Auto-generated"
            />
          </div>
          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              placeholder="Enter Customer Name"
              onChange={handleChange}
            />
          </div>
          {Object.entries(formData).map(([key, value]) =>
            key === 'bookingId' || key === 'customerName' ? null : (
              <div className="form-group" key={key}>
                <label>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
                {key === 'vehicleType' ? (
                  <select name={key} value={value} onChange={handleChange}>
                    <option value="">-- Select Vehicle Type --</option>
                    <option value="Car">Car</option>
                    <option value="Bike">Bike</option>
                    <option value="Bus">Bus</option>
                    <option value="Van">Van</option>
                    <option value="Truck">Truck</option>
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
                    <option value="Local">Local</option>
                  </select>
                ) : key === 'status' ? (
                  <select name={key} value={value} onChange={handleChange}>
                    <option value="">-- Select Status --</option>
                    <option value="Done">Conform</option>
                    <option value="Active">Forloop</option>
                    <option value="Inactive">Cancle</option>
                  </select>
                ) : (
                  <input
                    type={key.toLowerCase().includes('date') ? 'date' : 'text'}
                    name={key}
                    value={value}
                    placeholder={`Enter ${key}`}
                    onChange={handleChange}
                  />
                )}
              </div>
            )
          )}
        </div>
        <button id='btnsub' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default HomeBooking;
