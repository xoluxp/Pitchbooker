import React, { useState, useEffect, axios } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import Booking from './components/Booking';
import Confirmation from "./components/Confirmation"; // Import Confirmation component
import AdminDashboard from './components/AdminDashboard';
import './styles.css'; 

function App() {

  const [isAdmin, setIsAdmin] = useState(false); // Initialize isAdmin state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Fetch user data and role from your backend API
        const response = await axios.get('/api/users/me', { withCredentials: true }); // Include credentials if needed
        const user = response.data;
        setIsAdmin(user.isAdmin); // Set isAdmin based on user role
      } catch (error) {
        console.error('Authentication error:', error);
        // Handle authentication error (e.g., redirect to login)
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
        <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} /> {/* Admin route */}
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