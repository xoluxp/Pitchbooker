import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faUsers, faCreditCard } from '@fortawesome/free-solid-svg-icons'; // Iicons impots
import './Features.css';

function Features() {
  return (
    <section className="features">
      <div className="container">
        <h2 className="section-heading">Why Choose PitchBook?</h2>
        <div className="features-grid">
          <div className="feature-card">
          <div className="feature-icon">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
            <h3 className="feature-title">Easy Booking</h3>
            <p className="feature-description">
              Effortlessly book your preferred pitch in just a few clicks.
            </p>
          </div>
          <div className="feature-card">
          <div className="feature-icon">
              <FontAwesomeIcon icon={faClock} /> 
            </div>
            <h3 className="feature-title">Real-time Availability</h3>
            <p className="feature-description">
              See real-time pitch availability and avoid scheduling conflicts.
            </p>
          </div>
          <div className="feature-card">
          <div className="feature-icon">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <h3 className="feature-title">Team Management</h3>
            <p className="feature-description">
              Easily manage your team, invite players, and track their availability.
            </p>
          </div>
          <div className="feature-card">
          <div className="feature-icon">
              <FontAwesomeIcon icon={faCreditCard} />
            </div>
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