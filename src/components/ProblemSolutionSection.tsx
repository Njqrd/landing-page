import React from 'react'
import FlipCard from './FlipCard'

const ProblemSolutionSection: React.FC = () => {
  const problemSolutionData = [
    {
      problem: {
        icon: '🌐',
        title: 'Fragmented Data Sources',
        description: 'Scattered information across multiple platforms and regions'
      },
      solution: {
        icon: '✅',
        title: 'Unified Global Database',
        description: 'Single source of truth for all ETF data worldwide'
      }
    },
    {
      problem: {
        icon: '💱',
        title: 'Currency Confusion',
        description: 'Complex currency conversions and exchange rate issues'
      },
      solution: {
        icon: '✅',
        title: 'Smart Currency Normalization',
        description: 'Automatic currency handling with real-time exchange rates'
      }
    },
    {
      problem: {
        icon: '📊',
        title: 'Inconsistent Benchmarks',
        description: 'Different benchmarks across regions and asset classes'
      },
      solution: {
        icon: '✅',
        title: 'Standardized Metrics',
        description: 'Unified benchmarks and performance comparisons'
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
              height="250px"
              frontContent={
                <div className="card-content">
                  <div className="card-icon problem-icon">
                    {item.problem.icon}
                  </div>
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
                  <div className="card-icon solution-icon">
                    {item.solution.icon}
                  </div>
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