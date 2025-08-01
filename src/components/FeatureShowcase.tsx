import React, { useState, useEffect } from 'react';
import Carousel from '../bits/Components/Carousel/Carousel';
import PixelCard from '../bits/Components/PixelCard/PixelCard'; // Import PixelCard
import { FiDollarSign, FiZap, FiGlobe, FiBarChart2, FiSearch, FiFileText } from 'react-icons/fi';
import './FeatureShowcase.css';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactElement; // Modified to be React.ReactElement for icons
  stat: number;
  statLabel: string;
  color: string;
}

const features: Feature[] = [
  {
    id: 'cross-region',
    title: 'Cross-Region Comparison',
    description: 'Compare ETFs across different markets and regions with unified metrics',
    icon: <FiGlobe className="carousel-icon" />,
    stat: 45,
    statLabel: 'Countries',
    color: '#3B82F6'
  },
  {
    id: 'real-time',
    title: 'Real-Time Data Sync',
    description: 'Live data updates from global exchanges and financial institutions',
    icon: <FiZap className="carousel-icon" />,
    stat: 99.9,
    statLabel: 'Uptime %',
    color: '#10B981'
  },
  {
    id: 'multi-currency',
    title: 'Multi-Currency Support',
    description: 'Automatic currency normalization and conversion for accurate comparisons',
    icon: <FiDollarSign className="carousel-icon" />,
    stat: 150,
    statLabel: 'Currencies',
    color: '#F59E0B'
  },
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    description: 'Professional-grade analysis tools with custom benchmarks and metrics',
    icon: <FiBarChart2 className="carousel-icon" />,
    stat: 50,
    statLabel: 'Metrics',
    color: '#8B5CF6'
  },
  {
    id: 'search',
    title: 'Smart Search & Filters',
    description: 'Intelligent search with advanced filtering and categorization',
    icon: <FiSearch className="carousel-icon" />,
    stat: 10000,
    statLabel: 'ETFs',
    color: '#EF4444'
  },
  {
    id: 'reports',
    title: 'Professional Reports',
    description: 'Generate comprehensive reports for clients and stakeholders',
    icon: <FiFileText className="carousel-icon" />,
    stat: 25,
    statLabel: 'Templates',
    color: '#06B6D4'
  }
];

interface FeatureShowcaseProps {
  // onStackComplete is no longer relevant for Carousel
  // onStackComplete?: () => void;
}

const FeatureShowcase: React.FC<FeatureShowcaseProps> = () => {
  const [carouselWidth, setCarouselWidth] = useState(0);

  useEffect(() => {
    const calculateWidth = () => {
      setCarouselWidth(window.innerWidth * 0.5); // 80vw
    };

    calculateWidth(); // Set initial width
    window.addEventListener('resize', calculateWidth); // Update on resize

    return () => {
      window.removeEventListener('resize', calculateWidth);
    };
  }, []);

  // Map features to CarouselItem type, rendering PixelCard
  const carouselItems = features.map((feature, index) => ({
    id: index, // Carousel uses number for ID
    content: (
      <PixelCard key={feature.id} colors={feature.color}> {/* Pass color to PixelCard */}
        <div className="carousel-item-header">
          <div className="carousel-icon-container">{feature.icon}</div>
        </div>
        <div className="carousel-item-content">
          <h3 className="carousel-item-title">{feature.title}</h3>
          <p className="carousel-item-description">{feature.description}</p>
        </div>
      </PixelCard>
    ),
  }));

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

        <div className="feature-showcase__carousel-container">
          {carouselWidth > 0 && (
            <Carousel items={carouselItems} baseWidth={carouselWidth} autoplay={true} autoplayDelay={4000} loop={true} />
          )}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
