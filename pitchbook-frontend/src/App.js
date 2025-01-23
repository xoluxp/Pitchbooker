import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import Booking from './components/Booking';
import Confirmation from "./components/Confirmation"; // Import Confirmation component
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import './styles.css'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT from local storage
        if (token) {
          const response = await axios.get('http://localhost:5000/api/users/me', {
            headers: { Authorization: `Bearer ${token}` } // Include JWT in the request header
          });
          const user = response.data;
          setIsAuthenticated(true);
          setIsAdmin(user.isAdmin);
        }
      } catch (error) {
        // ... error handling ...
      }
    };

    checkAuth();
  }, []);


  return (
    <Router>
    <div>
      <Routes>
        <Route path="/booking" element={<Booking />} /> {/* Booking route */}
        <Route path="/confirmation" element={<Confirmation />} />{" "} {/* Confirmation route */}
        <Route  path="/admin" 
            element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} 
          />
          <Route path="/login" element={<Login />} />
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
      </Routes>
    </div>
  </Router>
  );
}

export default App;