import React, { useState } from 'react';
import ShinyText from '../bits/TextAnimations/ShinyText/ShinyText';
import TextType from '../bits/TextAnimations/TextType/TextType';
import './TargetAudience.css';

interface UserPersona {
  id: number;
  title: string;
  role: string;
  description: string;
  benefits: string[];
  color: string;
  gradient: string;
}

const userPersonas: UserPersona[] = [
  {
    id: 1,
    title: 'Financial Advisors',
    role: 'Client Portfolio Management',
    description: 'Help clients make informed investment decisions across global markets',
    benefits: [
      'Compare ETFs from multiple regions instantly',
      'Generate professional client reports',
      'Access unified benchmarks and metrics',
      'Streamline due diligence processes'
    ],
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
  },
  {
    id: 2,
    title: 'Asset Managers',
    role: 'Institutional Investment Strategy',
    description: 'Optimize portfolio allocation with comprehensive global analysis',
    benefits: [
      'Multi-currency portfolio analysis',
      'Real-time cross-border comparisons',
      'Advanced risk assessment tools',
      'Custom benchmark creation'
    ],
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  },
  {
    id: 3,
    title: 'Institutional Investors',
    role: 'Large-Scale Fund Management',
    description: 'Navigate complex global markets with institutional-grade tools',
    benefits: [
      'Enterprise-level data integration',
      'Custom reporting and analytics',
      'Multi-asset class analysis',
      'Regulatory compliance support'
    ],
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
  }
];

const TargetAudience: React.FC = () => {
  const [hoveredPersona, setHoveredPersona] = useState<UserPersona | null>(null);

  const handlePersonaHover = (persona: UserPersona | null) => {
    setHoveredPersona(persona);
  };

  return (
    <section className="target-audience">
      <div className="target-audience__container">
        <div className="target-audience__header">
          <h2 className="target-audience__title">
            <ShinyText 
              text="Built for Financial Professionals" 
              speed={3}
              className="target-audience__shiny-title"
            />
          </h2>
          <p className="target-audience__subtitle">
            Tailored solutions for every level of investment expertise
          </p>
        </div>

        <div className="target-audience__content">
          <div className="target-audience__personas">
            {userPersonas.map((persona) => (
              <div
                key={persona.id}
                className={`target-audience__persona cursor-target ${hoveredPersona?.id === persona.id ? 'active' : ''}`}
                onMouseEnter={() => handlePersonaHover(persona)}
                onMouseLeave={() => handlePersonaHover(null)}
                style={{ '--persona-color': persona.color } as React.CSSProperties}
              >
                <div className="target-audience__persona-header">
                  <h3 className="target-audience__persona-title">
                    {persona.title}
                  </h3>
                  <span className="target-audience__persona-role">
                    {persona.role}
                  </span>
                </div>
                
                <p className="target-audience__persona-description">
                  {persona.description}
                </p>

                <div className="target-audience__persona-benefits">
                  <h4 className="target-audience__benefits-title">
                    Key Benefits:
                  </h4>
                  <ul className="target-audience__benefits-list">
                    {persona.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="target-audience__benefit-item">
                        <TextType
                          key={`${persona.id}-${benefitIndex}`}
                          text={benefit}
                          typingSpeed={30}
                          initialDelay={benefitIndex * 50}
                          className="target-audience__benefit-text"
                          showCursor={false}
                          loop={false}
                          playAnimation={hoveredPersona?.id === persona.id}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="target-audience__cta">
          <div className="target-audience__cta-content">
            <h3 className="target-audience__cta-title">
              Ready to Transform Your Investment Analysis?
            </h3>
            <p className="target-audience__cta-subtitle">
              Join thousands of financial professionals who trust Find Alpha IO
            </p>
            <div className="target-audience__cta-buttons">
              <button className="target-audience__cta-primary cursor-target">
                Start Free Trial
              </button>
              <button className="target-audience__cta-secondary cursor-target">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;