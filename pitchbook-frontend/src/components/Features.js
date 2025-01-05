import React from 'react';
import './Features.css'; // Import the CSS file

function Features() {
  return (
    <section className="features">
      <div className="container"> {/* Added a container for better layout */}
        <h2 className="features-heading">Why Choose PitchBook?</h2>
        <div className="features-grid"> {/* Grid container for feature cards */}
          <div className="feature-card">
            <div className="feature-icon">{/* Add icon here (e.g., <i className="fas fa-calendar-alt"></i>) */}</div>
            <h3 className="feature-title">Easy Booking</h3>
            <p className="feature-description">
              Find and book your preferred pitch in just a few clicks.
            </p>
          </div>
          {/* Add more feature cards here */}
          <div className="feature-card">
            <div className="feature-icon">{/* Add icon here */}</div>
            <h3 className="feature-title">Real-time Availability</h3>
            <p className="feature-description">
              See real-time pitch availability and avoid scheduling conflicts.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">{/* Add icon here */}</div>
            <h3 className="feature-title">Team Management</h3>
            <p className="feature-description">
              Easily manage your team, invite players, and track availability.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">{/* Add icon here */}</div>
            <h3 className="feature-title">Secure Payments</h3>
            <p className="feature-description">
              Securely process payments online with our trusted payment gateway.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;