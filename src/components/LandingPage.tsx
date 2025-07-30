import React from 'react'
import HeroSection from './HeroSection'
import LightingHeroSection from './LightingHeroSection'
import ProblemSolutionSection from './ProblemSolutionSection'
import FeatureShowcase from './FeatureShowcase'
import TargetAudience from './TargetAudience'
import FinalCTA from './FinalCTA'
import Footer from './Footer'

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      {/* Use LightingHeroSection instead of HeroSection for the new lighting effect */}
      <LightingHeroSection />
      <ProblemSolutionSection />
      <FeatureShowcase />
      <TargetAudience />
      <FinalCTA />
      <Footer />
      {/* Future sections will be added here */}
    </div>
  )
}

export default LandingPage 