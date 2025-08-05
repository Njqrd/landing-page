import React from 'react';
import './PowerfulFeatures.css';
import FlipCard from './FlipCard';

const PowerfulFeatures: React.FC = () => {
  const featuresData = [
    {
      problem: {
        title: 'Comprehensive Data Aggregation',
        description: 'All Your Investment Data, Unified. Access insights from any source, effortlessly.',
      },
      solution: {
        title: '',
        description: 'Finding Alpha aggregates monthly fund and ETF data from diverse sources, delivering factual, license-free insights. Compare investments across markets and providers with our robust data integration.',
      },
    },
    {
      problem: {
        title: 'Custom Benchmark Creation',
        description: 'Your Benchmark, Your Way, Compare funds against tailored indices.',
      },
      solution: {
        title: '',
        description: 'Set your own benchmarks using stock and bond indices to evaluate funds. Finding Alpha’s custom benchmark tool lets you compare performance against personalized standards, ensuring relevant insights.',
      },
    },
    {
      problem: {
        title: 'Multi-Currency Support',
        description: 'Global Funds, Local Ease, Analyze funds in USD, EUR, GBP, and ZAR.',
      },
      solution: {
        title: '',
        description: 'Seamlessly compare funds across multiple currencies with automatic conversion. Finding Alpha’s multi-currency support simplifies global investment analysis for a borderless strategy.',
      },
    },
    {
      problem: {
        title: 'Portfolio Optimization',
        description: 'Build Your Perfect Portfolio, Optimize with ease and precision.',
      },
      solution: {
        title: '',
        description: 'Use Finding Alpha’s portfolio builder to create and optimize your investments. Compare peer funds, risk comparison for deeper analysis to achieve your financial goals.',
      },
    },
    {
      problem: {
        title: 'AI-Powered Recommendations',
        description: 'Leverage AI with to gain contextual insights on investments',
      },
      solution: {
        title: '',
        description: 'Our AI assistant analyzes our database to provide tailored investment recommendations. From fund selection to risk assessment, Finding Alpha’s AI helps you uncover opportunities with precision.',
      },
    },
    {
      problem: {
        title: 'Risk Analytics & Visualizations',
        description: 'See and Master Your Risks, Powerful metrics meet stunning visuals.',
      },
      solution: {
        title: '',
        description: 'Dive into institutional-grade metrics paired with interactive charts. Finding Alpha’s visualizations make it easy to analyze risk and performance at a glance.',
      },
    },
  ];

  return (
    <section className="powerful-features">
      <div className="powerful-features__container">
        <h2 className="powerful-features__title">Powerful Features</h2>
        <p className="powerful-features__tagline">
          Unlock the full potential of your projects with our cutting-edge capabilities.
        </p>

        <div className="flip-cards-grid">
          {featuresData.map((item, index) => (
            <FlipCard
              key={index}
              className="powerful-features-card"
              width="350px"
              height="400px"
              frontContent={
                <div className="card-content">
                  <h3 className="card-title problem-title">{item.problem.title}</h3>
                  <p className="card-description problem-description">{item.problem.description}</p>
                </div>
              }
              backContent={
                <div className="card-content">
                  <h3 className="card-title solution-title">{item.solution.title}</h3>
                  <p className="card-description solution-description">{item.solution.description}</p>
                </div>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PowerfulFeatures;
