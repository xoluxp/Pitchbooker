import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import Signup from './components/Signup';
import Login from './components/Login';
import './styles.css'; 

function App() {
  return (
    <Router>
      <div>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Footer />
        <ScrollToTopButton />
        <Routes>
          <Route path="/signup" element={<Signup />} /> {/* Corrected path */}
          <Route path="/login" element={<Login />} />  {/* Corrected path */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;