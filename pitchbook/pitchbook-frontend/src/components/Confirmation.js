import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header'; // Import the Header component
import Footer from './Footer'; // Import the Footer component
import './Confirmation.css'; // Import the CSS file

function Confirmation() {
  const location = useLocation();
  const bookingData = location.state?.bookingData; // Access booking data

  return (
    <div>
      <Header />
      <div className="confirmation-container"> {/* new Container */}
        <h2>Booking Confirmation</h2>
      {bookingData && ( // Conditionally render booking details
        <div>
          <p>
            Thank you, <strong>{bookingData.name}</strong>! Your booking has been registred.
          </p>
          
          <p>Number of players : {bookingData.teammates}</p>
          <p>Date: {bookingData.date}</p>
          <p>Time: {bookingData.time}</p>
          <p><h3><strong>Consider being 15mins early to the pitch !!!</strong></h3></p>
         
        </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Confirmation;