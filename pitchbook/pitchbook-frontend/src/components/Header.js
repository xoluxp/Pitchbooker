import React from 'react';
import './Header.css'; // Import your Header CSS file

function Header() {
  return (
    <header className="header">
      <div className="container">
        {/* Add your header content here, e.g., logo, navigation, etc. */}
        <h1 className="header-logo">PitchBook</h1>
        {/* Example navigation */}
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/booking">Booking</a></li>
            <li><a href="/booking">Booking Checker</a></li>
            {/* Add more links as needed */}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;