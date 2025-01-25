import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import Booking from './components/Booking';
import Confirmation from './components/Confirmation';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';

// Import new pages
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

import './styles.css'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/users/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const user = response.data;
          setIsAuthenticated(true);
          setIsAdmin(user.isAdmin);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <Router>
      <div>

        <Routes>
          <Route path="/" element={ 
            <>
              <Hero />
              <Features />
              <HowItWorks />
              <Testimonials />
              <Footer />
              <ScrollToTopButton />
            </>
          } />
          <Route path="/booking" element={<Booking />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} 
          />

          {/* Routes for the new pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;