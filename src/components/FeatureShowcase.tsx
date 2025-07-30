import React from 'react';
import AnimatedList from '../bits/Components/AnimatedList/AnimatedList';
import SpotlightCard from '../bits/Components/SpotlightCard/SpotlightCard';
import CountUp from '../bits/TextAnimations/CountUp/CountUp';
import GlareHover from '../bits/Animations/GlareHover/GlareHover';
import CardSwap, { Card } from '../bits/Components/CardSwap/CardSwap';
import './FeatureShowcase.css';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  stat: number;
  statLabel: string;
  color: string;
}

const features: Feature[] = [
  {
    id: 'cross-region',
    title: 'Cross-Region Comparison',
    description: 'Compare ETFs across different markets and regions with unified metrics',
    icon: '',
    stat: 45,
    statLabel: 'Countries',
    color: '#3B82F6'
  },
  {
    id: 'real-time',
    title: 'Real-Time Data Sync',
    description: 'Live data updates from global exchanges and financial institutions',
    icon: '',
    stat: 99.9,
    statLabel: 'Uptime %',
    color: '#10B981'
  },
  {
    id: 'multi-currency',
    title: 'Multi-Currency Support',
    description: 'Automatic currency normalization and conversion for accurate comparisons',
    icon: '',
    stat: 150,
    statLabel: 'Currencies',
    color: '#F59E0B'
  },
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    description: 'Professional-grade analysis tools with custom benchmarks and metrics',
    icon: '',
    stat: 50,
    statLabel: 'Metrics',
    color: '#8B5CF6'
  },
  {
    id: 'search',
    title: 'Smart Search & Filters',
    description: 'Intelligent search with advanced filtering and categorization',
    icon: '',
    stat: 10000,
    statLabel: 'ETFs',
    color: '#EF4444'
  },
  {
    id: 'reports',
    title: 'Professional Reports',
    description: 'Generate comprehensive reports for clients and stakeholders',
    icon: '',
    stat: 25,
    statLabel: 'Templates',
    color: '#06B6D4'
  }
];

const FeatureShowcase: React.FC = () => {
  const handleFeatureSelect = (featureId: string, index: number) => {
    console.log(`Selected feature: ${featureId} at index ${index}`);
  };

  const handleCardClick = (index: number) => {
    console.log(`Card clicked: ${features[index].title}`);
  };

  return (
    <section className="feature-showcase">
      <div className="feature-showcase__container">
        <div className="feature-showcase__header">
          <h2 className="feature-showcase__title">
            Powerful Features for Professional Analysis
          </h2>
          <p className="feature-showcase__subtitle">
            Everything you need to analyze global ETFs with confidence
          </p>
        </div>

        <div className="feature-showcase__cardswap-container">
          <CardSwap
            width={800}
            height={200}
            cardDistance={60}
            verticalDistance={100}
            delay={4000}
            skewAmount={0}
            easing="elastic"
            pauseOnHover={true}
          >
            {features.map((feature, index) => (
              <Card key={feature.id} customClass="feature-card-swap">
                <div className="feature-card-swap__content">

                  
                  <h3 className="feature-card-swap__title">
                    {feature.title}
                  </h3>
                  
                  <p className="feature-card-swap__description">
                    {feature.description}
                  </p>
                  
                  <div className="feature-card-swap__stats">
                    <div className="feature-card-swap__stat">
  
                      <span className="feature-card-swap__stat-label">
                        {feature.statLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>


      </div>
    </section>
  );
};

export default FeatureShowcase; 