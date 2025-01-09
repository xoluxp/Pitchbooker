import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import Booking from './components/Booking';
import Confirmation from "./components/Confirmation"; // Import Confirmation component
import './styles.css'; 

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/booking" element={<Booking />} /> {/* Booking route */}
        <Route path="/confirmation" element={<Confirmation />} />{" "} {/* Confirmation route */}
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