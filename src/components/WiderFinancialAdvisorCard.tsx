import React from 'react';
import TextType from '../bits/TextAnimations/TextType/TextType';
import './WiderFinancialAdvisorCard.css'; // Import the new CSS file

interface WiderFinancialAdvisorCardProps {
  title: string;
  benefits: string[];
}

const WiderFinancialAdvisorCard: React.FC<WiderFinancialAdvisorCardProps> = ({ title, benefits }) => {
  return (
    <div className="wider-financial-advisor-card" style={{ '--persona-color': '#3B82F6'} as React.CSSProperties}>
      <h3 className="wider-financial-advisor-card__title">{title}</h3>
      <div className="wider-financial-advisor-card__benefits">
        {benefits.map((benefit, index) => (
          <div key={index} className="wider-financial-advisor-card__benefit-item">
            <TextType text={benefit} typingSpeed={30} initialDelay={index * 50} className="wider-financial-advisor-card__benefit-text" showCursor={false} loop={false} playAnimation={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WiderFinancialAdvisorCard;