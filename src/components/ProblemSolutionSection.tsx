import React from 'react'
import FlipCard from './FlipCard'

const ProblemSolutionSection: React.FC = () => {
  const problemSolutionData = [
    {
      "problem": {
        "title": "Fragmented Data Sources",
        "description": "Investment data is often scattered across platforms, formats, and regions, making it hard to get a clear, complete picture. Analysts waste time stitching together partial datasets, risking inaccurate conclusions and missed insights."
      },
      "solution": {
        "title": "Seamless Global Integration",
        "description": "Our system effortlessly integrates investment data from any source, regardless of region or format, into a unified, reliable platform. With harmonized data and global coverage, you get a single, consistent foundation for deep analysis and confident decision-making."
      }
    },
    {
      problem: {
        title: 'Currency Fluctuations',
        description: 'When comparing funds from different regions, currency fluctuations can significantly distort performance. Each fund may be denominated in a different base currency, and changes in exchange rates can make a fund appear to outperform or underperform purely due to currency movements, not actual investment performance.'
      },
      solution: {
        title: 'Unified Currency View',
        description: 'Avoid misleading comparisons caused by fluctuating exchange rates. Our platform automatically adjusts all fund data using real-time rates and a USD base, giving you a consistent and accurate view, no matter the region or base currency.'
      }
    },
    {
      "problem": {
        "title": "Inconsistent Benchmarking",
        "description": "Comparing ETF performance is challenging when different benchmarks, asset classes, and reporting standards come into play. Without consistency, making fair, apples-to-apples comparisons becomes nearly impossible."
      },
      "solution": {
        "title": "Standardized Performance Metrics",
        "description": "We calculate the same key metrics across all funds using unified benchmarks and a consistent methodology. This ensures accurate, fair comparisons, regardless of fund origin, asset class, or region, empowering confident decision-making."
      }
    }
  ]

  return (
    <section className="problem-solution-section">
      <div className="problem-solution-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            The challenges in comparing investements
          </h2>
          <p className="section-subtitle">
            Hover over each card to see Find Alpha IO's solution
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