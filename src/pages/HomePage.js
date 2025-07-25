import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/common/HeroSection';
import FeaturedJobsSection from '../components/common/FeaturedJobsSection';
import FeaturesSection from '../components/common/FeaturesSection';
import backgroundImage from '../assets/images/burreau.png';
import '../styles/pages/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Navbar reste en dehors pour être fixe */}
      <Navbar />
      
      {/* Section Hero avec background image */}
      <div 
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(6, 96, 194, 0.3) 0%, rgba(14, 150, 212, 0.873) 100%), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <HeroSection />
      </div>
      < FeaturedJobsSection/> 
      {/* Section Features */}
      <FeaturesSection />
       <Footer />
    </div>
  );
};

export default HomePage;