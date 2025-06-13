import React from "react";
import { useNavigate } from "react-router-dom";
import "../css file/home.css";
import Features from "../component/Features";



const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/HomeEnquiry");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="first-container">
        <div className="back-box">
          <div className="back-box-1"></div>
          <div className="back-box-2"></div>
        </div>
        <div className="first-main-box">
          <div className="navbar">
            <div className="navbar-1">tours&travels</div>
            <div className="navbar-2">
              <div><a href="/Home">Home</a></div>
              <div><a href="/last-box">About</a></div>
             
              <div><a href="/Contact">Contact</a></div>
              <div><a href="/homebooking">Booking</a></div>
            </div>
            <div className="navbar-3">
              {/* <div onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>Login</div> */}
            <div className="droppdown">
            <button className="droppbtn">Login</button>
                  <div className="droppdown-content">
                    
                    <a onClick={()=>navigate("/login")}>Employer Login</a>
                    <a onClick={()=>navigate("/AdminLogin")}>Admin Login</a>
                  </div>
          </div>
              <button className="navbar-3-1" onClick={() => navigate("/signup")}>Join Us</button>
            </div>
          </div>

          <div className="main-contain">
            <div className="main-contain-1"></div>
            <div className="main-contain-2">Your Dream Journey</div>
            <div className="main-contain-2">Starts Here</div>
            <div className="main-contain-3">
               Discover amazing destinations with our expertly crafted travel
                packages. From romantic getaways to family adventures.
            </div>
            <div className="main-contain-4">
              <button className="main-contain-4-1"><a href="/HomeBooking"> Book Now!</a></button>
               <button className="main-contain-4-2" onClick={handleClick}>
                  Custom Enquiry
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section */}

      {/* tird Section */}
      <div className="Secondpagehome">
          <div className="eigth-container">
            <div className="eigth-main">
              <div className="eigth-1"></div>
              <div className="eigth-2">We provide exceptional travel experiences with unmatched service quality</div>
              <div className="eigth-3">
                
              </div>
              <div>
                <Features/>
              </div>
              
            </div>
          </div>

      


          {/* Footer */}
          <div className="last-container">
            <div className="last-box">
              <div>
                <b>Company Info</b>
                <div className="last-box-1">About Us</div>
                <div className="last-box-1">Career</div>
                <div className="last-box-1">We are hiring</div>
                <div className="last-box-1">Blog</div>
              </div>
              <div>
                <b>Legal</b>
                <div className="last-box-1">Terms</div>
                <div className="last-box-1">Privacy</div>
                <div className="last-box-1">Cookies</div>
                <div className="last-box-1">Security</div>
              </div>
              <div>
                <b>Features</b>
                <div className="last-box-1">Business Marketing</div>
                <div className="last-box-1">User Analytics</div>
                <div className="last-box-1">Live Chat</div>
                <div className="last-box-1">Unlimited Support</div>
              </div>
              <div>
                <b>Resources</b>
                <div className="last-box-1">iOS & Android</div>
                <div className="last-box-1">Watch a Demo</div>
                <div className="last-box-1">Customers</div>
                <div className="last-box-1">API</div>
              </div>
              <div>
                <b>Get In Touch</b>
                <div className="last-box-1">(480) 555-0103</div>
                <div className="last-box-1">4517 Washington Ave, Kentucky 39495</div>
                <div className="last-box-1">debra.holt@example.com</div>
              </div>
            </div>
            </div>
      </div>
    </div>
  );
};

export default Home;
