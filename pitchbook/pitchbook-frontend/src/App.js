import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import './styles.css'; 
import ScrollToTopButton from './components/ScrollToTopButton';



function App() {
  
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Footer />
      <ScrollToTopButton /> 
    </div>
  );
}


export default App;