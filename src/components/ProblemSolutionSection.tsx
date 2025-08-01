import React from 'react'
import FlipCard from './FlipCard'

const ProblemSolutionSection: React.FC = () => {
  const problemSolutionData = [
    {
      problem: {
        title: 'Fragmented Data Sources',
        description: 'Tired of piecing together ETF data from disparate, unreliable sources? Our users often struggle with fragmented information spread across multiple platforms and regions, leading to incomplete analyses and missed opportunities.'
      },
      solution: {
        title: 'Unified Global Database',
        description: 'Gain a comprehensive view with our single source of truth for all ETF data worldwide. We aggregate and harmonize data from thousands of sources, providing you with a consistent and reliable foundation for your research.'
      }
    },
    {
      problem: {
        title: 'Complex Currency Conversions',
        description: 'Navigating the complexities of multi-currency ETF portfolios can be a headache, with constant manual conversions and the risk of miscalculations due to fluctuating exchange rates.'
      },
      solution: {
        title: 'Smart Currency Normalization',
        description: 'Eliminate currency confusion with automatic handling and real-time exchange rates. Our platform seamlessly converts all data to your preferred currency, ensuring accuracy and saving you valuable time.'
      }
    },
    {
      problem: {
        title: 'Inconsistent Benchmarking',
        description: 'Comparing ETF performance is challenging when faced with diverse benchmarks across different regions, asset classes, and reporting methodologies, making true apples-to-apples comparisons nearly impossible.'
      },
      solution: {
        title: 'Standardized Performance Metrics',
        description: 'Achieve true clarity with unified benchmarks and consistent performance comparisons. Our standardized metrics allow you to accurately evaluate ETFs, regardless of their origin or underlying assets.'
      }
    }
  ]

  return (
    <section className="problem-solution-section">
      <div className="problem-solution-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            The Problems We Solve
          </h2>
          <p className="section-subtitle">
            Hover over each card to see how Find Alpha IO transforms your workflow
          </p>
        </div>

        {/* Flip Cards Grid */}
        <div className="flip-cards-grid">
          {problemSolutionData.map((item, index) => (
            <FlipCard
              key={index}
              className="problem-solution-card"
              width="350px"
              height="400px"
              frontContent={
                <div className="card-content">
                  <h3 className="card-title problem-title">
                    {item.problem.title}
                  </h3>
                  <p className="card-description problem-description">
                    {item.problem.description}
                  </p>
                </div>
              }
              backContent={
                <div className="card-content">
                  <h3 className="card-title solution-title">
                    {item.solution.title}
                  </h3>
                  <p className="card-description solution-description">
                    {item.solution.description}
                  </p>
                </div>
              }
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="section-cta">
          <p className="cta-text">
            Ready to transform your ETF analysis?
          </p>
          <button className="cta-button cursor-target">
            Start Free Trial
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProblemSolutionSection