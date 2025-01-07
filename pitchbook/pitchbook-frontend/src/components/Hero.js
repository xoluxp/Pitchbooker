import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-heading">The Pitch Book</h1>
          <p className="hero-subheading">Book your football pitch with ease</p>
          <Link to="pitchbook\pitchbook-frontend\src\components\Signup.js"> {/* Link to Signup page */}
          <button className="btn btn-primary">SIGN UP NOW</button>
          </Link>
          <Link to="pitchbook\pitchbook-frontend\src\components\Login.js"> {/* Link to Login page */}
          <button className="btn btn-secondary">LOG IN</button>
          </Link>
        </div>
        <div className="hero-graphic">
          {/* Add your graphic here */}
        </div>
      </div>
    </div>
  );
}

export default Hero;