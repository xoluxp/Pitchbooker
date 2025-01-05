import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-heading">The Pitch Book</h1>
          <p className="hero-subheading">Book your football pitch with ease</p>
          <button className="btn btn-primary">SIGN UP NOW</button>
          <button className="btn btn-secondary">LOG IN</button>
        </div>
        <div className="hero-graphic">
          {/* Add your graphic here */}
        </div>
      </div>
    </div>
  );
}

export default Hero;