import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css'; // Import the CSS file

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down 20px 
  const toggleVisibility = () => {
    if (window.pageYOffset > 20) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // Clean up the event listener on unmount
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top when button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Add smooth scrolling animation
    });
  };

  return (
    <div className="scroll-to-top">
      {isVisible && ( 
        <button onClick={scrollToTop}>
          {/* You can add an icon or text here, e.g., <i className="fas fa-arrow-up"></i> */}
          ↑
        </button>
      )}
    </div>
  );
}

export default ScrollToTopButton;