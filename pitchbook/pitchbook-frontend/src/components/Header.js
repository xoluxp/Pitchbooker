import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          PitchBook
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/booking">Book a Pitch</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
           
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;