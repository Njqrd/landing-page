import React from 'react';
import InfiniteScroll from '../bits/Components/InfiniteScroll/InfiniteScroll';
import FlipCard from './FlipCard';
import './FeatureScroll.css';

const FeatureScroll: React.FC = () => {
  const features = [
    {
      title: 'Currency Normalisation',
      description: 'Compare investments across regions with performance normalized to a single currency for consistent analysis.',
    },
    {
      title: 'Unifying Benchmark',
      description: 'Evaluate investments against a standardized benchmark to assess relative performance accurately.',
    },
    {
      title: 'Custom Dashboards',
      description: 'Build personalized dashboards to visualize and compare selected investments and metrics.',
    },
    {
      title: 'Artificial Intelligence',
      description: 'Leverage AI with a vectorized database to gain contextual insights and predictive analytics.',
    },
    {
      title: 'Seamless Integration',
      description: 'Connect with financial platforms and data sources for real-time investments comparison.',
    },
    {
      title: 'Powerful Analytics',
      description: 'Access advanced tools to analyze investments trends, risks, and opportunities with precision.',
    },
  ];

  const scrollItems = features.map((feature, index) => ({
    content: (
      <div className="feature-card">
        <FlipCard
          key={index}
          frontContent={<div className="feature-title">{feature.title}</div>}
          backContent={<div className="feature-description">{feature.description}</div>}
          width="100%"
          height="100%"
        />
      </div>
    ),
  }));

  return (
    <div className="feature-scroll-section">
    
      <InfiniteScroll items={scrollItems} autoplay={true} itemMinHeight={400} negativeMargin="-19em" width="100vw" tiltDirection={'right'} isTilted={false} pauseOnHover={true}/>
    </div>
  );
};

export default FeatureScroll;
