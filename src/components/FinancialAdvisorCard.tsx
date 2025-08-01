import React from 'react';
import TextType from '../bits/TextAnimations/TextType/TextType';
import './PowerfulFeatures.css'; // Assuming you want to reuse some styles or create a new CSS for this component

interface FinancialAdvisorCardProps {
  title: string;
  benefits: string[];
}

const FinancialAdvisorCard: React.FC<FinancialAdvisorCardProps> = ({ title, benefits }) => {
  return (
    <div className="target-audience__persona cursor-target" style={{ '--persona-color': '#3B82F6'} as React.CSSProperties}>
      <h3 className="target-audience__persona-title">{title}</h3>
      <div className="target-audience__persona-benefits">
        {benefits.map((benefit, index) => (
          <div key={index} className="target-audience__persona-benefit-item">
            <TextType text={benefit} typingSpeed={30} initialDelay={index * 50} className="target-audience__benefit-text" showCursor={false} loop={false} playAnimation={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialAdvisorCard;
