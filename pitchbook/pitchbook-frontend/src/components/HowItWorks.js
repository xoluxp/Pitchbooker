import React from 'react';
import './HowItWorks.css'; // Import the CSS file

function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="container">
        <h2 className="how-it-works-heading">Book Your Pitch in 3 Simple Steps</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-icon">{/* Add icon here */}</div>
            <h3 className="step-title">Find a Pitch</h3>
            <p className="step-description">
              Browse our selection of pitches and find the perfect one for your needs.
            </p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-icon">{/* Add icon here */}</div>
            <h3 className="step-title">Select a Time</h3>
            <p className="step-description">
              Choose an available date and time that suits your schedule.
            </p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-icon">{/* Add icon here */}</div>
            <h3 className="step-title">Book and Pay</h3>
            <p className="step-description">
              Confirm your booking by phone and securely pay online
              or pay later.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;