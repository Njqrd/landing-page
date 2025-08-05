import React from 'react';
import InfiniteScroll from '../bits/Components/InfiniteScroll/InfiniteScroll';
import './FeatureScroll.css';

const FeatureScroll: React.FC = () => {
  const features = [
    {
      title: 'Currency Normalisation',
      description: 'Compare investments across regions with performance normalized to a single currency for consistent analysis.',
    },
    {
      title: 'Unifying Benchmark',
      description: 'Evaluate investments against a customised benchmark to assess relative performance accurately.',
    },
    {
      title: 'Custom Dashboards',
      description: 'Build personalized dashboards to visualize and compare selected investments and metrics.',
    },
    {
      title: 'Powerful Analytics',
      description: 'Access advanced tools to analyze investments trends, risks, and opportunities with precision.',
    },
    {
      title: 'Artificial Intelligence',
      description: 'Leverage AI with to gain contextual insights on investments',
    },
    {
      title: 'Seamless Integration',
      description: 'Connect with financial platforms and data sources for real-time investments comparison.',
    },

  ];

  const scrollItems = features.map((feature, index) => ({
    content: (
      <div className="feature-card" key={index}>
        <h3 className="feature-title">{feature.title}</h3>
        <p className="feature-description">{feature.description}</p>
      </div>
    ),
  }));

  return (
    <div className="feature-scroll-section">
      <InfiniteScroll
        items={scrollItems}
        autoplay={true}
        autoplaySpeed={0.3} // Increased value to slow down the animation
        itemMinHeight={50}
        itemMinWidth={300} 
        negativeMargin="-3rem"
        width="100vw"
        tiltDirection={'right'}
        isTilted={false}
        pauseOnHover={true}
        scrollDirection="vertical" 
      />
    </div>
  );
};

export default FeatureScroll;
