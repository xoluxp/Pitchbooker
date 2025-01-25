import React from 'react';
import './FAQs.css';

function FAQs() {
  return (
    <div className="faqs">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>How do I book a pitch?</h3>
        <p>
          Booking a pitch is easy! Simply browse our selection of pitches, choose your preferred date and time, 
          and complete the booking process through our secure online payment system.
        </p>
      </div>
      <div className="faq-item">
        <h3>Can I cancel my booking?</h3>
        <p>
          Yes, you can cancel your booking. Please refer to our cancellation policy for details on 
          refund eligibility and any applicable fees.
        </p>
      </div>
    </div>
  );
}

export default FAQs;