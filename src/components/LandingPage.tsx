import React, { useRef, useState, useEffect } from 'react'
import LightingHeroSection from './LightingHeroSection'
import ProblemSolutionSection from './ProblemSolutionSection'
import PowerfulFeatures from './PowerfulFeatures'
import TargetAudience from './TargetAudience'
import FinalCTA from './FinalCTA'
import Footer from './Footer'
import TargetCursor from '../bits/Animations/TargetCursor/TargetCursor' // Import TargetCursor

const LandingPage: React.FC = () => {
  const lightingHeroRef = useRef<HTMLDivElement>(null)
  const targetAudienceRef = useRef<HTMLDivElement>(null)
  const [activeCursor, setActiveCursor] = useState<'target' | 'none'>('none') // Changed initial state and removed 'splash'

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Trigger when 50% of the section is visible
    }

    // Removed lightingHeroObserver as SplashCursor is no longer needed for this section

    const targetAudienceObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActiveCursor('target')
      } else if (activeCursor === 'target') {
        setActiveCursor('none') // Hide target when not in view, if it was the active cursor
      }
    }, observerOptions)

    // No longer observing lightingHeroRef for cursor change
    if (targetAudienceRef.current) {
      targetAudienceObserver.observe(targetAudienceRef.current)
    }

    return () => {
      // No longer unobserving lightingHeroRef
      if (targetAudienceRef.current) {
        targetAudienceObserver.unobserve(targetAudienceRef.current)
      }
    }
  }, [activeCursor])

  return (
    <div className="landing-page">
      {/* Removed SplashCursor component */}
      {activeCursor === 'target' && <TargetCursor />}

      <div ref={lightingHeroRef}>
        <LightingHeroSection />
      </div>
      <ProblemSolutionSection />
      <PowerfulFeatures />
      <div ref={targetAudienceRef}>
        <TargetAudience />
      </div>
      {/* <FinalCTA /> */}
      <Footer />
    </div>
  )
}

export default LandingPage
