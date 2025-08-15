
import React from 'react';
import NavbarComponent from '../../components/Navbar';
import HeroSection from '../../components/HeroSection';
import FeaturedRecipes from '../../components/FeaturedRecipes';
import CuratedSection from '../../components/CuratedSection';
import DiversePalette from '../../components/DiversePalette';
import WhatWeHave from '../../components/WhatWeHave';
import SubscribeSection from '../../components/SubscribeSection';
import Footer from '../../components/Footer';

const HomePage = () => {
  return (
    <>
      <NavbarComponent />
      <HeroSection />
      <FeaturedRecipes />
      <CuratedSection />
      <DiversePalette />
      <WhatWeHave />
      <SubscribeSection />
      <Footer />
    </>
  );
};

export default HomePage;
