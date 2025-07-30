import React from 'react';
import ClickSpark from '../bits/Animations/ClickSpark/ClickSpark';
import Particles from '../bits/Backgrounds/Particles/Particles';
import ShinyText from '../bits/TextAnimations/ShinyText/ShinyText';
import CountUp from '../bits/TextAnimations/CountUp/CountUp';
import './FinalCTA.css';

const FinalCTA: React.FC = () => {
  const handlePrimaryClick = () => {
    console.log('Start Free Trial clicked');
  };

  const handleSecondaryClick = () => {
    console.log('Schedule Demo clicked');
  };

  return (
    <section className="final-cta">
      <div className="final-cta__background">
        <Particles
          className="final-cta__particles"
          particleCount={200}
          particleColors={["#60a5fa"]}

          speed={0.5}
          disableRotation={true}
        />
      </div>
      
      <div className="final-cta__container">
        <div className="final-cta__content">
          <div className="final-cta__header">
            <h2 className="final-cta__title">
              <ShinyText 
                text="Ready to Transform Your Fund Analysis?" 
                speed={4}
                className="final-cta__shiny-title"
              />
            </h2>
            <p className="final-cta__subtitle">
              Join thousands of financial professionals who trust Find Alpha IO for global ETF analysis
            </p>
          </div>

          <div className="final-cta__stats">
            <div className="final-cta__stat">
              <CountUp
                to={10000}
                duration={2}
                className="final-cta__stat-number"
              />
              <span className="final-cta__stat-label">Active Users</span>
            </div>
            <div className="final-cta__stat">
              <CountUp
                to={99.9}
                duration={2}
                delay={0.5}
                className="final-cta__stat-number"
              />
              <span className="final-cta__stat-label">Uptime %</span>
            </div>
            <div className="final-cta__stat">
              <CountUp
                to={150}
                duration={2}
                delay={1}
                className="final-cta__stat-number"
              />
              <span className="final-cta__stat-label">Countries</span>
            </div>
          </div>

          <div className="final-cta__buttons">

              <button 
                className="final-cta__primary-button cursor-target"
                onClick={handlePrimaryClick}
              >
                <span className="final-cta__button-text">Start Free Trial</span>
                <span className="final-cta__button-icon">→</span>
              </button>
     

  
              <button 
                className="final-cta__secondary-button cursor-target"
                onClick={handleSecondaryClick}
              >
                <span className="final-cta__button-text">Schedule Demo</span>
                <span className="final-cta__button-icon">📅</span>
              </button>
          </div>

          <div className="final-cta__benefits">
            <div className="final-cta__benefit">
              <span className="final-cta__benefit-icon">✨</span>
              <span className="final-cta__benefit-text">No Credit Card Required</span>
            </div>
            <div className="final-cta__benefit">
              <span className="final-cta__benefit-icon">⚡</span>
              <span className="final-cta__benefit-text">Setup in Under 5 Minutes</span>
            </div>
            <div className="final-cta__benefit">
              <span className="final-cta__benefit-icon">🔒</span>
              <span className="final-cta__benefit-text">Enterprise-Grade Security</span>
            </div>
          </div>

          <div className="final-cta__trust">
            <p className="final-cta__trust-text">
              Trusted by leading financial institutions worldwide
            </p>
            <div className="final-cta__logos">
              <div className="final-cta__logo">🏦</div>
              <div className="final-cta__logo">💼</div>
              <div className="final-cta__logo">📊</div>
              <div className="final-cta__logo">🏛️</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA; 