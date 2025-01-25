import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import heroImage from './field.jpg';

function Hero() {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-heading">PitchBook</h1>
          <p className="hero-subheading">Book your perfect football pitch with ease.</p>
          <Link to="/booking">
            <button className="btn btn-primary">Find Your Pitch</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;