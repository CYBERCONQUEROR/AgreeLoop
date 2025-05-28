import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import StatsCounter from '../components/home/StatsCounter';
import FeatureSection from '../components/home/FeatureSection';

const Home: React.FC = () => {
  return (
    <div>
      <HeroBanner />
      <StatsCounter />
      <FeatureSection />
    </div>
  );
};

export default Home;