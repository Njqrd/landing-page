import React from 'react';
import './PowerfulFeatures.css';
import Carousel from '../bits/Components/Carousel/Carousel'; // Import the Carousel component
import WiderFinancialAdvisorCard from './WiderFinancialAdvisorCard'; // Import the NEW WiderFinancialAdvisorCard

const PowerfulFeatures: React.FC = () => {
  const financialAdvisorBenefits = [
    "Comprehensive portfolio analysis tools",
    "Real-time market data integration",
    "Automated client reporting",
    "Compliance and regulatory assistance",
    "Personalized investment recommendations",
    "Secure client communication platform",
  ];

  const cardsData = Array(6).fill({
    title: "Financial Advisors",
    benefits: financialAdvisorBenefits,
  });

  return (
    <section className="powerful-features">
      <div className="powerful-features__container">
        <h2 className="powerful-features__title">Powerful Features</h2>
        <p className="powerful-features__tagline">
          Unlock the full potential of your projects with our cutting-edge capabilities.
        </p>
        <Carousel baseWidth={350}>
          {cardsData.map((card, index) => (
            <WiderFinancialAdvisorCard key={index} title={card.title} benefits={card.benefits} />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default PowerfulFeatures;
