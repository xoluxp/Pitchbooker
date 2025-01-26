import React from 'react';
import './Contact.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Contact() {
  return (
    <div>
      <Header />
    <div className="contact">
      <h2>Contact Us</h2>
      <p>We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us.</p>
      <ul>
        <li>Email: contact@pitchbook.com</li>
        <li>Phone: +1 (555) 123-4567</li>
        <li>Address: 123 Main St, Anytown USA</li>
        <li>Social Media: @pitchbook</li>
        <li>Customer Support: 24/7</li>
        <li>Customer Service: 1-800-555-PITCH</li>
        
      </ul>

    </div>
    <Footer />
    </div>
  );
}

export default Contact;